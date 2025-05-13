import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ajout-entree-divers',
  standalone: true,
  templateUrl: './ajout-entree-divers.component.html',
  styleUrls: ['./ajout-entree-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AjoutEntreeDiversComponent implements OnInit {
  addForm!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];
  resultats: any[] = [];

  // ✅ Champs manquants pour le template
  fournisseurs: string[] = ['Fournisseur A', 'Fournisseur B', 'Fournisseur C'];
  clients: string[] = ['Client X', 'Client Y', 'Client Z'];
  magasins: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Formulaire complet avec tous les champs affichés
    this.addForm = this.fb.group({
      numeroBE: [''],
      fournisseur: [''],
      client: [''],
      origine: [''],
      date: ['', Validators.required],
      responsable: [''],
      spl: [''],
      valeurBE: [''],
      etat: [''],
      facture: [''],
      magasin: [''],
      description: [''],
      articleId: ['', Validators.required],
      stockId: ['', Validators.required],
      quantite: ['', Validators.required],
      couleur: [''],
      lot: [''],
      oa: [''],
      laize: [''],
      qteYard: ['']
    });

    // 📦 Chargement des données
    this.articleService.getAll().subscribe((data: any) => {
      this.articles = data.articles || data;
    });

    this.stockService.getAll().subscribe((data: any) => {
      this.stocks = data;
      this.magasins = data.map((s: any) => ({ nom: s.nom }));
    });

    this.fetchResultats();
  }

  // ✅ Soumission du formulaire
  onSubmit(): void {
    if (this.addForm.invalid) {
      alert('❌ Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const payload = {
      ...this.addForm.value,
      dateMouvement: this.addForm.value.date
    };

    this.mouvementService.create('entrees/divers', payload).subscribe({
      next: () => {
        alert('✅ Entrée Divers enregistrée avec succès');
        this.addForm.reset();
        this.fetchResultats();
      },
      error: () => alert('❌ Une erreur est survenue lors de l\'enregistrement.')
    });
  }

  // ✅ Récupération des résultats
  fetchResultats(): void {
    this.mouvementService.getAll('entrees/divers').subscribe((data: any) => {
      this.resultats = data;
    });
  }

  // ✅ Export Excel
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entrées Divers');
    XLSX.writeFile(workbook, 'entree_divers.xlsx');
  }

  // ✅ Export PDF
  exportToPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Réf', 'Désignation', 'Quantité', 'Stock', 'Date']],
      body: this.resultats.map(item => [
        item.reference || '',
        item.designation || '',
        item.quantite || '',
        item.entiteStock || '',
        item.dateMouvement || ''
      ])
    });
    doc.save('entree_divers.pdf');
  }

  // 🔁 Redirection si besoin
  retourAccueil(): void {
    this.router.navigate(['/stock/entree-divers']);
  }
}

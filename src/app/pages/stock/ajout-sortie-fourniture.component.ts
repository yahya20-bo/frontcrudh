import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BonMouvement } from 'src/app/models/bon-mouvement.model';
import { FournisseurValue } from 'src/app/models/fournisseur.model';
import { ClientValue } from 'src/app/models/client.model';



// imports identiques...

@Component({
  selector: 'app-ajout-sortie-fourniture',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './ajout-sortie-fourniture.component.html',
  styleUrls: ['./ajout-sortie-fourniture.component.scss']
})
export class AjoutSortieFournitureComponent implements OnInit {
  addForm!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];
  fournisseurs: FournisseurValue[] = [];
  clients: ClientValue[] = [];
  magasins: any[] = [];
  resultats: BonMouvement[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.fetchResultats();
  }

  initForm(): void {
    this.addForm = this.fb.group({
      numeroBE: [''],
      fournisseur: [''],
      client: [''],
      origine: [''],
      dateSortie: ['', Validators.required],
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
  }

  loadData(): void {
    this.articleService.getAll().subscribe(res => {
      this.articles = Array.isArray(res) ? res : [];
    });

    this.articleService.getFournisseurs().subscribe(res => {
      this.fournisseurs = res;
    });

    this.articleService.getClients().subscribe(res => {
      this.clients = res;
    });

    this.stockService.getAll().subscribe(res => {
      this.stocks = res;
      this.magasins = res; // modifiable selon ton modèle réel
    });
  }

  onSubmit(): void {
    if (this.addForm.invalid) return;

    const formValue = this.addForm.value;
    const payload: BonMouvement = {
      ...formValue,
      date: new Date(formValue.dateSortie)
    };

    this.mouvementService.create('sorties/fourniture', payload).subscribe(() => {
      alert('✅ Sortie Fourniture enregistrée avec succès');
      this.addForm.reset();
      this.fetchResultats();
    });
  }

  fetchResultats(): void {
    this.mouvementService.getAll('sorties/fourniture').subscribe(data => {
      this.resultats = Array.isArray(data) ? data : [];
    });
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sorties Fourniture');
    XLSX.writeFile(workbook, 'sortie_fourniture.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Rapport des Sorties Fourniture', 14, 15);
    doc.setFontSize(10);
    doc.text(`Date de génération : ${new Date().toLocaleDateString()}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Référence', 'Désignation', 'Quantité', 'Stock', 'Date']],
      body: this.resultats.map(item => [
        item.reference || '',
        item.produitDesignation || '',
        item.quantite || '',
        item.entiteStock || '',
        item.date ? new Date(item.date).toLocaleDateString() : ''
      ])
    });

    doc.save('sortie_fourniture.pdf');
  }
}

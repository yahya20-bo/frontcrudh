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
  selector: 'app-ajout-sortie-divers',
  standalone: true,
  templateUrl: './ajout-sortie-divers.component.html',
  styleUrls: ['./ajout-sortie-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AjoutSortieDiversComponent implements OnInit {
  form!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];
  resultats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numeroBS: [''],
      fournisseur: [''],
      client: [''],
      origine: [''],
      dateMouvement: ['', Validators.required],
      responsable: [''],
      spl: [''],
      valeurBS: [''],
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

    this.articleService.getAll().subscribe((res: any) => {
      this.articles = Array.isArray(res) ? res : (res.articles ?? []);
    });

    this.stockService.getAll().subscribe((data: any) => {
      this.stocks = Array.isArray(data) ? data : (data.stocks ?? []);
    });

    this.mouvementService.getAll('sorties/divers').subscribe((data: any) => {
      this.resultats = Array.isArray(data) ? data : (data.bonMouvements ?? []);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.mouvementService.create('sorties/divers', this.form.value).subscribe(() => {
      alert('✅ Sortie Divers enregistrée avec succès');
      this.form.reset();
    });
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sorties Divers');
    XLSX.writeFile(workbook, 'sortie_divers.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Réf', 'Désignation', 'Quantité', 'Stock', 'Date']],
      body: this.resultats.map((item: any) => [
        item.reference || '',
        item.designation || '',
        item.quantite || '',
        item.entiteStock?.nom || '',
        item.dateMouvement || ''
      ])
    });
    doc.save('sortie_divers.pdf');
  }
}

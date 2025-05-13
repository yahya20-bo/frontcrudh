import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ajout-sortie-tissu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ajout-sortie-tissu.component.html',
  styleUrls: ['./ajout-sortie-tissu.component.scss']
})
export class AjoutSortieTissuComponent implements OnInit {
  addForm!: FormGroup;
  articles: any[] = [];
  clients: any[] = [];
  magasins: any[] = [];
  resultats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private bonMouvementService: BonMouvementService,
    private articleService: ArticleService,
    private stockService: EntiteStockService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      numeroBE: [''],
      client: [''],
      origine: [''],
      date: ['', Validators.required],
      responsable: [''],
      motif: [''],
      spl: [''],
      valeurBE: [''],
      etat: [''],
      facture: [''],
      magasin: [''],
      description: [''],
      articleId: ['', Validators.required],
      entiteStockId: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      couleur: [''],
      lot: [''],
      oa: [''],
      laize: [''],
      qteYard: ['']
    });

    this.articleService.getAll().subscribe((res: any) => {
      this.articles = res.articles || res;
    });

    this.articleService.getClients().subscribe((res: any) => {
      this.clients = res;
    });

    this.stockService.getAll().subscribe((res: any) => {
      this.magasins = res;
    });
  }

  ajouter(): void {
    if (this.addForm.invalid) return;

    const payload = {
      ...this.addForm.value,
      dateMouvement: this.addForm.value.date
    };

    this.bonMouvementService.ajouterSortieTissu(payload).subscribe(() => {
      alert('✅ Sortie tissu ajoutée avec succès');

      this.resultats.push({
        reference: this.getArticleReference(payload.articleId),
        designation: this.getArticleDesignation(payload.articleId),
        quantite: payload.quantite,
        entiteStock: this.getMagasinNom(payload.entiteStockId),
        date: payload.date
      });

      this.addForm.reset();
    });
  }

  getArticleReference(id: number): string {
    const article = this.articles.find(a => a.id === id);
    return article?.reference || '-';
  }

  getArticleDesignation(id: number): string {
    const article = this.articles.find(a => a.id === id);
    return article?.designation || article?.libelle || '-';
  }

  getMagasinNom(id: number): string {
    const stock = this.magasins.find(s => s.id === id);
    return stock?.designation || stock?.nom || '-';
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sorties Tissu');
    XLSX.writeFile(workbook, 'sorties-tissu.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    const head = [["Réf", "Désignation", "Quantité", "Stock", "Date"]];
    const body = this.resultats.map(r => [r.reference, r.designation, r.quantite, r.entiteStock, r.date]);

    autoTable(doc, { head, body });
    doc.save('sorties-tissu.pdf');
  }
}

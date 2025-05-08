import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  searchForm!: FormGroup;
  articles: any[] = []; // Simule des données pour l'exemple

  constructor(private fb: FormBuilder, private router: Router, private exportService: ExportService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      reference: [''],
      nature: ['']
    });

    this.articles = [
      { reference: 'REF001', nature: 'Tissu' },
      { reference: 'REF002', nature: 'Fourniture' }
    ]; // ⛔ à remplacer plus tard par une requête API
  }

  rechercher() {
    const criteres = this.searchForm.value;
    console.log('Recherche avec critères :', criteres);
    // Appeler le service d'article ici
  }

  ajouter() {
    this.router.navigate(['/stock/ajout-article']);
  }

  annuler() {
    this.searchForm.reset();
  }

  exportExcel(): void {
    this.exportService.exportToExcel(this.articles, 'articles');
  }

  exportPDF(): void {
    const headers = ['reference', 'nature'];
    this.exportService.exportToPDF(headers, this.articles, 'articles');
  }
}

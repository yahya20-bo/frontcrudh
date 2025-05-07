import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      reference: [''],
      nature: ['']
    });
  }

  rechercher() {
    const criteres = this.searchForm.value;
    console.log('Recherche avec critères :', criteres);
    // appeler le service ici
  }

  ajouter() {
    this.router.navigate(['/stock/ajout-article']);
  }

  annuler() {
    this.searchForm.reset();
  }
}

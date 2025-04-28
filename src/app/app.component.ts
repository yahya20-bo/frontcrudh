// Angular imports
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

// project import
// ⚠️ ATTENTION : SpinnerComponent n'est PAS standalone, donc on ne l'importe pas ici directement
// import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component'; // à enlever

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // ✅ Tu as bien ajouté standalone
  imports: [RouterModule], // ✅ On garde uniquement RouterModule
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  title = 'datta-able';

  // life cycle hook
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}

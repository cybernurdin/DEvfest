import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../core/services/incident.service';
import { I18nService } from '../../core/services/i18n.service';
import { Incident } from '../../core/models/incident.model';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DatePipe],
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss']
})
export class IncidentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly incidentService = inject(IncidentService);
  readonly i18n = inject(I18nService);

  incident = signal<Incident | null>(null);
  showFlagDialog = signal<boolean>(false);
  flagReason = signal<string>('');
  flagSubmitted = signal<boolean>(false);
  toastMessage = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const inc = this.incidentService.getIncidentById(id);
      if (inc) {
        this.incident.set(inc);
      } else {
        this.router.navigate(['/alerts']);
      }
    }
  }

  shareNotice(): void {
    if (navigator.clipboard && this.incident()) {
      navigator.clipboard.writeText(window.location.href);
      this.toastMessage.set(this.i18n.currentLang() === 'en' ? 'Link copied to clipboard' : 'Lien copié dans le presse-papier');
      setTimeout(() => this.toastMessage.set(null), 3000);
    }
  }

  submitFlag(): void {
    if (!this.flagReason().trim() || !this.incident()) return;
    this.incidentService.flagInaccuracy(this.incident()!.id, this.flagReason());
    this.flagSubmitted.set(true);
    setTimeout(() => {
      this.showFlagDialog.set(false);
      this.flagSubmitted.set(false);
      this.flagReason.set('');
    }, 2500);
  }
}

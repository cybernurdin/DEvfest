import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../core/services/incident.service';
import { I18nService } from '../../core/services/i18n.service';
import { IncidentCategory } from '../../core/models/incident.model';

@Component({
  selector: 'app-report-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './report-wizard.component.html',
  styleUrls: ['./report-wizard.component.scss']
})
export class ReportWizardComponent {
  readonly incidentService = inject(IncidentService);
  readonly i18n = inject(I18nService);
  private router = inject(Router);

  currentStep = signal<number>(1);
  submittedTrackingCode = signal<string | null>(null);
  isSubmitting = signal<boolean>(false);

  // Form State
  category = signal<IncidentCategory>('public-safety');
  areaId = signal<string>('area-commercial');
  description = signal<string>('');
  roadOrLandmark = signal<string>('');
  isStillOngoing = signal<boolean>(true);
  sourceType = signal<'firsthand' | 'secondhand'>('firsthand');
  evidenceUploaded = signal<boolean>(false);
  inImmediateDanger = signal<boolean>(false);

  readonly categoryOptions: { id: IncidentCategory; labelKey: string; icon: string; desc: string }[] = [
    {
      id: 'public-safety',
      labelKey: 'category.public-safety',
      icon: '🔥',
      desc: 'Fire, building collapse, hazardous smoke, structural danger'
    },
    {
      id: 'mobility',
      labelKey: 'category.mobility',
      icon: '🚧',
      desc: 'Severe traffic blockage, fallen tree, landslide, impassable road'
    },
    {
      id: 'health-utility',
      labelKey: 'category.health-utility',
      icon: '⚡',
      desc: 'Downed electrical line, water main break, sanitation hazard'
    },
    {
      id: 'weather',
      labelKey: 'category.weather',
      icon: '⛈️',
      desc: 'Flash flooding, severe storm damage, heavy hail'
    },
    {
      id: 'security-sensitive',
      labelKey: 'category.security-sensitive',
      icon: '🛡️',
      desc: 'Civilian safety hazard (Requires strict human moderation before any release)'
    }
  ];

  nextStep(): void {
    if (this.currentStep() < 5) {
      this.currentStep.update(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  simulateUpload(): void {
    this.evidenceUploaded.set(true);
  }

  handlePhotoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.evidenceUploaded.set(true);
    }
  }

  getAreaName(): string {
    const area = this.incidentService.coarseAreas.find(a => a.id === this.areaId());
    return area ? area.name : this.areaId();
  }

  submitReport(): void {
    if (this.isSubmitting() || !this.description().trim()) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      const result = this.incidentService.submitReport({
        category: this.category(),
        areaId: this.areaId(),
        description: this.description(),
        roadOrLandmark: this.roadOrLandmark(),
        isStillOngoing: this.isStillOngoing(),
        sourceType: this.sourceType(),
        evidenceIds: this.evidenceUploaded() ? ['ev-uploaded-01'] : []
      });

      this.submittedTrackingCode.set(result.trackingCode);
      this.isSubmitting.set(false);
      this.currentStep.set(6); // Success screen
    }, 600);
  }

  copyTrackingCode(): void {
    if (navigator.clipboard && this.submittedTrackingCode()) {
      navigator.clipboard.writeText(this.submittedTrackingCode()!);
    }
  }
}

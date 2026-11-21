import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../core/services/incident.service';
import { I18nService } from '../../core/services/i18n.service';
import { IncidentReport, IncidentSeverity } from '../../core/models/incident.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  readonly incidentService = inject(IncidentService);
  readonly i18n = inject(I18nService);

  activeTab = signal<'triage' | 'incidents' | 'audit'>('triage');
  selectedReport = signal<IncidentReport | null>(null);

  // Publish Form State for selected report
  publishHeadline = signal<string>('');
  publishSummary = signal<string>('');
  publishSeverity = signal<IncidentSeverity>('caution');
  publishAdvice = signal<string>('');

  // Retract dialog state
  retractIncidentId = signal<string | null>(null);
  retractReason = signal<string>('');

  selectReport(report: IncidentReport): void {
    this.selectedReport.set(report);
    this.publishHeadline.set(`Safety Caution in ${report.areaId}`);
    this.publishSummary.set(report.description);
    this.publishSeverity.set('caution');
    this.publishAdvice.set('Exercise caution in the affected neighborhood and follow guidance from local monitors.');
  }

  confirmPublish(): void {
    if (!this.selectedReport()) return;

    this.incidentService.adminPublishReport(
      this.selectedReport()!.id,
      this.publishHeadline(),
      this.publishSummary(),
      this.publishSeverity(),
      this.publishAdvice()
    );

    this.selectedReport.set(null);
  }

  confirmRetract(): void {
    if (!this.retractIncidentId() || !this.retractReason().trim()) return;

    this.incidentService.adminRetractIncident(
      this.retractIncidentId()!,
      this.retractReason()
    );

    this.retractIncidentId.set(null);
    this.retractReason.set('');
  }
}

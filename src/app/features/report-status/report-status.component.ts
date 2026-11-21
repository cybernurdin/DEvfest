import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../core/services/incident.service';
import { I18nService } from '../../core/services/i18n.service';
import { IncidentReport } from '../../core/models/incident.model';

@Component({
  selector: 'app-report-status',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './report-status.component.html',
  styleUrls: ['./report-status.component.scss']
})
export class ReportStatusComponent implements OnInit {
  private route = inject(ActivatedRoute);
  readonly incidentService = inject(IncidentService);
  readonly i18n = inject(I18nService);

  trackingInput = signal<string>('');
  searched = signal<boolean>(false);
  foundReport = signal<IncidentReport | null>(null);

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('trackingId');
    if (code) {
      this.trackingInput.set(code);
      this.search();
    }
  }

  search(): void {
    if (!this.trackingInput().trim()) return;
    this.searched.set(true);
    const report = this.incidentService.lookupReportStatus(this.trackingInput());
    this.foundReport.set(report || null);
  }
}

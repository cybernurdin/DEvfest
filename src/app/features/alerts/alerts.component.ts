import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../core/services/incident.service';
import { I18nService } from '../../core/services/i18n.service';
import { Incident, IncidentCategory, IncidentSeverity } from '../../core/models/incident.model';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DatePipe],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  readonly incidentService = inject(IncidentService);
  readonly i18n = inject(I18nService);

  viewMode = signal<'list' | 'map'>('list');
  selectedMapAreaId = signal<string | null>(null);
  selectedMapIncident = signal<Incident | null>(null);
  shareToast = signal<string | null>(null);
  mapProvider = signal<'svg' | 'google'>('svg');

  readonly categories: { id: IncidentCategory | 'all'; labelKey: string }[] = [
    { id: 'all', labelKey: 'category.all' },
    { id: 'public-safety', labelKey: 'category.public-safety' },
    { id: 'mobility', labelKey: 'category.mobility' },
    { id: 'security-sensitive', labelKey: 'category.security-sensitive' },
    { id: 'health-utility', labelKey: 'category.health-utility' },
    { id: 'weather', labelKey: 'category.weather' }
  ];

  readonly severities: { id: IncidentSeverity | 'all'; labelKey: string }[] = [
    { id: 'all', labelKey: 'All' },
    { id: 'urgent', labelKey: 'severity.urgent' },
    { id: 'caution', labelKey: 'severity.caution' },
    { id: 'information', labelKey: 'severity.information' }
  ];

  readonly activeAlertCount = computed(() =>
    this.incidentService.incidents().filter(i => i.verificationStatus !== 'retracted').length
  );

  readonly urgentCount = computed(() =>
    this.incidentService.incidents().filter(i => i.severity === 'urgent').length
  );

  readonly cautionCount = computed(() =>
    this.incidentService.incidents().filter(i => i.severity === 'caution').length
  );

  setCategory(cat: IncidentCategory | 'all'): void {
    this.incidentService.activeCategory.set(cat);
  }

  setSeverity(sev: IncidentSeverity | 'all'): void {
    this.incidentService.activeSeverity.set(sev);
  }

  setView(mode: 'list' | 'map'): void {
    this.viewMode.set(mode);
  }

  toggleMapProvider(provider: 'svg' | 'google'): void {
    this.mapProvider.set(provider);
  }

  selectAreaOnMap(areaId: string): void {
    this.selectedMapAreaId.set(areaId);
    const incidentInArea = this.incidentService
      .incidents()
      .find(i => i.areaId === areaId);
    this.selectedMapIncident.set(incidentInArea || null);
  }

  shareIncident(inc: Incident): void {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}/alerts/${inc.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`[SafeCity Alert] ${inc.headline} - ${inc.areaName}: ${url}`);
      this.shareToast.set(this.i18n.currentLang() === 'en' ? 'Alert notice link copied' : 'Lien copié dans le presse-papier');
      setTimeout(() => this.shareToast.set(null), 3000);
    }
  }

  getSeverityClass(severity: IncidentSeverity): string {
    switch (severity) {
      case 'urgent':
        return 'severity-urgent';
      case 'caution':
        return 'severity-caution';
      case 'information':
        return 'severity-info';
    }
  }

  getVerificationClass(status: string): string {
    switch (status) {
      case 'official-source':
        return 'status-official';
      case 'corroborated':
        return 'status-corroborated';
      case 'community-reported':
        return 'status-community';
      case 'retracted':
        return 'status-retracted';
      default:
        return 'status-reviewing';
    }
  }

  formatTime(isoDate: string): string {
    try {
      const diffMs = Date.now() - new Date(isoDate).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 60) {
        return diffMins <= 1 ? 'Just now' : `${diffMins}m ago`;
      }
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) {
        return `${diffHours}h ago`;
      }
      return `${Math.floor(diffHours / 24)}d ago`;
    } catch {
      return 'Recently';
    }
  }
}

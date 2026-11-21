import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../core/services/incident.service';
import { I18nService } from '../../core/services/i18n.service';
import { IncidentCategory, IncidentSeverity } from '../../core/models/incident.model';

@Component({
  selector: 'app-my-alerts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-alerts.component.html',
  styleUrls: ['./my-alerts.component.scss']
})
export class MyAlertsComponent {
  readonly incidentService = inject(IncidentService);
  readonly i18n = inject(I18nService);

  savedToast = signal<string | null>(null);
  simulatedPush = signal<string | null>(null);

  // Form State initialized from service
  followedAreas = signal<string[]>([...this.incidentService.userSubscription().followedAreas]);
  followedCategories = signal<IncidentCategory[]>([...this.incidentService.userSubscription().followedCategories]);
  minSeverity = signal<IncidentSeverity>(this.incidentService.userSubscription().minimumSeverity);
  quietHours = signal<boolean>(this.incidentService.userSubscription().quietHoursEnabled);
  notificationsActive = signal<boolean>(this.incidentService.userSubscription().notificationsEnabled);

  toggleArea(areaId: string): void {
    const list = this.followedAreas();
    if (list.includes(areaId)) {
      this.followedAreas.set(list.filter(a => a !== areaId));
    } else {
      this.followedAreas.set([...list, areaId]);
    }
  }

  toggleCategory(cat: IncidentCategory): void {
    const list = this.followedCategories();
    if (list.includes(cat)) {
      this.followedCategories.set(list.filter(c => c !== cat));
    } else {
      this.followedCategories.set([...list, cat]);
    }
  }

  savePreferences(): void {
    this.incidentService.updateSubscription({
      followedAreas: this.followedAreas(),
      followedCategories: this.followedCategories(),
      minimumSeverity: this.minSeverity(),
      quietHoursEnabled: this.quietHours(),
      notificationsEnabled: this.notificationsActive()
    });

    this.savedToast.set(
      this.i18n.currentLang() === 'en'
        ? 'Alert preferences saved successfully'
        : 'Préférences d’alerte enregistrées avec succès'
    );
    setTimeout(() => this.savedToast.set(null), 3000);
  }

  testNotification(): void {
    this.simulatedPush.set(
      '[SafeCity Alert Test] Verified road caution on Station Hill: Mudslide runoff cleared to single lane. Proceed with caution.'
    );
    setTimeout(() => this.simulatedPush.set(null), 6000);
  }
}

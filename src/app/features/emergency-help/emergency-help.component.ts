import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../../core/services/incident.service';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-emergency-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emergency-help.component.html',
  styleUrls: ['./emergency-help.component.scss']
})
export class EmergencyHelpComponent {
  readonly incidentService = inject(IncidentService);
  readonly i18n = inject(I18nService);
}

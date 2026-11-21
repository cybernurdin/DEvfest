import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'alerts',
    pathMatch: 'full'
  },
  {
    path: 'alerts',
    loadComponent: () =>
      import('./features/alerts/alerts.component').then(m => m.AlertsComponent)
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./features/alerts/alerts.component').then(m => m.AlertsComponent)
  },
  {
    path: 'alerts/:id',
    loadComponent: () =>
      import('./features/incident-detail/incident-detail.component').then(
        m => m.IncidentDetailComponent
      )
  },
  {
    path: 'report',
    loadComponent: () =>
      import('./features/report-wizard/report-wizard.component').then(
        m => m.ReportWizardComponent
      )
  },
  {
    path: 'report/status',
    loadComponent: () =>
      import('./features/report-status/report-status.component').then(
        m => m.ReportStatusComponent
      )
  },
  {
    path: 'report/status/:trackingId',
    loadComponent: () =>
      import('./features/report-status/report-status.component').then(
        m => m.ReportStatusComponent
      )
  },
  {
    path: 'my-alerts',
    loadComponent: () =>
      import('./features/my-alerts/my-alerts.component').then(
        m => m.MyAlertsComponent
      )
  },
  {
    path: 'emergency-help',
    loadComponent: () =>
      import('./features/emergency-help/emergency-help.component').then(
        m => m.EmergencyHelpComponent
      )
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: '**',
    redirectTo: 'alerts'
  }
];

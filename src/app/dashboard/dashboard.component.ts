import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  buttons: any[] = [
    {
      text: 'Currencies',
      link: '/dashboard/currencies',
      size: 'btn-lg me-5',
    },
    {
      text: 'Gold',
      link: '/dashboard/gold-prices',
      size: 'btn-lg',
    }]
  activeButtonIndex!: number 

  setActiveButton(index: number): void {
    this.activeButtonIndex = index
  }
}

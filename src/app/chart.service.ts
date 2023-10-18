import { Injectable } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  renderChart(labelData: string[], dataData: number[], id: string) {
    const myChart = new Chart(id, {
      type: 'line',
      data: {
        labels: labelData,
        datasets: [{
          label: 'Exchange Rates',
          data: dataData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
}

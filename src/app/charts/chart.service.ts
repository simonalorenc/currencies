import { Injectable } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  createChart(labels: string[], data: number[], id: string) {
    new Chart(id, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Exchange Rates',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderWidth: 3,
          pointRadius: 4,
          borderJoinStyle: 'miter',
          fill: true,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.parsed.y.toString() || '';
                return label
              }
            }
          }
        }
      }
    })
  }
}

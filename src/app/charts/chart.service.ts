import { Injectable } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private BACKGROUND_COLOR = '#FFC4001A';
  private BORDER_COLOR = '#FFC400';
  private POINT_COLOR = '#FFC400';

  constructor() {
    Chart.register(...registerables);
  }

  createChart(labels: string[], data: number[], id: string): void {
    new Chart(id, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Exchange Rates',
            data: data,
            backgroundColor: this.BACKGROUND_COLOR,
            borderColor: this.BORDER_COLOR,
            borderWidth: 2,
            pointRadius: 4,
            borderJoinStyle: 'miter',
            fill: true,
            pointBackgroundColor: this.POINT_COLOR,
            tension: 0.4
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.parsed.y.toString() || '';
                return label;
              },
            },
          },
        },
        animation: {
            duration: 750,
            easing: 'linear',
            loop: false
        },        
      },
    });
  }
}
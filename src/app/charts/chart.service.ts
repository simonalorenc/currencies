import { Injectable } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  createChart(labels: string[], data: number[], id: string) {
    new Chart(id, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Exchange Rates',
            data: data,
            backgroundColor: 'rgb(226, 235, 247, 0.4)',
            borderColor: 'rgb(40, 81, 146, 0.4)',
            borderWidth: 2,
            pointRadius: 4,
            borderJoinStyle: 'miter',
            fill: true,
            pointBackgroundColor: 'rgb(40, 81, 146, 0.4)',
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
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
            backgroundColor: 'rgb(255, 196, 0, 0.1)',
            borderColor: '#FFC400',
            borderWidth: 2,
            pointRadius: 4,
            borderJoinStyle: 'miter',
            fill: true,
            pointBackgroundColor: '#FFC400',
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
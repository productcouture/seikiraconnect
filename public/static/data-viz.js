/**
 * Interactive Data Visualizations
 * Using Chart.js for dynamic charts and metrics
 */

class DataVisualizationController {
  constructor() {
    this.charts = new Map();
    this.init();
  }

  async init() {
    // Wait for DOM to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeCharts());
    } else {
      this.initializeCharts();
    }
  }

  initializeCharts() {
    // Initialize all chart types
    this.createRetentionChart();
    this.createWageGrowthChart();
    this.createCompletionRateChart();
    this.createSkillAlignmentChart();
    this.createCohortAnalytics();
    this.createImpactMetrics();
    
    console.log('📊 Data visualizations initialized');
  }

  /**
   * Retention Rate Over Time Chart
   */
  createRetentionChart() {
    const canvas = document.getElementById('retentionChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const data = {
      labels: ['30 Days', '60 Days', '90 Days', '120 Days', '180 Days', '365 Days'],
      datasets: [
        {
          label: 'Seikira Kinect',
          data: [98, 95, 92, 90, 88, 85],
          borderColor: '#2a9d8f',
          backgroundColor: 'rgba(42, 157, 143, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#2a9d8f',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        },
        {
          label: 'Industry Average',
          data: [85, 75, 65, 58, 52, 45],
          borderColor: '#d4af37',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#d4af37',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        },
        {
          label: 'Traditional Programs',
          data: [75, 62, 48, 38, 32, 28],
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: 'rgba(255, 255, 255, 0.3)',
          pointBorderColor: '#fff',
          pointBorderWidth: 1
        }
      ]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: 'Retention Rate Comparison',
            color: '#f5f3ef',
            font: {
              size: 18,
              family: 'Inter',
              weight: '600'
            },
            padding: 20
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#f5f3ef',
              font: {
                size: 12,
                family: 'Inter'
              },
              padding: 15,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: 'rgba(10, 10, 12, 0.9)',
            titleColor: '#f5f3ef',
            bodyColor: '#f5f3ef',
            borderColor: '#2a9d8f',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + '%';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: '#f5f3ef',
              font: {
                family: 'JetBrains Mono',
                size: 11
              },
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }
          },
          x: {
            ticks: {
              color: '#f5f3ef',
              font: {
                family: 'JetBrains Mono',
                size: 11
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }
          }
        }
      }
    };

    this.charts.set('retention', new Chart(ctx, config));
  }

  /**
   * Wage Growth Trajectory Chart
   */
  createWageGrowthChart() {
    const canvas = document.getElementById('wageGrowthChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const data = {
      labels: ['Entry', '6 Months', '12 Months', '18 Months', '24 Months'],
      datasets: [
        {
          label: 'With Seikira',
          data: [15, 18, 22, 26, 32],
          borderColor: '#2a9d8f',
          backgroundColor: 'rgba(42, 157, 143, 0.2)',
          borderWidth: 3,
          tension: 0.3,
          fill: true
        },
        {
          label: 'Without Seikira',
          data: [15, 16, 17, 18.5, 20],
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }
      ]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Average Hourly Wage Growth',
            color: '#f5f3ef',
            font: {
              size: 18,
              family: 'Inter',
              weight: '600'
            },
            padding: 20
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#f5f3ef',
              font: {
                size: 12,
                family: 'Inter'
              },
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(10, 10, 12, 0.9)',
            titleColor: '#f5f3ef',
            bodyColor: '#f5f3ef',
            borderColor: '#2a9d8f',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' + context.parsed.y + '/hr';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 10,
            max: 35,
            ticks: {
              color: '#f5f3ef',
              font: {
                family: 'JetBrains Mono',
                size: 11
              },
              callback: function(value) {
                return '$' + value;
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#f5f3ef',
              font: {
                family: 'JetBrains Mono',
                size: 11
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            }
          }
        }
      }
    };

    this.charts.set('wageGrowth', new Chart(ctx, config));
  }

  /**
   * Completion Rate Bar Chart
   */
  createCompletionRateChart() {
    const canvas = document.getElementById('completionChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const data = {
      labels: ['Credential Programs', 'Job Training', 'Upskilling', 'Career Pathways'],
      datasets: [
        {
          label: 'Seikira Platform',
          data: [85, 90, 88, 82],
          backgroundColor: 'rgba(42, 157, 143, 0.8)',
          borderColor: '#2a9d8f',
          borderWidth: 2
        },
        {
          label: 'Industry Average',
          data: [45, 52, 48, 38],
          backgroundColor: 'rgba(212, 175, 55, 0.8)',
          borderColor: '#d4af37',
          borderWidth: 2
        }
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Program Completion Rates',
            color: '#f5f3ef',
            font: {
              size: 18,
              family: 'Inter',
              weight: '600'
            },
            padding: 20
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#f5f3ef',
              font: {
                size: 12,
                family: 'Inter'
              },
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(10, 10, 12, 0.9)',
            titleColor: '#f5f3ef',
            bodyColor: '#f5f3ef',
            borderColor: '#2a9d8f',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + '%';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: '#f5f3ef',
              font: {
                family: 'JetBrains Mono',
                size: 11
              },
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#f5f3ef',
              font: {
                family: 'Inter',
                size: 11
              }
            },
            grid: {
              display: false
            }
          }
        }
      }
    };

    this.charts.set('completion', new Chart(ctx, config));
  }

  /**
   * Skill Alignment Radar Chart
   */
  createSkillAlignmentChart() {
    const canvas = document.getElementById('skillAlignmentChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const data = {
      labels: [
        'Technical Skills',
        'Soft Skills',
        'Industry Knowledge',
        'Work Readiness',
        'Digital Literacy',
        'Problem Solving'
      ],
      datasets: [
        {
          label: 'Seikira Graduates',
          data: [92, 88, 90, 95, 93, 89],
          borderColor: '#2a9d8f',
          backgroundColor: 'rgba(42, 157, 143, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#2a9d8f',
          pointBorderColor: '#fff',
          pointRadius: 4
        },
        {
          label: 'Traditional Programs',
          data: [65, 58, 62, 55, 60, 58],
          borderColor: 'rgba(255, 255, 255, 0.4)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(255, 255, 255, 0.4)',
          pointBorderColor: '#fff',
          pointRadius: 4
        }
      ]
    };

    const config = {
      type: 'radar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Employer Skill Alignment Score',
            color: '#f5f3ef',
            font: {
              size: 18,
              family: 'Inter',
              weight: '600'
            },
            padding: 20
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#f5f3ef',
              font: {
                size: 12,
                family: 'Inter'
              },
              padding: 15
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: '#f5f3ef',
              backdropColor: 'transparent',
              font: {
                family: 'JetBrains Mono',
                size: 10
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#f5f3ef',
              font: {
                family: 'Inter',
                size: 11
              }
            }
          }
        }
      }
    };

    this.charts.set('skillAlignment', new Chart(ctx, config));
  }

  /**
   * Cohort Analytics Doughnut Chart
   */
  createCohortAnalytics() {
    const canvas = document.getElementById('cohortChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const data = {
      labels: ['Completed & Employed', 'In Progress', 'Completed & Job-Seeking', 'Paused'],
      datasets: [{
        data: [68, 22, 7, 3],
        backgroundColor: [
          'rgba(42, 157, 143, 0.8)',
          'rgba(212, 175, 55, 0.8)',
          'rgba(74, 32, 64, 0.8)',
          'rgba(255, 255, 255, 0.2)'
        ],
        borderColor: [
          '#2a9d8f',
          '#d4af37',
          '#4a2040',
          'rgba(255, 255, 255, 0.3)'
        ],
        borderWidth: 2
      }]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Cohort Status Distribution',
            color: '#f5f3ef',
            font: {
              size: 18,
              family: 'Inter',
              weight: '600'
            },
            padding: 20
          },
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: '#f5f3ef',
              font: {
                size: 12,
                family: 'Inter'
              },
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(10, 10, 12, 0.9)',
            titleColor: '#f5f3ef',
            bodyColor: '#f5f3ef',
            borderColor: '#2a9d8f',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    };

    this.charts.set('cohort', new Chart(ctx, config));
  }

  /**
   * Impact Metrics Dashboard
   */
  createImpactMetrics() {
    const canvas = document.getElementById('impactChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const data = {
      labels: ['Lives Impacted', 'Employers Partnered', 'Credentials Earned', 'Wage Increase', 'Retention Rate', 'Job Placements'],
      datasets: [{
        label: 'Impact Metrics',
        data: [500000, 2500, 125000, 113, 90, 88],
        backgroundColor: [
          'rgba(42, 157, 143, 0.8)',
          'rgba(212, 175, 55, 0.8)',
          'rgba(42, 157, 143, 0.6)',
          'rgba(212, 175, 55, 0.6)',
          'rgba(42, 157, 143, 0.4)',
          'rgba(212, 175, 55, 0.4)'
        ],
        borderColor: [
          '#2a9d8f',
          '#d4af37',
          '#2a9d8f',
          '#d4af37',
          '#2a9d8f',
          '#d4af37'
        ],
        borderWidth: 2
      }]
    };

    const config = {
      type: 'polarArea',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Platform Impact Overview',
            color: '#f5f3ef',
            font: {
              size: 18,
              family: 'Inter',
              weight: '600'
            },
            padding: 20
          },
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: '#f5f3ef',
              font: {
                size: 11,
                family: 'Inter'
              },
              padding: 10
            }
          }
        },
        scales: {
          r: {
            ticks: {
              color: '#f5f3ef',
              backdropColor: 'transparent',
              font: {
                family: 'JetBrains Mono',
                size: 10
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    };

    this.charts.set('impact', new Chart(ctx, config));
  }

  /**
   * Update chart with new data
   */
  updateChart(chartName, newData) {
    const chart = this.charts.get(chartName);
    if (chart) {
      chart.data = newData;
      chart.update();
    }
  }

  /**
   * Destroy all charts
   */
  destroy() {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
  }
}

// Initialize when DOM is ready
if (typeof Chart !== 'undefined') {
  window.dataViz = new DataVisualizationController();
} else {
  console.warn('Chart.js not loaded. Skipping data visualizations.');
}

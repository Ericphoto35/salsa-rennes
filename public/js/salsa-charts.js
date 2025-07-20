// Configuration des graphiques pour la page "Pourquoi les gens font de la salsa ?"

// Fonction auto-invoquée pour éviter les variables globales
(function() {
  // Vérifier si la fonction a déjà été initialisée
  if (window.initSalsaCharts) {
    console.log('initSalsaCharts déjà défini, évite la redéclaration');
    return;
  }

  const salsaPalette = {
    lightBackground: '#F8F9FA',
    yellow: '#FFD166',
    green: '#06D6A0',
    blue: '#118AB2',
    redPink: '#EF476F',
    darkText: '#333333',
    grayText: '#6C757D'
  };

  const defaultTooltipCallback = {
    plugins: {
        tooltip: {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                        return label.join(' ');
                    }
                    return label;
                }
            }
        }
    }
};

function wrapLabel(str, maxWidth) {
    if (str.length <= maxWidth) {
        return str;
    }
    const words = str.split(' ');
    let lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + ' ' + word).trim().length > maxWidth && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = (currentLine + ' ' + word).trim();
        }
    });
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }
    return lines;
}

function initSalsaCharts() {
    if (typeof window === 'undefined' || !window.Chart) {
        console.warn('Chart.js not loaded or running in SSR mode');
        return;
    }

    // Graphique de croissance de la salsa
    const salsaGrowthChart = document.getElementById('salsaGrowthChart');
    if (salsaGrowthChart) {
        new Chart(salsaGrowthChart, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024 (Est.)'],
                datasets: [{
                    label: 'Inscriptions annuelles (en milliers)',
                    data: [15, 20, 28, 35, 40],
                    backgroundColor: salsaPalette.yellow + '40',
                    borderColor: salsaPalette.yellow,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Inscriptions (en milliers)' }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: defaultTooltipCallback.plugins.tooltip
                }
            }
        });
    }
    
    // Graphique des bénéfices sociaux
    const socialBenefitsChart = document.getElementById('socialBenefitsChart');
    if (socialBenefitsChart) {
        new Chart(socialBenefitsChart, {
            type: 'bar',
            data: {
                labels: [
                    wrapLabel('Rencontrer de nouvelles personnes', 16),
                    wrapLabel('Faire partie d\'une communauté', 16),
                    wrapLabel('Développer sa confiance en soi', 16),
                    wrapLabel('Élargir son cercle social', 16)
                ],
                datasets: [{
                    label: '% des danseurs',
                    data: [75, 68, 55, 60],
                    backgroundColor: [salsaPalette.blue, salsaPalette.green, salsaPalette.yellow, salsaPalette.redPink],
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        title: { display: true, text: '% des danseurs' }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: defaultTooltipCallback.plugins.tooltip
                }
            }
        });
    }
    
    // Graphique des bénéfices pour la santé
    const healthBenefitsChart = document.getElementById('healthBenefitsChart');
    if (healthBenefitsChart) {
        new Chart(healthBenefitsChart, {
            type: 'radar',
            data: {
                labels: ['Cardio', 'Coordination', 'Flexibilité', 'Endurance', 'Réduction Stress'],
                datasets: [{
                    label: 'Bénéfices',
                    data: [85, 90, 70, 75, 95],
                    backgroundColor: salsaPalette.green + '40',
                    borderColor: salsaPalette.green,
                    pointBackgroundColor: salsaPalette.green,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: salsaPalette.green
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { display: false },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        pointLabels: {
                            font: { size: 12 }
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: defaultTooltipCallback.plugins.tooltip
                }
            }
        });
    }
    
    // Graphique de l'attrait culturel
    const culturalAppealChart = document.getElementById('culturalAppealChart');
    if (culturalAppealChart) {
        new Chart(culturalAppealChart, {
            type: 'pie',
            data: {
                labels: [
                    wrapLabel('Amour de la musique latine', 16),
                    wrapLabel('Découverte culturelle', 16),
                    wrapLabel('Expression corporelle', 16),
                    wrapLabel('Énergie et joie de vivre', 16)
                ],
                datasets: [{
                    data: [35, 25, 20, 20],
                    backgroundColor: [salsaPalette.redPink, salsaPalette.blue, salsaPalette.yellow, salsaPalette.green],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: { size: 14 }
                        }
                    },
                    tooltip: defaultTooltipCallback.plugins.tooltip
                }
            }
        });
    }

    // Graphique des données démographiques
    const demographicsChart = document.getElementById('demographicsChart');
    if (demographicsChart) {
        new Chart(demographicsChart, {
            type: 'bar',
            data: {
                labels: ['18-25 ans', '26-35 ans', '36-50 ans', '50+ ans'],
                datasets: [{
                    label: 'Répartition par âge',
                    data: [20, 40, 30, 10],
                    backgroundColor: [salsaPalette.yellow, salsaPalette.green, salsaPalette.blue, salsaPalette.redPink],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '% des danseurs' }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: defaultTooltipCallback.plugins.tooltip
                }
            }
        });
    }
}

  // Rendre la fonction disponible globalement
  if (typeof window !== 'undefined') {
    window.initSalsaCharts = initSalsaCharts;
  }
})();

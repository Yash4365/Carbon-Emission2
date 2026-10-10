/**
 * Dynamic Chart.js Analytics Controller
 */
function initDashboardCharts(breakdownData, historicalLogs) {
    const ctxD = document.getElementById('doughnutChart')?.getContext('2d');
    const ctxB = document.getElementById('barChart')?.getContext('2d');

    if (ctxD) {
        new Chart(ctxD, {
            type: 'doughnut',
            data: {
                labels: ['Electricity', 'Vehicle', 'Flights', 'Diet', 'Waste'],
                datasets: [{
                    data: breakdownData || [187, 59.5, 270, 180, 18],
                    backgroundColor: ['#f59e0b', '#06b6d4', '#6366f1', '#10b981', '#f43f5e']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    if (ctxB) {
        new Chart(ctxB, {
            type: 'bar',
            data: {
                labels: historicalLogs ? historicalLogs.map((_, i) => `Log ${i + 1}`) : ['Log 1', 'Log 2'],
                datasets: [{
                    label: 'Total Emissions (kg CO₂e)',
                    data: historicalLogs ? historicalLogs.map(l => l.totalCO2 || l.total) : [428, 714.5],
                    backgroundColor: '#10b981'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}
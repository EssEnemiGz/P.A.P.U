// Datos para la gráfica de barras
const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];
const data = [12, 19, 3, 5, 2];

// Crear la instancia de la gráfica
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Ventas por mes',
            data: data,
            backgroundColor: '#00003D', // Color de las barras
            borderColor: '#8C898A', // Borde de las barras
            borderWidth: 1
        }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true // Empezar desde cero en el eje Y
            }
        }
}});

const ctx2 = document.getElementById('myChart2').getContext('2d');
var barColors = ['#4682B4', '#87CEEB', '#6495ED', '#ADD8E6', '#1E90FF'];
const myChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Ventas por mes',
            data: data,
            backgroundColor: barColors, // Color de las barras
            borderColor: '#8C898A', // Borde de las barras
            borderWidth: 1
        }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true // Empezar desde cero en el eje Y
            }
        }
}});

const ctx3 = document.getElementById('myChart3').getContext('2d');
const myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Ventas por mes',
            data: data,
            backgroundColor: barColors, // Color de las barras
            borderColor: '#8C898A', // Borde de las barras
            borderWidth: 1
        }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true // Empezar desde cero en el eje Y
            }
        }
}});
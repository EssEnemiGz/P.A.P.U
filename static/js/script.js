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

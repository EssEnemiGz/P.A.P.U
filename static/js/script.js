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
            backgroundColor: 'rgb(126, 215, 193)', // Color de las barras
            borderColor: 'rgb(126, 215, 193)', // Borde de las barras
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

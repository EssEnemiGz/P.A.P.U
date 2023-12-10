// Datos para la gráfica de barras
const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let data = [];
for (var i=0;i<11;i++){
    data.push(Math.floor(Math.random() * 1000) + 1);
}

let myChart = null;
let myChart2 = null;
let myChart3 = null;

function destruirGraficas() {
    if (myChart) {
        myChart.destroy();
    }
    if (myChart2) {
        myChart2.destroy();
    }
    if (myChart3) {
        myChart3.destroy();
    }
}

function generarGráfica(){
    destruirGraficas();
    // Crear la instancia de la gráfica
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
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
    myChart2 = new Chart(ctx2, {
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
        }
    });

    const ctx3 = document.getElementById('myChart3').getContext('2d');
    myChart3 = new Chart(ctx3, {
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
}

generarGráfica();

function cargarJSON() {
    const file = document.getElementById('up__input').files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(event) {
        try {
          const objetoJSON = JSON.parse(event.target.result);
          data = objetoJSON;
          generarGráfica();

          // Aquí puedes trabajar con el objeto JSON como desees
          // Por ejemplo:
          // console.log(objetoJSON);
          // objetoJSON.propiedad...
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsText(file);
    }
}
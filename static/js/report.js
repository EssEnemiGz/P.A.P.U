let myChart2 = null;
let myChart3 = null;

function destruirGraficas() {
    if (myChart2) {
        myChart2.destroy();
    }
    if (myChart3) {
        myChart3.destroy();
    }
}

function generarGráfica(data, labels){
    destruirGraficas();
    // Crear la instancia de la gráfica
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    var barColors = ['#4682B4', '#87CEEB', '#6495ED', '#ADD8E6', '#1E90FF'];
    myChart2 = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad de registros por tabla',
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
                label: 'Cantidad de registros por tabla',
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

function cargarJSON() {
    const file = document.getElementById('up__input').files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(event) {
        try {
          const objetoJSON = JSON.parse(event.target.result);
          data = objetoJSON;
          generarGráfica()
          // TO WORK WITH THE JSON FILE
          
          let fechaActual = new Date();          
          let año = fechaActual.getFullYear();
          let mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1
          let dia = fechaActual.getDate();          
          let fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

          document.querySelector(".db-name").innerText = "El presente informe detalla un análisis de datos obtenidos de la base de datos "+file['name']+".";
          document.querySelector(".date").innerText = fechaFormateada;
          document.querySelector(".numero-registros").innerText = objetoJSON.length+1+" registros fueron encontrados por el sistema";
          document.querySelector(".size").innerText = "El tamaño total estimado de la base de datos es de "+file['size']+"KB";
          let tendencia;
          if (objetoJSON[10] > objetoJSON[0]){
            tendencia = "La tendencia actual es una subida, con una diferencia de "+String(objetoJSON[10]-objetoJSON[0])+" ventas con respecto al primer mes del año."
          }
          else{
            tendencia = "La tendencia actual es una bajada, con una diferencia de "+String(objetoJSON[0]-objetoJSON[10])+" ventas con respecto al primer mes del año."
          }
          document.querySelector(".tendencia").innerText = tendencia;
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsText(file);
    }
}

async function leerArchivoExcel() {
    const fileInput = document.getElementById('up__input');

    // Verificar si se ha seleccionado un archivo
    if (!fileInput.files || fileInput.files.length === 0) {
        console.error('No se ha seleccionado ningún archivo.');
        return;
    }

    // Obtener el archivo seleccionado
    const archivo = fileInput.files[0];

    // Verificar que sea un archivo Excel (.xlsx)
    if (!archivo.name.endsWith('.xlsx')) {
        console.error('El archivo seleccionado no es un archivo Excel (.xlsx).');
        return;
    }

    // Crear un nuevo objeto Workbook de exceljs
    const workbook = new ExcelJS.Workbook();

    // Leer el contenido del archivo utilizando FileReader
    const reader = new FileReader();
    reader.onload = async (event) => {
        const buffer = event.target.result;

        // Cargar el archivo Excel desde el buffer
        await workbook.xlsx.load(buffer);

        // Obtener la primera hoja de cálculo del archivo
        const hojas = workbook.worksheets;
        const rowData = {};

        for (let sheet = 1; sheet < hojas.length; sheet++){
            let worksheet = workbook.getWorksheet(sheet);
            let line_jump = null;
            rowData[`hoja${sheet}`] = [];
            rowData[`hoja${sheet}`].push([]);

            for (let row = 1; row < 555; row++){
                for (let col = 1; col < 9; col++){
                    const cell = worksheet.getCell(row, col);

                    if (line_jump === null) {
                        line_jump = row;
                        rowData[`hoja${sheet}`][0].push([]);
                    }
                    else if (line_jump !== row) {
                        line_jump = row;
                        rowData[`hoja${sheet}`][0].push([]);
                    }
                    else if (line_jump === row && cell.value !== null) {
                        rowData[`hoja${sheet}`][0][row-1].push(cell.value);
                    };
                }
            }

            const listaFiltrada = rowData[`hoja${sheet}`][0].filter(elemento => elemento.length > 0);
            rowData[`hoja${sheet}`][0] = listaFiltrada;
        }
        let fechaActual = new Date();          
        let año = fechaActual.getFullYear();
        let mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1
        let dia = fechaActual.getDate();          
        let fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
        let registers = 0;

        let labels = [];
        let data = [];
        for (let i=1; i<hojas.length; i++){
            labels.push(workbook.getWorksheet(i).name);
            data.push(rowData[`hoja${i}`][0].length)
            registers+=rowData[`hoja${i}`][0].length;
        }
        console.log(labels, data, workbook.getWorksheet(1).name)

        document.querySelector(".db-name").innerText = "El presente informe detalla un análisis de datos obtenidos de la base de datos "+archivo.name+".";
        document.querySelector(".db-name2").innerText = archivo.name;
        document.querySelector(".date").innerText = fechaFormateada;
        document.querySelector(".numero-registros").innerText = registers+" registros fueron encontrados por el sistema";
        let size = archivo.size/1000;
        document.querySelector(".size").innerText = "El tamaño total estimado de la base de datos es de "+size.toFixed(2)+"KB";
        document.querySelector(".file-type").innerText = archivo.name.split(".")[1];

        console.log(1)
        generarGráfica(data, labels);
    };

    // Leer el contenido del archivo como un ArrayBuffer
    reader.readAsArrayBuffer(archivo);
}
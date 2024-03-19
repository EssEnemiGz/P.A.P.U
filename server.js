const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Define la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, './')));

// Escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

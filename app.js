const express = require('express');
const app = express();

//Motor de plantillas
app.set('view engine', 'ejs');

//Enrutador - "/" index
app.use('/', require('./router'));

app.listen(5000, () => {
  console.log("Servidor ejecuntadose en http://localhost:5000");
})
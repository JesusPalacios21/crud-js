const express = require('express');
const router = express.Router();
const conexion = require('./database/db')

//req=> Solicitud
//res=> Respuesta

router.get('/', (req, res) => {
  //Retornamos una conexion de datos. Consulta exitosa "results", falló "error"
  conexion.query("SELECT * FROM vehiculos", (error, results) => {
    if(error){
      throw error;
    }else{
      res.send(results);
    }
  });
});

module.exports = router;
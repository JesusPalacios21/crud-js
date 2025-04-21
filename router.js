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
      //Enviamos "json" los datos al navegador
      //res.send(results);
      //res.render('edit', { dev: 'Jesus Eduardo Yataco Palacios', skill:'Javascript', friends:['a','b','c']});
      res.render('index', {registros: results})
    }
  });
});

//Enrutador para el registro
router.get('/create', (req, res) => {
  res.render('create');
});

router.get('/delete/:id', (req, res) => {
  const idvehiculo = req.params.id;
  conexion.query("DELETE FROM vehiculos WHERE id= ?", [idvehiculo], (error, results) => {
    if (error){
      throw(error);
    }else{  
      res.redirect('/');
    }
  });
});

//Para editar debemos identificar el registro
router.get('/edit/:id', (req,res) => {
  conexion.query("SELECT * FROM vehiculos WHERE id= ?", [req.params.id], (error, results) => {
    if(error){
      throw(error);
    }else{
      res.render('edit', {vehiculo: results[0]});
    }
  });
});

//Acceder a toda la logica
const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;
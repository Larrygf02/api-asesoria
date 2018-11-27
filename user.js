var express = require('express');
var mysql = require("mysql");
//var router = express.Router();
const cors = require('cors')
const app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_asesorias'
})
const INSERT_USER = "INSERT INTO USUARIO (nombre, correo, password) values ('raul', 'raul@gmail.com', '123')";
const SELECT_USER = 'SELECT * FROM USUARIO'
connection.connect(err => {
    if(err) {
        return err;
    }
});
//console.log(connection)
app.use(cors())
app.get('/usuarios', (req,res) => {
    connection.query(SELECT_USER, (err, results) => {
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data: results
            })
        }
    })
    //res.send('go to the users')
})
app.get('/usuario/add', (req, res) => {
    const { nombre, correo,telefono, password } = req.query
    const INSERT = `INSERT INTO USUARIO (nombre,telefono, correo, password) values ('${nombre}', '${telefono}' , '${correo}', '${password}')`
    connection.query(INSERT, (err, results) => {
        if(err) {
            return res.send(err)
        }else {
            return res.send('Usuario agregado')
        }
    })
})
//login usuario
app.get('/usuario/login', (req, res) => {
    const { correo, password } = req.query
    const LOGIN = `SELECT * FROM USUARIO WHERE correo='${correo}' and password='${password}'`
    connection.query(LOGIN, (err, results) => {
        if (err) {
            return res.send(err)
        }else {
            return res.json({
                data: results
            })
        } 
    })
})
//Registro profesor
app.get('/profesor/add', (req, res) => {
    const { correo, password, nombre, dni } = req.query
    const REGISTRO_PROFESOR = `INSERT INTO profesor (nombre, dni, correo, password) values ('${nombre}', '${dni}', '${correo}','${password}')`
    connection.query(REGISTRO_PROFESOR, (err, results) => {
        if (err) {
            return res.send(err)
        }else {
            return res.send('Profesor agregado')
        } 
    })
})
//login profesor
app.get('/profesor/login', (req, res) => {
    const { correo, password } = req.query
    const LOGIN = `SELECT * FROM profesor WHERE correo='${correo}' and password='${password}'`
    connection.query(LOGIN, (err, results) => {
        if (err) {
            return res.send(err)
        }else {
            return res.json({
                data: results
            })
        } 
    })
})
app.get('/add', (req,res) => {
    connection.query(INSERT_USER, (err, results) => {
        if(err){
            console.log(err)
        }else{
            console.log(results)
        }
    })
    //res.send('go to the users')
})
app.listen(4000, () => {
    console.log('hola')
})


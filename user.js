var express = require('express');
var mysql = require("mysql");
//var router = express.Router();
const cors = require('cors')
const app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
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
    const { nombre, correo, password } = req.query
    const INSERT = `INSERT INTO USUARIO (nombre, correo, password) values ('${nombre}', '${correo}', '${password}')`
    connection.query(INSERT, (err, results) => {
        if(err) {
            return res.send(err)
        }else {
            return res.send('Usuario agregado')
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


const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const connection  = require("./database/connection");
const Participante  = require("./database/Participante");

const participanteController = require("./participante/participanteController");



//connection 
connection
	.authenticate()
	.then(() => {
		console.log('Conexão feita com o banco de dados.')
	})
	.catch((err) => {
		console.log(err)
	})



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.set('view engine', 'ejs');
app.use(express.static("public"));

//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




//rotas
app.get('/', (req, res) => {
	res.render("index");
});

app.get('/msg-nSorte-existente', (req, res) => {
	res.render("msg-nSorte-existente");
});

app.get('/msg-participante-deletado', (req, res) => {
	res.render("msg-participante-deletado");
});




app.use('/',participanteController);
app.use('/cadastrar',participanteController);




//Iniciando o servidor
app.listen(8080,(err) =>{
	if(err){
		console.log(err)
	}else{
		console.log("Servidor iniciado com sucesso.")
	}
});
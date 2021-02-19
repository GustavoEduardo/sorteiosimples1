const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');

const Participante = require("../database/Participante");

//renomear-arquivos
const storage = multer.diskStorage({
	destination: function(req, file,cb){
		cb(null,"public/uploads/");
	},
	filename: function(req, file, cb){
		cb(null, file.originalname);// file.originalname + Date.now() +path.extname(file.originalname)
	}

})

const upload = multer({storage});


var listaParticipantes = Array();


router.get('/participantes',(req, res)=>{


	Participante.findAll({raw: true, order: [['id','desc']]}).then(participantes => {
	    	res.render("participantes",{
	    		participantes: participantes
	    	});
 	});

});


router.get('/cadastrar/cadastrar-participante',(req, res)=>{

		res.render('cadastrar-participante');	

});



router.post('/cadastrarParticipante',upload.single("foto"), (req, res) => {

	let nome = req.body.nome;
	let nSorte = req.body.nSorte;
    
    
	Participante.findOne({ where: {nSorte: nSorte}}).then(participante =>{


		if(participante == null || participante == undefined){

			Participante.create({
		    	nome: nome,
		    	nSorte: nSorte,
		    }).then(() =>{

		    	Participante.findAll({raw: true}).then(participantes => {

					listaParticipantes = participantes

				});
				
		    	res.redirect("/participantes");
		    });

		}else{
			res.redirect("/msg-nSorte-existente");
		}

	   


    });
});



router.get('/deletarParticipante/:nSorte', (req, res) => {

	let nSorte = req.params.nSorte;
	
	Participante.destroy({ where: { nSorte: nSorte }});

	Participante.findAll({raw: true}).then(participantes => {

		listaParticipantes = participantes;
	});	

	//res.redirect('/participantes'); Não atualiza o front de primeira.

	res.redirect("/msg-participante-deletado");

});


//***********************************Sorteio**************************************//

router.get('/sortear',(req, res)=>{


	Participante.findAll({raw: true}).then(participantes => {

		if(participantes == null || participantes == undefined || participantes.length == 0){
			res.redirect('/cadastrar/cadastrar-participante');
		};

		listaParticipantes = participantes;
	});	
	
	var qtd = Math.floor(Math.random() * listaParticipantes.length);


	listaParticipantes.forEach(function (participante, indice) {

		/*console.log(qtd)
		console.log("Nome"+participante.nome)
		console.log("nSorte"+participante.nSote)
		console.log("Indice"+indice)*/

		if(indice == qtd){

			qtd = Math.floor(Math.random() * listaParticipantes.length);

			Participante.findOne({ where: {nSorte: participante.nSorte}}).then(ganhador =>{

				res.render('sortear',{ganhador, listaParticipantes});
			});
		};

	});
});



module.exports = router;
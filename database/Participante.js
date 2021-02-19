const Sequelize = require('sequelize');
const connection  = require("./connection");


const Participante = connection.define('participantes', {
    nome: {
    	type: Sequelize.STRING,
    	allowNull: false
    },
    nSorte: {
    	type: Sequelize.INTEGER,
    	allowNull: false

    },
},{});

Participante.sync({force: false}).then(() => {} )

module.exports = Participante;
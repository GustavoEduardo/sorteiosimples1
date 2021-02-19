const Sequelize = require('sequelize');

const connection = new Sequelize('sorteiosimples','root','135790',{
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = connection;
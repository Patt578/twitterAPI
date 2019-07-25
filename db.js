const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres'
})

sequelize.authenticate()
.then(()=> console.log('conntected'))
.catch(err => console.log(err));

module.exports = sequelize;
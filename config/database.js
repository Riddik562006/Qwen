const { Sequelize } = require('sequelize');

// Подключение к SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: console.log // Включаем логирование SQL-запросов для отладки
});

module.exports = sequelize;
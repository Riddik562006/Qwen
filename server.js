const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const Project = require('./models/Project');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга тела запроса
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Настройка EJS как шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Подключение маршрутов
app.get('/', async (req, res) => {
  try {
    // Получаем featured проекты для главной страницы
    const featuredProjects = await Project.findAll({
      where: { featured: true },
      limit: 6
    });
    
    res.render('index', { 
      title: 'Studio Verde - Архитектурная и интерьерная студия',
      featuredProjects 
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.render('index', { 
      title: 'Studio Verde - Архитектурная и интерьерная студия',
      featuredProjects: [] 
    });
  }
});

// Маршрут для получения всех проектов
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['year', 'DESC']]
    });
    
    res.render('projects', { 
      title: 'Проекты - Studio Verde',
      projects 
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.render('projects', { 
      title: 'Проекты - Studio Verde',
      projects: [] 
    });
  }
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'О нас - Studio Verde' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'Проекты - Studio Verde' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Контакты - Studio Verde' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see your application`);
});
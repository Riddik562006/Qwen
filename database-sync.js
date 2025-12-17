const sequelize = require('./config/database');
const Project = require('./models/Project');
const Contact = require('./models/Contact');

// Синхронизация базы данных
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database established successfully.');
    
    // Создание таблиц
    await sequelize.sync({ force: false }); // Не пересоздаем таблицы, если они уже существуют
    console.log('Database synchronized successfully.');
    
    // Добавляем несколько примеров проектов, если таблица пуста
    const projectCount = await Project.count();
    if (projectCount === 0) {
      await Project.bulkCreate([
        {
          title: 'Загородный дом "Лесная гавань"',
          description: 'Архитектурный проект загородного дома, вдохновленный природным окружением.',
          category: 'architecture',
          year: 2023,
          image: 'https://placehold.co/600x400/2E8B57/FFFFFF?text=Forest+Haven',
          featured: true
        },
        {
          title: 'Квартира в центре города',
          description: 'Современный интерьер городской квартиры с использованием натуральных материалов.',
          category: 'interior',
          year: 2023,
          image: 'https://placehold.co/600x400/3CB371/FFFFFF?text=City+Apt',
          featured: true
        },
        {
          title: 'Эко-офис "Green Space"',
          description: 'Коммерческое пространство, спроектированное с учетом принципов устойчивого развития.',
          category: 'interior',
          year: 2024,
          image: 'https://placehold.co/600x400/228B22/FFFFFF?text=Green+Space',
          featured: true
        }
      ]);
      console.log('Sample projects added to the database.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }
}

syncDatabase();
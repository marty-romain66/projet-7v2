'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'admin',
      password: '$2b$10$XX5Y3d58V2bOpD/PUBIfs.C9527O63/bMZcEGoMII4ja8UzgRZiR.',
      email: 'admin@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: true,
      profilePicture: null
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
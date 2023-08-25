const { DataTypes } = require('sequelize');

// Definición del modelo 'TouristActivity'
module.exports= (sequelize) => {
    sequelize.define('TouristActivity', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    difficult: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        min: 1,
        max: 5
    }
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    season: {
        type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
        allowNull: false
    },
    
},
{
  createdAt: false,
  updatedAt: false,
  timestamps: false
});
};
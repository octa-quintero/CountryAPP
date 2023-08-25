const { DataTypes } = require('sequelize');

// Definición del modelo 'countries'
module.exports= ( sequelize ) => {
sequelize.define('countries', {
    id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    continent: {
        type: DataTypes.STRING,
    },    
    capital:{
        type: DataTypes.STRING,
    },
    subregion: {
        type: DataTypes.STRING,
    },
    area:{
        type: DataTypes.FLOAT,
    },
    population:{
        type: DataTypes.FLOAT,
    } 
}, 
{
  createdAt: false,
  updatedAt: false,
  timestamps: false
});
};
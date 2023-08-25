const { Countries, Op } = require("../db");
const { TouristActivity } = require("../db"); // Importa el modelo TouristActivity
const axios = require("axios");

// Cargar datos de países desde una API externa
async function data() {
  try {
    const response = await axios.get("https://restcountries.com/v2/all");
    const countriesData = response.data;

    console.log(countriesData.length);

    // Actualizar o insertar países en la base de datos
    const upsertPromises = countriesData.map((countryData) => {
      return Countries.upsert({
        id: countryData.alpha3Code,
        name: countryData.name,
        image: countryData.flags.svg,
        continent: countryData.region,
        capital: countryData.capital,
        subregion: countryData.subregion,
        area: countryData.area,
        population: countryData.population
      });
    });

    await Promise.all(upsertPromises);

    console.log("Registros creados o actualizados correctamente");
  } catch (error) {
    console.error("Error al obtener los datos de países:", error);
    throw error;
  }
}

// Obtener todos los países
async function getAllCountries(req, res, next) {
  try {
    const allCountriesData = await Countries.findAll();
    res.json(allCountriesData);
  } catch (error) {
    next(error);
  }
}

// Obtener lista de países con paginación y búsqueda
async function getCountries(req, res, next) {
  try {
    const { page, search } = req.query;
    const itemsPerPage = 10;

    let currentPage = page ? parseInt(page) : 1;
    let offset = (currentPage - 1) * itemsPerPage;

    let nameSearch = {};
    if (search) {
      nameSearch.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const countries = await Countries.findAll({
      where: nameSearch,
      offset,
      limit: itemsPerPage,
      include: { model: TouristActivity }, // Incluir el modelo TouristActivity
    });

    return res.json(countries);
  } catch (error) {
    next(error);
  }
}

// Obtener el detalle de un país en particular
async function getOneCountry(req, res, next) {
  const { countryId } = req.params;

  try {
    const country = await Countries.findOne({
      where: { id: countryId },
      include: [
        {
          model: TouristActivity,
          attributes: ['id', 'name', 'duration', 'difficult', 'season'],
          through: { attributes: [] },
        },
      ],
    });

    if (!country) {
      return res.status(404).json({ error: "País no encontrado" });
    }
    
    res.json(country);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el detalle del país" });
  }
}

// Obtener países con orden específico
async function getCountriesOrder(req, res, next) {
  try {
    const { order } = req.params;
    const { page = 1 } = req.query;
    const itemsPerPage = 9;
    const offset = itemsPerPage * (page - 1);

    let orderData;

    const data = await Countries.findAll();

    switch (order) {
      case "asc":
        orderData = data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc":
        orderData = data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "larger":
        orderData = data.sort((a, b) => b.population - a.population);
        break;
      case "smaller":
        orderData = data.sort((a, b) => a.population - b.population);
        break;
      case "big":
        orderData = data.sort((a, b) => b.area - a.area);
        break;
      case "small":
        orderData = data.sort((a, b) => a.area - b.area);
        break;
      case "grand":
        orderData = data.sort((a, b) => b.area - a.area);
          break;
      case "petit":
        orderData = data.sort((a, b) => a.area - b.area);
        break;
      case "Europe":
      case "Americas":
      case "Asia":
      case "Oceania":
      case "Africa":
        orderData = data.filter((x) => x.continent === order);
        break;
      default:
        throw new Error("Orden no válido");
    }

    const paginatedData = orderData.slice(offset, offset + itemsPerPage);

    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCountries,
  getOneCountry,
  getCountriesOrder,
  getAllCountries,
  data
};


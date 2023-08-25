// Estado inicial del store
const initialState = {
  countries: [],
  activities: [],
  countryDetail: {}
};

// Reducer de Redux para manejar el estado global
function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES_ORDER":
    case "GET_COUNTRIES":
    case "GET_ALL_COUNTRIES":
    case "GET_COUNTRY_NAME":
      // Actualizar el estado con la lista de países
      return {
        ...state,
        countries: action.payload
      };

    case "GET_COUNTRY_ID":
      // Actualizar el estado con el detalle del país
      return {
        ...state,
        countryDetail: action.payload
      };

    case "SORT_COUNTRIES_CONTINENT":
      // Filtrar países por continente y actualizar el estado
      return {
        ...state,
        countries: action.payload.filter(x => x.continent === action.continent)
      };

    case "GET_ACTIVITIES":
      // Actualizar el estado con la lista de actividades turísticas
      return {
        ...state,
        activities: action.payload
      };

    case "CREATE_ACTIVITY":
      // Agregar una nueva actividad al estado
      return {
        ...state,
        activities: [...state.activities, action.payload],
        error: null,
      };
      
    case "CREATE_ACTIVITY_ERROR":
      // Manejar errores al crear actividades
      return {
        ...state,
        error: action.payload,
      };

    case "REMOVE_COUNTRIES":
      // Limpiar la lista de países en el estado
      return {
        ...state,
        countries: []
      };

    case "REMOVE_COUNTRY":
      // Limpiar el detalle del país en el estado
      return {
        ...state,
        countryDetail: {}
      };

    default:
      return state;
  }
}

export default reducer;

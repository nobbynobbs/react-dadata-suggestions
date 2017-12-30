class Api {
  static apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs';

  constructor(token) {
    this.locations_boost = [];
    this.token = token;
  }
}

export default Api;
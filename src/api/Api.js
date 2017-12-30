class Api {
  static apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs';
  static FIO = 'fio';
  static ADDRESS = 'address';
  static ORGANISATION = 'party';
  static BANK = 'bank';
  static EMAIL = 'email';

  constructor(token) {
    this.locations_boost = [];
    this.token = token;
  }
}

export default Api;
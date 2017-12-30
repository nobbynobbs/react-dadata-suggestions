class FetchApi {

  static apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs';

  constructor(token, location = true) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${token}`,
    });
    this.locations_boost = [];
    if (location) {
      this.detectAddress();
    }
  }

  detectAddress = () => {
    const endpoint = `${FetchApi.apiUrl}/detectAddressByIp`;
    const request = new Request(endpoint, {
      method: 'GET',
      headers: this.headers
    });
    fetch(request)
      .then(response => response.json())
      .then(response => response.location.data)
      .then(data => data ? data.kladr_id : null)
      .then(kladr_id => {
        if (kladr_id) {
          this.locations_boost = [...this.locations_boost, {kladr_id}]
        }
      });
  };

  address = (query, count = 10) => {
    const endpoint = `${FetchApi.apiUrl}/suggest/address`;
    const body = {query, count};
    if (!!this.locations_boost.length) {
      body.locations_boost = this.locations_boost;
    }
    const request = new Request(endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    });
    return fetch(request);
  };

}

export default FetchApi;
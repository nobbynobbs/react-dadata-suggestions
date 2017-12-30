import Api from './Api';

class FetchApi extends Api {

  constructor(token, service, location = true) {
    super(token);
    this.headers = this.headersFactory();
    this.endpoint = `${Api.apiUrl}/suggest/${service}`;
    if (location && service.toLowerCase() === Api.ADDRESS) {
      this.detectAddress();
    }
  }

  detectAddress = () => {
    const endpoint = `${Api.apiUrl}/detectAddressByIp`;
    const request = this.requestFactory(endpoint, 'GET');

    fetch(request)
      .then(response => response.json())
      .then(response => response.location.data)
      .then(data => data ? data.kladr_id : null)
      .then(kladr_id => {
        if (kladr_id) {
          this.locations_boost = [...this.locations_boost, {kladr_id}]
        }
      })
      .catch(() => null); // just die
  };

  suggestions = (query, count = 10) => {
    const body = {query, count};
    if (!!this.locations_boost.length) {
      body.locations_boost = this.locations_boost;
    }
    const request = this.requestFactory(this.endpoint, 'POST', body);
    return fetch(request)
      .then(response => response.json())
      .then(response => response.suggestions);
  };

  requestFactory = (endpoint, method, body = null) => {
    const params = {
      endpoint,
      method,
      headers: this.headers
    };
    if (body) {
      params.body = JSON.stringify(body);
    }
    return new Request(endpoint, params);
  };

  headersFactory() {
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${this.token}`,
    });
  };

}

export default FetchApi;
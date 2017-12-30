import Api from './Api';

class FetchApi extends Api {

  constructor(token, location = true) {
    super(token);
    this.headers = this.headersFactory();
    if (location) {
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

  address = (query, count = 10) => {
    const endpoint = `${Api.apiUrl}/suggest/address`;
    const body = {query, count};
    if (!!this.locations_boost.length) {
      body.locations_boost = this.locations_boost;
    }
    const request = this.requestFactory(endpoint, 'POST', body);
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
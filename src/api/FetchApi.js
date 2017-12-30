import Api from './Api';

class FetchApi extends Api {

  constructor(token, location = true) {
    super(token);
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${this.token}`,
    });
    if (location) {
      this.detectAddress();
    }
  }

  detectAddress = () => {
    const endpoint = `${Api.apiUrl}/detectAddressByIp`;
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
    const endpoint = `${Api.apiUrl}/suggest/address`;
    const body = {query, count};
    if (!!this.locations_boost.length) {
      body.locations_boost = this.locations_boost;
    }
    const request = new Request(endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    });

    return fetch(request)
      .then(response => response.json())
      .then(response => response.suggestions);
  };

}

export default FetchApi;
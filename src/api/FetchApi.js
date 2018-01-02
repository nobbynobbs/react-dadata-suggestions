import Api from './Api';
import { headersFactory, requestFactoryFactory } from './helpers';

class FetchApi extends Api {

  constructor(token, service, location = true) {
    super(token);
    this.headers = headersFactory(token);
    this.requestFactory = requestFactoryFactory(this.headers);
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

  suggestions = (body) => {
    if (!!this.locations_boost.length) {
      body.locations_boost = this.locations_boost;
    }
    const request = this.requestFactory(this.endpoint, 'POST', body);
    return fetch(request)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json();
      })
      .then(response => response.suggestions);
  };
}

export default FetchApi;
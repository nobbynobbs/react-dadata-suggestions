const requestFactoryFactory = (headers) => (endpoint, method, body = null) => {
  const params = {
    endpoint,
    method,
    headers
  };
  if (body) {
    params.body = JSON.stringify(body);
  }
  return new Request(endpoint, params);
};

export default requestFactoryFactory;
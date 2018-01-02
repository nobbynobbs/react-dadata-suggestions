const headers = (token) => {
  return new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Token ${token}`,
  });
};

export default headers;
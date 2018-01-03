const requestBody = (query, { count, specialRequestOptions = {} }) => {
  return ({
    query,
    count,
    ...specialRequestOptions
  });
};

export default requestBody;
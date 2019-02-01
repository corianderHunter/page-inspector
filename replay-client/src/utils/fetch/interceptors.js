let requestSuccess = (config) => {
  return config;
}

let requestError = (error) => {
  return Promise.reject(error);
}

let responseSuccess = (response) => {
  return response;
}

let responseError = (error) => {
  return Promise.reject(error);
}

export {
  requestSuccess,
  requestError,
  responseSuccess,
  responseError
}

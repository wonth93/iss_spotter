const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body)["ip"];
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const parsedBody = JSON.parse(body);
  const lat = parsedBody["latitude"];
  const long = parsedBody["longitude"];
  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const parsedBody = JSON.parse(data);
      const response = parsedBody["response"]
      return response;
    })
};

module.exports = { nextISSTimesForMyLocation };
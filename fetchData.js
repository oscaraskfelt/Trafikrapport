const axios = require('axios');

module.exports.getReports = async (lat, lon, messageClient) => {
  return axios
    .get(
      `http://api.sr.se/api/v2/traffic/areas?latitude=${lat}&longitude=${lon}&format=json`
    )
    .then((res) => {
      const trafficArea = res.data.area.name;
      return axios
        .get(
          `http://api.sr.se/api/v2/traffic/messages?trafficareaname=${trafficArea}&format=json`
        )
        .then((res) => {
          messageClient(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.warn(error);
    });
};

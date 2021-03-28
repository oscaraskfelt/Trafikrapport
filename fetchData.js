const axios = require('axios');

module.exports.getReports = async (lat, lon, messageClient) => {
  return axios
    .get(
      `http://api.sr.se/api/v2/traffic/areas?latitude=${lat}&longitude=${lon}&format=json`
    )
    .then((res) => {
      const trafficArea = res.data.area.name;
      const url = `http://api.sr.se/api/v2/traffic/messages`;
      return axios({
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8;',
          'Access-Control-Allow-Origin': '*',
        },
        params: { trafficareaname: trafficArea, format: 'json' },
      })
        .then((response) => {
          messageClient(response.data);
        })
        .catch((error) => {
          console.warn(error);
        });
    })
    .catch((error) => {
      console.warn(error);
    });
};

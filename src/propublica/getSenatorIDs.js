// For development use only. Replaced with environment variables from the
// context object in production
require("dotenv").config();
const axios = require("axios");

/** This function retrieves current senators from ProPublica by State and
 *  returns their ProPublica Member IDs. This can be passed back to ProPublica
 *  for details about senators such as their contact details and voting record.
 */
const getSenatorIDs = state => {
  return axios({
    method: `get`,
    url: `https://api.propublica.org/congress/v1/members/senate/${state}/current.json`,
    headers: {
      "X-API-KEY": process.env.PROPUBLICA_API_KEY
    },
    withCredentials: false
  })
    .then(response => {
      const senatorOne = response.data.results[0].id;
      const senatorTwo = response.data.results[1].id;
      return [senatorOne, senatorTwo];
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = getSenatorIDs;

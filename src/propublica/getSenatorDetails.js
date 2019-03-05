// For development use only. Replaced with environment variables from the
// context object in production
require("dotenv").config();
const axios = require("axios");

/** This function retrieves a senator's details from ProPublica by Member
 * ID and returns their name and public DC office phone number.
 */
const getSenatorDetails = memberID => {
  return axios({
    method: `get`,
    url: `https://api.propublica.org/congress/v1/members/${memberID}.json`,
    headers: {
      "X-API-KEY": process.env.PROPUBLICA_API_KEY
    },
    withCredentials: false
  })
    .then(response => {
      return `U.S. Senator: ${response.data.results[0].first_name} ${
        response.data.results[0].last_name
      } | Public Phone: ${response.data.results[0].roles[0].phone}`;
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = getSenatorDetails;

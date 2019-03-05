const getSenatorIDs = require("../propublica/getSenatorIDs");
const getSenatorDetails = require("../propublica/getSenatorDetails");

/** This async function retrieves data from multiple axios calls to the
 * ProPublica API, which allows us to send both senators in a single message
 */
async function messageConstructor(state) {
  const senators = await getSenatorIDs(state);
  let senatorDetails = [];
  for (let senator of senators) {
    let response = await getSenatorDetails(senator);
    senatorDetails.push(response);
  }
  return senatorDetails;
}

module.exports = messageConstructor;

const axios = require("axios");

exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  const input = event.Body;

  // Definte functions
  const inputValidator = input => {
    const regex = /^(A[LKZR]|C[AOT]|D[EC]|FL|GA|HI|I[DLNA]|K[SY]|LA|M[EDAINOT]|N[EVHJMYCD]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[TA]|W[AVIY])$/gim;
    const trimmedInput = input.trim();
    if (regex.test(trimmedInput)) {
      return trimmedInput.toLowerCase();
    } else {
      // Catch bad input, return error message
      twiml.message(`"${input}" is not a valid U.S. state abbreviations.`);
      callback(null, twiml);
    }
  };

  async function messageConstructor(state) {
    const senators = await getSenatorIDs(state);
    let senatorDetails = [];
    for (let senator of senators) {
      let response = await getSenatorDetails(senator);
      senatorDetails.push(response);
    }
    return senatorDetails;
  }

  const getSenatorIDs = state => {
    return axios({
      method: `get`,
      url: `https://api.propublica.org/congress/v1/members/senate/${state}/current.json`,
      headers: {
        "X-API-KEY": context.PROPUBLICA_API_KEY
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

  const getSenatorDetails = memberID => {
    return axios({
      method: `get`,
      url: `https://api.propublica.org/congress/v1/members/${memberID}.json`,
      headers: {
        "X-API-KEY": context.PROPUBLICA_API_KEY
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

  const state = inputValidator(input);

  messageConstructor(state)
    .then(senatorDetails => {
      twiml.message(`${senatorDetails[0]} ${senatorDetails[1]}`);
      callback(null, twiml);
    })
    .catch(error => {
      console.error(error);
    });
};

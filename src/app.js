const inputValidator = require("./messages/inputValidator");
const messageConstructor = require("./messages/messageConstructor");

/** Due to the beta status of Twilio functions, the dev build here assumes
 * knowledge of the Functions API and will not run locally.
 */
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  const input = event.Body;
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

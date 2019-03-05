import { twiml } from "twilio";

/** This function provides minimal input validation using a regex to check
 * for a valid U.S. state abbreviation
 */
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

module.exports = inputValidator;

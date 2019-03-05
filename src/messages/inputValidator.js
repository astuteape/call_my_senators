import { twiml } from "twilio";

const regex = /^(A[LKZR]|C[AOT]|D[EC]|FL|GA|HI|I[DLNA]|K[SY]|LA|M[EDAINOT]|N[EVHJMYCD]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[TA]|W[AVIY])$/gim;

/** This function provides minimal input validation using a regex to check
 * for a valid U.S. state abbreviation
 */
const inputValidator = input => {
  const trimmedInput = input.trim();
  if (regex.test(trimmedInput)) {
    return trimmedInput.toLowerCase();
  } else {
    return input;
  }
};

module.exports = inputValidator;

// Configuring dotenv so PASSPORT_SECRET in .env file can be accessed via process.env
require("dotenv").config({debug: process.env.debug});

// Check process.env for PASSPORT_SECRET 
// (returns passport_secret in .env or returns undefined);
function checkProcessEnvForPassportSecret()  {
    return process.env.passport_secret ? process.env.passport_secret : undefined;
};

// set and export PASSPORT_SECRET value returned from checkProcessEnvForPassportSecret;
module.exports = checkProcessEnvForPassportSecret();
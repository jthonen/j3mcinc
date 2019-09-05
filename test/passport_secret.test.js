const chai = require("chai");
const expect = chai.expect;
const passport_secret = require("../passport_secret.js");

describe("test for passport_secret", function() {
    context("passport_secret in .env file has been identified at process.env.passport_secret (via dotenv config). passport_secret value is defined", function()   {
        it("passport_secret should be a string", function() {
            expect(passport_secret).to.be.a('string');
        });
    });
});
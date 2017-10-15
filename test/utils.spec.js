const fs = require('fs');
const appRoot = process.cwd();
const assert = require('assert'); 
const jsdom = require('jsdom').jsdom;

const guidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/ig;
const utils = fs.readFileSync(appRoot + '/public/utils.js', { encoding: "utf-8" });
const dom = jsdom(``);
let subject;

describe('utils', function () {
    beforeEach(function() {
        // Set the scoped utils onto global
        const window = dom.defaultView;
        window.eval(utils + 'window.utils = utils;');
        subject = window.utils;
    });
  describe('generateGuid', function () {
    it('should generate random guid with the correct format', function () {
      var firstGuid = subject.generateGuid();
      var secondGuid = subject.generateGuid();

      assert.ok(firstGuid.match(guidRegex));
      assert.ok(secondGuid.match(guidRegex));
      assert.notEqual(firstGuid, secondGuid);
    });
  });

  describe('containsGuid', function () {
    it('should return true for valid guid', function () {
      const test = '123e4567-e89b-12d3-a456-426655440000';
      assert.ok(subject.containsGuid(test));
    });

    it('should return false for invalid guid', function () {
      const test = 'e4567-e89b-12d3-a456-4266554400';
      assert.ok(!subject.containsGuid(test));
    });
  });

  describe('pickGuid', function () {
    it('shoud get a guid from a string', function () {
      const test = 'http://localhost:8080/f66fb9cc-7dcc-f6ea-9b47-1c646f40792a';
      const expected = 'f66fb9cc-7dcc-f6ea-9b47-1c646f40792a';
      assert.strictEqual(subject.pickGuid(test), expected);
    });
  });
});
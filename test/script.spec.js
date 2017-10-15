const fs = require('fs');
const appRoot = process.cwd();
const subject = fs.readFileSync(appRoot + '/public/script.js', { encoding: "utf-8" });
const assert = require('assert');
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

const jsdom = require('jsdom');
var windowLocation;

createTestBed();

function executeTest(err, testWindow) {
    describe('script', () => {
        // beforeEach(() => {
        //     createTestBed();
        // });
        // afterEach(() => {
        //     testWindow.close();
        // });
        context('when application loads', () => {
            describe('setup guid on url path', () => {
                it('should append the url with a guid on load', () => {
                    assert.equal(windowLocation, '/guid');
                });
            });
        });
        
        context('on 1000ms interval', () => {
            describe('when change did not occur', () => {
                it('should not have to convert text area to markdown', (done) => {
                    const markdown = testWindow.document.getElementById('markdown').innerHTML;
                    
                    assert.equal(markdown, '');
                    done();
                });
            });
            describe('when change occur', () => {
                beforeEach((done) => {
                    setTimeout(() => {
                        testWindow.document.getElementById('pad').value = 'some new value';
                        done();
                    }, 1000);
                });
                it('should convert text area to markdown', (done) => {
                    setTimeoutPromise(2000, '').then(() => {
                        const markdown = testWindow.document.getElementById('markdown').innerHTML;
                        assert.equal(markdown, 'markdownHtml');
                        done();
                    });
                });
            });  
        });
    });
}

function createTestBed() {
    return jsdom.env({
      html: `
          <body class='container-fluid'>
          <section>
              <textarea id="pad" rows='40' class="full-height" placeholder="Write here!"></textarea>
              <div id='markdown' class="full-height" data-placeholder="And it will appear here!"></div>
          </section>    
          </body>`,
      src: [subject],
      created: (err, window) => {
        //NOTE: Needs JSDOM v7.x.x to manipulate location. till fixes: https://github.com/tmpvar/jsdom#unimplemented-parts-of-the-web-platform
        Object.defineProperty(window.location, 'href', {
          get: function () { return windowLocation; },
          set: function (newValue) { windowLocation = newValue; }
        });
        
        // Setup Stubs and Mocks
        window.showdown = { Converter: function () { return { makeHtml: function () {return 'markdownHtml'} } } };
        window.utils = { generateGuid: function () { return "guid"; }, containsGuid: function () { return false; }, pickGuid: function () { return "guid"; } };
        window.sharejs = { open: function () {} };
    },
    done: executeTest
  });
}
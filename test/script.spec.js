const fs = require('fs');
const appRoot = process.cwd();
const assert = require('assert'); 
const subject = fs.readFileSync(appRoot + '/public/script.js');

const baseUrl = 'http://test:1337';
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`
    <body class='container-fluid'>
    <section>
        <textarea id="pad" rows='40' class="full-height" placeholder="Write here!"></textarea>
        <div id='markdown' class="full-height" data-placeholder="And it will appear here!"></div>
    </section>    
    </body><script>${subject}</script>`,
    {
        url: baseUrl,
        runScripts: 'dangerously',
        beforeParse: (window) => {
            window.showdown = {Converter:function(){return {makeHtml: function(){}}}};
            window.utils = {generateGuid: function() {return "guid";}, containsGuid: function() {return false;}, pickGuid: function() {return "guid";}};
            window.sharejs = {open:function(){}};
        }
    });
const window = dom.window;

describe('script', () => {
    context('when application loads', () => {
        beforeEach(() => {
        });
        describe('guid url setup', () => {
            it('should append the url with a guid on load', () => {
                assert.equal(window.location.href, baseUrl + '/guid');
            });
        });
    });
});
const assert = require('assert');
const scraper = require('../src/scraper.js');

const tab = `E|-------|-0-----------------3----0---3-|-------| 
B|-1---3-|-------3---1----3-------------|---3---| 
G|-------|------------------------------|-------| 
D|-------|------------------------------|-------| 
A|-------|-0----------------------------|-------| 
E|-------|----------------3-------------|---3---|`;

function eChordsHtml(content){
    return `
    <pre id="core">
    ${content}

    </pre>
    `;
}

describe('scraper', function() {

  describe('e-chords', function() {

    it('should get one tab', function() {
      const html = eChordsHtml(tab);

      let song = scraper.getSong('e-chords', html);
      assert.equal(song.tabs.length, 1);
      assert.equal(song.tabs[0], tab);
    });

    it('should get two tabs separated by new line', function() {
      const html = eChordsHtml(`${tab}\n${tab}`);

      let song = scraper.getSong('e-chords', html);
      assert.equal(song.tabs.length, 2);
      assert.equal(song.tabs[0], tab);
      assert.equal(song.tabs[1], tab);
    });

    it('should get two tabs separated by html tags', function() {
      const html = eChordsHtml(`${tab}\n<b>2ª parte</b>\n${tab}`);

      let song = scraper.getSong('e-chords', html);
      assert.equal(song.tabs.length, 2);
      assert.equal(song.tabs[0], tab);
      assert.equal(song.tabs[1], tab);
    });

    it('should get one tab that starts with e instead of E', function() {
      const modifiedTab = `e${tab.substring(1)}`;
      const html = eChordsHtml(modifiedTab);

      let song = scraper.getSong('e-chords', html);
      assert.equal(song.tabs.length, 1);
      assert.equal(song.tabs[0], modifiedTab);
    });

    it('should get one tab that uses : at the beginning', function() {
      const colonTab = `e:-7---------------7---------------|-----------9---------------------| 
B:-7---------7-------------7---7---|-------7-------7-----------------| 
G:-7-----7-------7---------7---9---|-----9-------9-------------------| 
D:-9---9---9---9-------------------|-8---------------8---------------| 
A:-9-------------------------------|---------9-----------------------| 
E:-7-------------------------------|---------------------------------|`;
      const html = eChordsHtml(colonTab);

      let song = scraper.getSong('e-chords', html);
      assert.equal(song.tabs.length, 1);
      assert.equal(song.tabs[0], colonTab);
    });

  });

});
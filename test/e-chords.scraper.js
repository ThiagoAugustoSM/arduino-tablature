const assert = require('assert');
const scraper = require('../src/scraper.js');

describe('scraper', function() {

  describe('e-chords', function() {

    it('should get one tab', function() {
      const tab = `E|-------|-0-----------------3----0---3-|-------| 
B|-1---3-|-------3---1----3-------------|---3---| 
G|-------|------------------------------|-------| 
D|-------|------------------------------|-------| 
A|-------|-0----------------------------|-------| 
E|-------|----------------3-------------|---3---|`;

      const html = `
      <pre id="core">
${tab}

      </pre>
      `;

      let song = scraper.getSong('e-chords', html);
      assert.equal(song.tabs.length, 1);
      assert.equal(song.tabs[0], tab);
    });

  });

});
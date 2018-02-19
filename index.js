/*
  This program makes a web scraping to get some guitar tablature and transform
  it to an Arduino Program compatible with the tone() Function

  Git-repository: https://github.com/ThiagoAugustoSM/arduino-tablature
  Author: thiagoaugustosm
  License: MIT
*/

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const args = require('yargs').argv;
const makeFile = require('./src/baseFile.js');
const tablature = require('./src/tablature.js');

var url;

if(args.url != undefined){
  url = args.url;
  console.log('requesting from:' + args.url)
  // Request to get the html from cifraclub's website
  request(url, function(error, response, html){
  
    if(!error){
      var $ = cheerio.load(html);
  
      // In the webpage the capo text is like:
      // 2ª casa
      var capo = $("#cifra_capo").children().contents().text();
      if(capo.length > 0){
        capo = parseInt(capo.split('ª')[0]);
      }else{
        capo = 0;
      }
  
      $(".tablatura").each(function(){
        var tab = $(this).text();
        tabInNotes.push(tablature.filterTab(tab, capo));
      });
  
      var arduinoFile = makeFile.generateFile(tabInNotes);
  
      // Saving file in the same directory
      fs.writeFile('music/music.ino', arduinoFile, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
  
    }else{
      console.log("ERROR");
    }
  })
}
else{
  console.log('You must pass a url in a param, example: --url=https://www.cifraclub.com.br/natiruts/andei-so/')
}

var tabInNotes = [];

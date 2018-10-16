#!/usr/bin/env node
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
const scraper = require('./src/scraper.js');
var mkdirp = require('mkdirp');

mkdirp('music', function (err) {
    if (err) console.error(err);
    else console.log('dir music created with success');
});

var url;

if(args.url != undefined){
  url = args.url;
  console.log('requesting from:' + args.url);
  // Request to get the html from cifraclub's website
  request(url, function(error, response, html){

    if(!error){

      var song = scraper.getSong(html);

      var tabInNotes = song.tabs.map(tab => tablature.filterTab(tab, song.capo));

      var arduinoFile = makeFile.generateFile(tabInNotes);

      // Saving file in the same directory
      fs.writeFile('music/music.ino', arduinoFile, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    }else{
      console.log("ERROR");
    }
  });
}
else{
  console.log('You must pass a url in a param, example: --url=https://www.cifraclub.com.br/natiruts/andei-so/');
}
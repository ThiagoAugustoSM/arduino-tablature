var exports = module.exports = {};

const cheerio = require('cheerio');
const tablature = require('./tablature.js');

exports.getTabs = function(html){
  var $ = cheerio.load(html);

  // In the webpage the capo text is like:
  // 2ª casa
  var capo = $("#cifra_capo").children().contents().text();
  if(capo.length > 0){
    capo = parseInt(capo.split('ª')[0]);
  }else{
    capo = 0;
  }

  let tabInNotes = [];
  $(".tablatura").each(function(){
    var tab = $(this).text();
    tabInNotes.push(tablature.filterTab(tab, capo));
  });

  return tabInNotes;
};
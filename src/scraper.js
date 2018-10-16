var exports = module.exports = {};

const cheerio = require('cheerio');

class CifraClubSCraper {
  getCapo($){
    var capo = $("#cifra_capo").children().contents().text();
    if(capo.length > 0){
      capo = parseInt(capo.split('ª')[0]);
    }else{
      capo = 0;
    }
    return capo;
  }

  getTabs($){
    let tabs = [];
    $(".tablatura").each(function(){
      tabs.push($(this).text());
    });
    return tabs;
  }
}

function getScraper(url){
  if(url.includes('e-chords')){
    return new EChordsScraper();
  }
  return new CifraClubSCraper();
}

exports.getSong = function(url, html){
  var $ = cheerio.load(html);

  var scraper = getScraper(url);
  var capo = scraper.getCapo($);
  var tabs = scraper.getTabs($);

  return {
    capo,
    tabs
  };
};
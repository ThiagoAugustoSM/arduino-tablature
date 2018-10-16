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

exports.getSong = function(html){
  var $ = cheerio.load(html);

  var scraper = new CifraClubSCraper();
  var capo = scraper.getCapo($);
  var tabs = scraper.getTabs($);

  return {
    capo,
    tabs
  };
};
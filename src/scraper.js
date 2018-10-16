var exports = module.exports = {};

const cheerio = require('cheerio');

exports.getSong = function(html){
  var $ = cheerio.load(html);

  // In the webpage the capo text is like:
  // 2ª casa
  var capo = $("#cifra_capo").children().contents().text();
  if(capo.length > 0){
    capo = parseInt(capo.split('ª')[0]);
  }else{
    capo = 0;
  }

  let tabs = [];
  $(".tablatura").each(function(){
    tabs.push($(this).text());
  });

  return {
    capo,
    tabs
  };
};
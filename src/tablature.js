var exports = module.exports = {};

var typesOfPause = ['-', 'h', '/', 'p'];
var typesOfNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var typesOfBlockLimits = ['|'];
var notes = [
               'NOTE_C', 'NOTE_CS', 'NOTE_D', 'NOTE_DS', 'NOTE_E',
               'NOTE_F', 'NOTE_FS', 'NOTE_G', 'NOTE_GS', 'NOTE_A',
               'NOTE_AS', 'NOTE_B']
/*
  In a normal acoustic guitar tuning the notes of the strings are in this sequence:
  From bottom to top: E4, B3, G3, D3, A2, E2

  Example:

  E4|---------0-------0----------0-------------|
  B3|-----1-----1------------6-----6-----6-----|
  G3|---2---2-----2--------5---5-----5---------|
  D3|-3-------------3----0-------------0-------|
  A2|------------------------------------------|
  E2|------------------------------------------|

  And the sequences would be: (related to the guitar's arm)

  E4 F4 F#4 G4 Ab4 A4 Bb4 B4 C5 C#5 D5 Eb5 E5 F5 F#5 G5 Ab5 A5 Bb5 B5 C6 C#6 D6
  B3 C4 C#4 D4 Eb4 E4 F4 F#4 G4 Ab4 A4 Bb4 B4 C5 C#5 D5 Eb5 E5 F5 F#5 G5 Ab5 A5
  G3 Ab3 A3 Bb3 B3 C4 C#4 D4 Eb4 E4 F4 F#4 G4 Ab4 A4 Bb4 B4 C5 C#5 D5 Eb5 E5 F5
  D3 Eb3 E3 F3 F#3 G3 Ab3 A3 Bb3 B3 C4 C#4 D4 Eb4 E4 F4 F#4 G4 Ab4 A4 Bb4 B4 C5
  A2 Bb2 B2 C3 C#3 D3 Eb3 E3 F3 F#3 G3 Ab3 A3 Bb3 B3 C4 C#4 D4 Eb4 E4 F4 F#4 G4
  E2 F2 F#2 G2 Ab2 A2 Bb2 B2 C3 C#3 D3 Eb3 E3 F3 F#3 G3 Ab3 A3 Bb3 B3 C4 C#4 D4

*/

function isNote(char){
  if(typesOfNotes.indexOf(char) !== -1){
    return true;
  }
  return false;
}

function isNumber(char){
  if(char.charCodeAt(0) >= "0".charCodeAt(0) && char.charCodeAt(0) <= "9".charCodeAt(0)){
    return true;
  }
  return false;
}

function isPause(char){
  if(typesOfPause.indexOf(char) !== -1){
    return true;
  }
  return false;
}

function isBlockLimit(char){
  if(typesOfBlockLimits.indexOf(char) !== -1){
    return true;
  }
  return false;
}

function toNote(mainNote, char){
  if(isPause(char)){
    return "PAUSE";
  }

  // The main ideia is to run through all the scale of string
  // Going from G3 to C4 for Example
  // But running in the notes array as a circular array

  var tuning = parseInt(mainNote.substring(mainNote.length - 1, mainNote.length));
  var frets = parseInt(char);

  var i = 0;
  for(i = notes.indexOf(mainNote.substring(0, mainNote.length - 1));
      frets > 0;
      i = (i + 1) % (notes.length)){
        if(i == 0){
          tuning++;
        }
        frets--;

  }
  return notes[i] + tuning;
}

exports.filterTab = function (tab, capo){

  var tabInForm = [];
  var state = 0;
  var actualString = 0; // Counting from bottom to top
  var actualMainNote = "";

  // Running through every char in the tab function
  tab = tab.split('');
  tab.forEach(function(char, index){

    // Working in a state machine to filter the actual data
    // State 0 - Getting the actual tuning of the string
    if(state === 0 && isNote(char)){

      if(char == 'E' && actualString == 0){
        actualMainNote = "NOTE_E4";
      }else if(char == 'B'){
        actualMainNote = "NOTE_B3";
      }else if(char == 'G'){
        actualMainNote = "NOTE_G3";
      }else if(char == 'D'){
        actualMainNote = "NOTE_D3";
      }else if(char == 'A'){
        actualMainNote = "NOTE_A2";
      }else if(char == 'E'){
        actualMainNote = "NOTE_E2";
      }
      // If there is capo it will increase the tuning
      actualMainNote = toNote(actualMainNote, capo);

      tabInForm.push([])
      state = 1;
    }else if(state === 1 && (isPause(char) || isNumber(char))){

      // Some tab use the 10th fret or more
      if(isNumber(tab[index]) && isNumber(tab[index + 1])){
        tabInForm[actualString].push(toNote(actualMainNote, char + tab[index + 1]));
      }else if(isNumber(tab[index - 1])){
        // This number was already computed in the last element
        // So it is now considered a pause
        tabInForm[actualString].push("PAUSE");
      }else{
        // A number appeared alone in the fret
        tabInForm[actualString].push(toNote(actualMainNote, char));
      }

      // Works because the first block limit after the Note won't be read
      if(isBlockLimit(tab[index + 1])){
        state = 2;
      }
    }else if(state === 2){
      ++actualString;
      state = 0;
    }
  });
  return tabInForm;
}

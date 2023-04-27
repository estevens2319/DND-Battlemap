let character = "caedrel";
let facingRight = true;
let speed = 1;
let charImg = document.getElementById(character);
let characterList = ["caedrel", "goos", "odra", "vallyn", "mika", "errol", "dante", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"];
let cMove = false;
document.addEventListener("click", printMousePos);

function printMousePos(event) {
  charImg = document.getElementById(character);
  if (cMove) {
    cMove = false;
    let x = event.clientX;
    let y = event.clientY;
    charImg.style.top = y + 'px';
    charImg.style.left = x + 'px';
  }
}

function showRules(){
  let rules = "ALL FILES UPLOADED SHOULD BE .PNG OR STUFF WILL BREAK" + '\n' + "How to navigate the map." + '\n' + "To change background:" + '\n' + "Click the background button and select a file for the background." + '\n' + "To move a character:" + '\n' + "Click on a character and move with the arrow keys" + '\n' + "To teleport a character:" + '\n' + "Click on a character, press the M key, click where on the map to teleport the character" + '\n' + "To add new characters:" + '\n' + "Click a C# button to add or change the icon of that character number" + '\n' 
    + "To make a character prone: (Uploaded characters cannot go prone) " + '\n' + "Click a character then press the P key" + '\n' + "To make a character stand: " + '\n' + "Click a character then press the S key" + '\n' + "Press = to enlarge a character" + '\n' + "Press - to shrink a character";
  alert(rules);

}
function bigger(charImg){
  charImg.width = JSON.stringify(charImg.width + 10);
}
function smaller(charImg){
charImg.width = JSON.stringify(charImg.width - 10);

}
function chooseCharacter(charName) {
  character = charName;
  charImg = document.getElementById(character);
}

function prone(charImg) {
  if(character[0] !== "C")
  charImg.src = "./images/" + character + "prone.png";
}
function unprone(charImg) {
  if (character[0] !== "C")
  charImg.src = "./images/" + character + ".png";
}

function clickMove(charImg) {
  cMove = true;
}
function changeBG(input) {

  document.getElementById('bg').style.display = "block";

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById('bg').src = e.target.result;
    }

    reader.readAsDataURL(input.files[0]);
  }
}
function changeC(input, C) {
  document.getElementById(C).style.display = "block";
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById(C).src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}


function getPosition(charToGet) {
  charToGet = document.getElementById(charToGet);
  return [charToGet.offsetLeft, charToGet.offsetTop];
}


function characterSwitch() {
  currPosition = getPosition(character);
  for (let i = 0; i < characterList.length; i++) {
    if (characterList[i] !== character) {
      let nextChar = getPosition(characterList[i]);
      if ((Math.abs(currPosition[0] - nextChar[0]) < charImg.clientHeight) && (Math.abs(currPosition[1] - nextChar[1]) < (charImg.clientWidth))) {
        chooseCharacter(characterList[i]);
        return;
      }
    }
  }
}

function leftArrowPressed(charImg) {
  let diff = charImg.offsetLeft;
  if (diff > 0) {
    let move = speed;
    if (diff < speed) {
      move = diff - 1;
    }
    charImg.style.left = parseInt(charImg.style.left) - move + 'px';
  }
}

function rightArrowPressed(charImg) {
  let imwidth = charImg.clientWidth;
  let diff = document.getElementById("rightborder").offsetLeft - charImg.offsetLeft - imwidth;
  if (diff > 0) {
    let move = speed;
    if (diff <= speed) {
      move = diff - 1;
    }
    charImg.style.left = parseInt(charImg.style.left) + move + 'px';
  }
}

function upArrowPressed(charImg) {
  let diff = charImg.offsetTop;
  if (diff > 0) {
    let move = speed;
    if (diff <= speed) {
      move = diff - 1;
    }
    charImg.style.top = parseInt(charImg.style.top) - move + 'px';
  }
}

function downArrowPressed(charImg) {
  let imheight = charImg.clientHeight;
  let diff = document.getElementById("bottomborder").offsetTop - charImg.offsetTop - imheight;
  if (diff > 0) {
    let move = speed;
    if (diff < speed) {
      move = diff;
    }
    charImg.style.top = parseInt(charImg.style.top) + move + 'px';
  }
}

function reset(charImg) {
  charImg.style.top = '100px';
  charImg.style.left = '100px';
}



function fire(charImg) {
  characterSwitch();
}

function docReady() {
  window.addEventListener('keydown', checkXP);

  function KeyboardController(keys, repeat) {
    var timers = {};
    document.onkeydown = function (event) {
      var key = (event || window.event).keyCode;
      if (!(key in keys))
        return true;
      if (!(key in timers)) {
        timers[key] = null;
        keys[key]();
        if (repeat !== 0)
          timers[key] = setInterval(keys[key], repeat);
      }
      return false;
    };
    document.onkeyup = function (event) {
      var key = (event || window.event).keyCode;
      if (key in timers) {
        if (timers[key] !== null)
          clearInterval(timers[key]);
        delete timers[key];
      }
    };
    window.onblur = function () {
      for (key in timers)
        if (timers[key] !== null)
          clearInterval(timers[key]);
      timers = {};
    };
  };
  charImg = document.getElementById(character);
  function checkXP(key) {
    if (key.keyCode === 88) {
      fire(charImg);
    }
    if (key.keyCode === 80) {
      prone(charImg);
    }
    if (key.keyCode === 83) {
      unprone(charImg);
    }
    if (key.keyCode === 77) {
      clickMove(charImg);
    }
    if (key.keyCode === 187) {
      bigger(charImg);
    }
    if (key.keyCode === 189) {
      smaller(charImg);
    }
  }
  KeyboardController({
    37: function () { leftArrowPressed(charImg); },
    38: function () { upArrowPressed(charImg); },
    39: function () { rightArrowPressed(charImg); },
    40: function () { downArrowPressed(charImg); }
  }, 1);
}
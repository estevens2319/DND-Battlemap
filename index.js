let character = "eric";
let speed = 1;
let charImg = document.getElementById(character);
let players = ["eric", "jack", "matt", "haylee", "nicole", "adam", "travis"];
let npcs = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"];
let characterList = players.concat(npcs);
let mouseClickX = 0;
let mouseClickY = 0;
let mouseClickOffsetX = 0;
let mouseClickOffsexY = 0;

function mouseReleased() {
  window.removeEventListener('mousemove', move, true);
}

function mouseClicked(e, char) {
  chooseCharacter(char);
  mouseClickX = e.clientX;
  mouseClickY = e.clientY;
  var div = document.getElementById(character);
  let leftPart = "";
  if (!div.style.left)
    leftPart += "0px";
  else
    leftPart = div.style.left;
  let leftPos = leftPart.indexOf("px");
  let leftNumString = leftPart.slice(0, leftPos);
  mouseClickOffsetX = mouseClickX - parseInt(leftNumString, 10);
  let topPart = "";
  if (!div.style.top)
    topPart += "0px";
  else
    topPart = div.style.top;
  let topPos = topPart.indexOf("px");
  let topNumString = topPart.slice(0, topPos);
  mouseClickOffsexY = mouseClickY - parseInt(topNumString, 10);
  window.addEventListener('mousemove', move, true);
}

function move(e) {
  var div = document.getElementById(character);
  div.style.position = 'absolute';
  let topAmount = e.clientY - mouseClickOffsexY;
  div.style.top = topAmount + 'px';
  let leftAmount = e.clientX - mouseClickOffsetX;
  div.style.left = leftAmount + 'px';
}

function showRules() {
  let rules = "How to navigate the map." + '\n' + '\n' + "To change background:" + '\n' + "Click the background button and select a file for the background." + '\n' + '\n' + "To move a character:" + '\n' + "Click and drag a character around map or use arrow keys." + '\n' + '\n' + "To add new characters:" + '\n' + "Click a C# button to add or change the icon of that character number" + '\n'
    + '\n' + "To delete a character: (Player characters cannot be deleted) " + '\n' + "Click on a character, press Delete key" + '\n' + '\n' + "To make a character prone/stand: " + '\n' + "Click on a character, press P/S key" + '\n' + '\n' + "To enlarge / shrink a character" + '\n' + "Click a character, press =/- key.";
  alert(rules);
}

function bigger(charImg) {
  charImg.width = JSON.stringify(charImg.width + 10);

}

function smaller(charImg) {
  charImg.width = JSON.stringify(charImg.width - 10);
}

function chooseCharacter(charName) {
  character = charName;
  charImg = document.getElementById(character);
  document.getElementById("currChar").src = charImg.src;
}

function goProne(charImg) {
  charImg.style.transform = 'rotate(90deg)';
}

function stand(charImg) {
  charImg.style.transform = 'rotate(0deg)';
}

function deleteChar(charImg) {
  if (npcs.includes(charImg.id)) {
    charImg.src = "";
    document.getElementById("currChar").src = "";

  }
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

function docReady() {
  for (let i = 0; i < characterList.length; i++) {
    let image = document.getElementById(characterList[i]);
    image.addEventListener('mousedown', function (e) {
      mouseClicked(e, characterList[i]);
    }, false);
  }
  window.addEventListener('mouseup', mouseReleased, false);
  window.addEventListener('keydown', checkKey);
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
  function checkKey(key) {
    if (key.keyCode === 80) {
      goProne(charImg)
    }
    if (key.keyCode === 83) {
      stand(charImg)
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
    if (key.keyCode === 46) {
      deleteChar(charImg);
    }
  }
  KeyboardController({
    37: function () { leftArrowPressed(charImg); },
    38: function () { upArrowPressed(charImg); },
    39: function () { rightArrowPressed(charImg); },
    40: function () { downArrowPressed(charImg); },
  }, 1);
}
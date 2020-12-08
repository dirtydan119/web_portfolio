//
// Whack a Mole
//


var tableElements = document.getElementsByTagName("td")
// var startingMole = Math.floor((Math.random() * 12) + 0)
//
// tableElements[startingMole].className = "moleOn"


function showMole() {
  var x = Math.floor((Math.random() * 12) + 0)
  tableElements[x].className = "moleOn"
}

var one = document.getElementById("1")
var two = document.getElementById("2")
var three = document.getElementById("3")
var four = document.getElementById("4")
var five = document.getElementById("5")
var six = document.getElementById("6")
var seven = document.getElementById("7")
var eight = document.getElementById("8")
var nine = document.getElementById("9")
var ten = document.getElementById("10")
var eleven = document.getElementById("11")
var twelve = document.getElementById("12")

var moleCount = 0;


one.addEventListener("click", function() {

  if (one.className == "moleOn") {
    one.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

two.addEventListener("click", function() {

  if (two.className == "moleOn") {
    two.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

three.addEventListener("click", function() {

  if (three.className == "moleOn") {
    three.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

four.addEventListener("click", function() {

  if (four.className == "moleOn") {
    four.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

five.addEventListener("click", function() {

  if (five.className == "moleOn") {
    five.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

six.addEventListener("click", function() {

  if (six.className == "moleOn") {
    six.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

seven.addEventListener("click", function() {

  if (seven.className == "moleOn") {
    seven.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

eight.addEventListener("click", function() {

  if (eight.className == "moleOn") {
    eight.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

nine.addEventListener("click", function() {

  if (nine.className == "moleOn") {
    nine.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

ten.addEventListener("click", function() {

  if (ten.className == "moleOn") {
    ten.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

eleven.addEventListener("click", function() {

  if (eleven.className == "moleOn") {
    eleven.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})

twelve.addEventListener("click", function() {

  if (twelve.className == "moleOn") {
    twelve.className = "moleOff";
    moleCount += 1;
    showMole();
  }
})


var startButton = document.getElementById("start")

startButton.addEventListener("click", function() {
  // var tableElements = document.getElementsByTagName("td")
  var startingMole = Math.floor((Math.random() * 12) + 0)

  tableElements[startingMole].className = "moleOn"
  var timeleft = 10;
  var downloadTimer = setInterval(function(){

    document.getElementById("countdown").value = 10 - timeleft;
    timeleft -= 1;

    if(timeleft < 0) {
      clearInterval(downloadTimer);
      alert("You have whacked " + moleCount + " moles! Nice job!");
      moleCount = 0;
      one.className = "moleOff";
      two.className = "moleOff";
      three.className = "moleOff";
      four.className = "moleOff";
      five.className = "moleOff";
      six.className = "moleOff";
      seven.className = "moleOff";
      eight.className = "moleOff";
      nine.className = "moleOff";
      ten.className = "moleOff";
      eleven.className = "moleOff";
      twelve.className = "moleOff";
    }
  }, 1000);
})

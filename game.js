
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

function nextSequence() {
  userClickedPattern = [];

  $("#level-title").text("Level " + level);
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function () {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length);
})

function playSound(audioName) {
  var audio = new Audio("sounds/" + audioName + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if(gamePattern.length == 0) {
    nextSequence();
  }
})

function checkAnswer(currentLevel) {
  if(currentLevel == level){
    for (var i = 0; i < gamePattern.length; i++) {
      if(gamePattern[i] != userClickedPattern[i]){
        console.log("Wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        return;
      }
    }

    console.log("Success!");
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

function startOver() {
  level = 0;

  gamePattern = [];
  userClickedPattern = [];
}

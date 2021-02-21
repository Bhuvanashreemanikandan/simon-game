var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = true;

var level=0;


$(document).keypress(function(){
  if (started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=false;
  }
});
// for identifying which button is clicked
var userClickedPattern = [];
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animationPress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// for generation random numbers
function nextSequence() {
    userClickedPattern=[];
   level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
  animationPress(randomChosenColor);
  $("#level-title").text("Level "+level);
}
nextSequence();


// for playingsound

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// for animation

function animationPress(currentColor){
 var activeButton = $("#"+currentColor);
 activeButton.addClass("pressed");
 setTimeout(function(){
   activeButton.removeClass("pressed");
 },100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length-1===userClickedPattern.length-1)
    setTimeout(function(){
      nextSequence()
    },1000);
  }
  else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("GameOver.Press any key to restart")
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    startover();
  }
}
function startover(){
  level=0;
  started=true;
  gamePattern=[];
}

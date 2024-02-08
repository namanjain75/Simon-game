let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
var started = false;
$(".btn").hide();

// once the key is pressed this funciton should be called which basically add a new color in using random number and add it to the parrern calss

const nextSequence = () => {
//genetare a random number bw 0 to 3
  randomNumber = Math.floor(Math.random() * 4); 
  // console.log(randomNumber);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);

  // Flashing the button
  $(`.${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  $("h1").text(`Level: ${level}`);
  level++;
};


// starting the game on the key press
$(document).on("keydown", (evt) => {
   
    if(started==false){
  nextSequence();
    started = true;
    $(".btn").show();
    }
});

// clicking on the buttons and adding the user input to the userClickedPattern array using push
$(".btn").click(function () {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        // console.log(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
      });


// playing sound of various color
let playSound = (name) => {
  var audio = new Audio(`/sounds/${name}.mp3`);
  audio.play();
};

// animation duting the key press by adding a class pressed
let animatePress = (currentColour) => {
  $(`.${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`.${currentColour}`).removeClass("pressed");
  }, 100);
};



// check the user input with the game generated input
function checkAnswer(currentLevel) {
//   console.log(userClickedPattern);
//   console.log(gamePattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  }
  else{
    var audio = new Audio(`/sounds/wrong.mp3`);
    audio.play();
    $("body").addClass("game-over")
    setTimeout(()=>{
        $("body").removeClass("game-over");
    },200)
    $("h1").html(`Game over<br><br>press any key to restart`);
    startOver();
    $(".btn").hide();
}
}

// funciton to reset all the elements of the game
function startOver(){
gamePattern=[];
level=0;
userClickedPattern=[];
started=false;
}

// console.log(userClickedPattern);
// console.log(gamePattern);

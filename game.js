// Array which holds colors
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

    //start game
$(document).keypress(function() {
    if(!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
    //checks answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $(document.body).addClass("game-over") // adds the red flash then removes after 200 milliseconds
        setTimeout(() => {
            $(document.body).removeClass("game-over")
        }, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $(document).keypress(function () {
            startOver(); //on keypress, restart game.
        });
    }
};

    //game over
function startOver() {
    location.reload(); // reload webpage once key is pressed.
};

$(".btn").click(function() {        //checks for clicks on all buttons with the btn class
        var userChosenColour = $(this).attr("id");      //'this' gets the jQuery representation of the button element that was clicked. 'attr' gets the value of the "id" attribute of that button.
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);        //when a user clicks a button play sound
        animatePress(userChosenColour);         //adds flash to the button clicked

        checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];      // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); //generates random number 0-3
    var randomChosenColour = buttonColours[randomNumber]; // randomChosenColor = buttonColors which generates a random number from the array (0-4), which is then returned
    gamePattern.push(randomChosenColour); //gamePattern has the randomChosenColor add new items to the end of this array
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //adds flash to the ID of the button
    playSound(randomChosenColour);
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); //plays audio when clicked/flashes
    audio.play();
};

function animatePress(currentColour) { //adds flash to the button clicked
    $("#" + currentColour).addClass("pressed");
    setTimeout( () => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};





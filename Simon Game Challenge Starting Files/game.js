
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;


function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed");
    }, 100)
}

function nextSequence() {
    let randomNumber = Math.round(Math.random() * 3) // 0 - 3 integers
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    
    
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100); 

    playSound(randomChosenColour)
    level += 1;
    $("#level-title").text(`Level ${level}`);
}

$('.btn').click(function(id) {
    let userChosenColour = $(this).attr("id");
    // let userChosenColour = id.target.id;

    animatePress(userChosenColour)
    // $(`#${userChosenColour}`).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(level);
});


// detect keyboard press for the first time, can be considered as the most important part of the codes
    $(document).keypress(function() {
        if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

// check if the answer match
function checkAnswer(currentLevel){
    if (gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]){
        console.log("success");
    }
    else { // if wrong
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
    // check if cleared, if yes, go to next level
    if (userClickedPattern.length == currentLevel) {
        console.log("finished");
        setTimeout(function(){
            nextSequence();
        }, 1000)
        userClickedPattern = [];
    }
}

// reset the value to just started
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
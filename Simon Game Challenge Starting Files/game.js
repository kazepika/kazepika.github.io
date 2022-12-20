
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
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);
    let randomNumber = Math.round(Math.random() * 3); // 0 - 3 integers
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$('.btn').click(function (id) {
    let userChosenColour = $(this).attr("id");
    // let userChosenColour = id.target.id;

    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    // $(`#${userChosenColour}`).fadeOut(100).fadeIn(100);

    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


// detect keyboard press for the first time, can be considered as the most important part of the codes
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

// check if the answer match
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        // check if cleared, if yes, go to next level
        if (userClickedPattern.length === gamePattern.length) {
            console.log("finished");
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else { // if wrong
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")

        startOver();
    }
}

// reset the value to just started
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
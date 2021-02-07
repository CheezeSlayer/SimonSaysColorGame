var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickPattern = [];

var level = 0;
var started = false;

function playSound(colorName) {
    var audio = new Audio(`./sounds/${colorName}.mp3`)
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed")
    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed")
    }, 100)
}

function nextSequence() {
    if(started) {
        userClickPattern = [];
        level = level + 1;
        $("#level-title").text(`Level ${level}`)

        var randomNumber = Math.floor(Math.random() * 4)
        var randomChosenColor = buttonColors[randomNumber]

        playSound(randomChosenColor);
        $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100)
        gamePattern.push(randomChosenColor)

        console.log(gamePattern)
    }
    
}

function checkAnswer(currentLevel) {
    var check = (userClickPattern[currentLevel] == gamePattern[currentLevel])
    console.log(userClickPattern)
    switch(check) {
        case true:
            if(gamePattern.length - 1 == currentLevel) {
                console.log("Finished Sequence")
                setTimeout(function() {
                    nextSequence()
                }, 1000)
            }
            break;
        case false:
            console.log("false")
            var gameOver = new Audio("./sounds/wrong.mp3")
            gameOver.play();
            $("body").addClass("game-over")
            $("h1").text("Game Over, Press Any Key to Restart")
            setTimeout(function() {
                $("body").removeClass("game-over")
            }, 200)
            startOver();
            break;
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$(".btn").click(function(event) {
    if(started) {
        var userChosenColor = event.currentTarget.id;
        playSound(userChosenColor);
        animatePress(userChosenColor);

        userClickPattern.push(userChosenColor);
        checkAnswer(userClickPattern.length - 1)
    }
})

$(document).on("keypress", function() {
    if(started == false) {
        started = true;
        nextSequence();
    }
})
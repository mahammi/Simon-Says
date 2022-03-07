var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var userLevel = 0;
var start = false;

function nextSequence(){
    start = true;
    console.log("displaying sequence");
    $("#level-title").text("Level " + level);
    let randomNum = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
    
}

if(!start){  
    $(document).one("keydown", function(){
        nextSequence()});
}


$(".btn").click(function(event){  
    if(start){    
        console.log(userLevel);
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(this.id);     
        animatePress(userChosenColour);
        checkColour(userLevel);
    }  
});



function checkColour(currLevel){
    if(userClickedPattern[currLevel] == gamePattern[currLevel]){
        console.log("Level " + currLevel + " good");
        userLevel++;

        if(userLevel >= gamePattern.length){
            console.log("next lvl!");
            userLevel=0;
            userClickedPattern = [];
            level++;
            setTimeout(function(){
                nextSequence()
            }, 1000);
            return;
        }
    }else{
        console.log("bad");
        gameOver();
        startOver();
        return; 
    }
    
}



function playSound(name){
    let buttonSound = new Audio("sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 200);
}


function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    start = false;
    $("#level-title").text("GAME OVER! Press any key to restart.");
    $(document).one("keydown", function(){
        nextSequence()});
}


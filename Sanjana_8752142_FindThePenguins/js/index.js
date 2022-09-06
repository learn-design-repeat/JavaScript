"use strict";

// Global Declarations
var growl = new Audio("yeti.mp3");      // Yetti audio
var squeak = new Audio("squeak.mp3");   // Penguin squeak
var hooray = new Audio("hooray.mp3");   // Winning the level
var position = [];                      // Positions of the penguins and yeti in a randomized order
var totalLevels = 9;                    // Total number of mounds
var totalYetis = 0;                     // Total number of Yetis.
var gameWidth = 600;                    // To modify the  css of the gameholder according to the level

/*
 * showMounds : To display the mounds.
 *              class hide => changes the display to none
 */
const showMounds = () => {
    let i = 0;
    // Clear out the class for all divs
    var mounds = $(".game");
    for (i = 0; i < mounds.length; i++) {
        $(mounds[i]).removeClass("hide");
    }
}

/*
 * hideMounds : To hide the mounds.
 *              class hide => changes the display to none
 */
const hideMounds = () => {
    let i = 0;
    // Clear out the class for all divs
    var mounds = $(".game");
    for (i = 0; i < mounds.length; i++) {
        $(mounds[i]).addClass("hide");
    }
}

/*
 * hidePenguins : To hide the penguins when the yeti is encountered.
 *                if the position is of a penguin 
 *                  -> remove all the class(penguin*) that displays the penguin
 *                  -> Add the classes for the gameholder(game), the mounds(mound) and
 *                     the penguins positions(pen*).
 */
const hidePenguins = () => {
    let i = 0;
    // Clear out the class for all divs
    var mounds = $(".game");
    for (i = 0; i < mounds.length; i++) {
        if (position[i] != "yeti") {
            $(mounds[i]).removeClass();
            $(mounds[i]).addClass("game mound " + position[i]);
        }
    }
}

/*
 * random_yeti_pos : To pick out yeti's position in a randomized order
 *                   -> When the levels increases so does the number of yetis
 *                   -> Since, the initial yeti_pos value lies 0 - 9. Double the values for greater levels
 */
const random_yeti_pos = (mounds) => {
    let yeti_pos = Math.floor(Math.random() * 10);
    if (yeti_pos > (mounds.length - 1) && (totalLevels == 9)) { // Since the mounds indices are 0 - 8
        yeti_pos = 0;
    } else if (totalLevels == 12) {
        yeti_pos += Math.floor(Math.random() * 2); // Position of yeti: 0 - 11
    } else if (totalLevels == 15) {
        yeti_pos += Math.floor(Math.random() * 5); // Position of yeti: 0 - 14
    } else if (totalLevels == 18) {
        yeti_pos += Math.floor(Math.random() * 8); // Position of yeti: 0 - 17
    }
    return yeti_pos;
}

/* 
 * initGame : Initialize the positions of the penguins and yeti.
 *            -> Array position[] holds the positions of the penguins and yeti in a randomized order
 */
const initGame = () => {
    let j = 0;
    let i = 1;
    var mounds = $(".mound");
    let yeti_pos = 0;
    totalYetis = 0;

    // Place yeti first. If the levels are more than 2, increase the no. of yetis
    for (i = 0; i < Math.round(totalLevels/9); i++) {
        yeti_pos = random_yeti_pos(mounds);
        console.log("Debug Log1: Yeti Position :" + yeti_pos); // Debug log1
        if ((position[yeti_pos] != "yeti")) { // If there is  a yeti already present dont disturb it
            position[yeti_pos] = "yeti";
            $(mounds[yeti_pos]).addClass("yeti");
            totalYetis++;
        } else {
            i--; // Re-iterate
        }
    }
    // Place the penguins in the randomize order
    for (j = 0; j < mounds.length; j++) {
        if (position[j] != "yeti") {
            let penguin = "pen" + i;
            $(mounds[j]).addClass(penguin);
            position[j] = penguin;
            if (i == 8){
                i = 1;
            } else {
                i++;
            }
        }
    }
    console.log("Debug Log2: Position array[]: " + position); // Debug log2
}

/* 
 * updateScore : Update the score and highScore value in the score board
 */
const updateScore = (score, highScore) => {
    let html = "Score:" + score + "<br>" + "High Score:" + highScore;
    $("#score").html(html);
}

/* 
 * resetGame : Resets the gameholder. 
 *             -> Removes all the ids and class.
 *             -> Recongigures the class to the gameholder(game), the mounds(mound) and
 *                the penguins positions(pen*).
 *             -> Resets the position[] array and displays the mounds
 */
const resetGame = () => {
    let i = 0;
    // Clear out the class for all divs
    var mounds = $(".game");
    for (i = 0; i < mounds.length; i++) { 
        $(mounds[i]).removeAttr("id");
        $(mounds[i]).removeClass();
        $(mounds[i]).addClass("game mound hide");
    }
    position = [];
    showMounds();
}

/*
 * addlevels : Add three more mounds for each level.
 *             Note: Maximum level: 4 , No. of mounds =18. If level 4 is completed.
 *             The game is reset to level 1 byreloading the page 
 */
const addlevels = () => {
    
    totalLevels += 3;
    gameWidth += 200;

    if (totalLevels > 18) {
        console.log("inside totalLevels");
        resetGame();
        hideMounds();
        $("#replay").removeClass();
        $("#replay").html("Look like there is no more levels to match your speed <br>Want to startover again?"); 
        return; 
    }
    for (let i = 0; i < 3; i++) {
        var newdiv = document.createElement("div");
        newdiv.classList.add("game", "mound");
        $("#gameholder").append(newdiv);
    }
    $("#gameholder").css("width", gameWidth + "px")
        
}


$(document).ready( function() {
    //This code will run after your page loads
    var highScore = 0;
    var score = 0;
    var prevScore = 0;

    // Hide the mounds for displaying the playbutton
    hideMounds();

    // Play Button
    $("#play").click( () => {
         //Display all the mounds
        showMounds();
        $("#play").addClass("hide");
        initGame();
        score = 0;
        highScore = 0;
    });

    //Replay. Reset the game to level 1
    $("#replay").click( () => {
        location.reload();
    });

    // Encountered yeti restart the level
    $("#finish").click( () => {
        //Display all the mounds
        resetGame();
        $("#finish").addClass("hide");
        score = 0;
        initGame();
    });

    // Move on to the next level
    $("#next").click( () => {
        //Display all the mounds
        resetGame();
        console.log("after rest:" + position);
        addlevels();
        prevScore = score;
        $("#next").addClass("hide");
        initGame();
    });

    // Game play. Click yeti or penguins
    $("div").on("click", ".game", function(evt) {
        let inputClassList = evt.target.classList.value;
        let attr_id = "penguin" + inputClassList.substring(14, inputClassList.length);
        
        if(inputClassList.search("yeti") != -1) {
            $(evt.target).removeClass("mound");
            $(evt.target).addClass("yeti_display");
            growl.play();
            if (score > highScore) {
                highScore = score;
            }
            score = 0;
            prevScore = score;
            $("#finish").removeClass("hide");
            $("#finish").html("Ouch! Wanna play again?");
            hidePenguins();
        } else if (inputClassList.search("pen") != -1) {
            if (inputClassList.search("penguin") == -1) {
                $(evt.target).addClass(attr_id);
                $(evt.target).removeClass("mound");
                score++;
                squeak.play();
            }
        } 

        // if the player successfully unveild all the penguins, move on to next level
        if (score == (prevScore + position.length - totalYetis)) {
            hooray.play();
            $("#next").removeClass("hide");
            $("#next").html("Congratulations!!<br>Next level ->");
            highScore = score;
        }
        updateScore(score, highScore);
    });

});
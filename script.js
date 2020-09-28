//PROVIDED ARRAY OF SENTENCES
let sentences = [
  "ten ate neite ate nee enet ite ate inet ent eate",
  "Too ato too nOt enot one totA not anot tOO aNot",
  "oat itain oat tain nate eate tea anne inant nean",
  "itant eate anot eat nato inate eat anot tain eat",
  "nee ene ate ite tent tiet ent ine ene ete ene ate",
];
const NUMWORDS =
  sentences[0].length +
  sentences[1].length +
  sentences[2].length +
  sentences[3].length +
  sentences[4].length;
let i = 0;
let date1, date2, minutes;
let counter = 0;
let marginLeft = 0;
let mistakes = 0;
//GAMEOVER TRIGGER AND LOCK IN WPM WHEN GAMEOVER IS MET
let gameOver = false;
function charCor(a, b) {
  if (a == b) {
    return true;
  } else {
    return false;
  }
}

$(document).ready(function () {
  $("#sentence").text(sentences[i]);
  //INITIALIZE 'target-letter'
  $("#target-letter").text(sentences[i][counter]);
  //HIDE UPERCASE KEYBOARD
  $("#keyboard-upper-container").hide();
  //SWITCH BETWEEN BOARDS WHEN 'SHIFT' IS PRESSED
  $(document).on({
    keydown: function (event) {
      if (!gameOver && event.key == "Shift") {
        $("#keyboard-upper-container").show();
        $("#keyboard-lower-container").hide();
      }
    },
    keyup: function (event) {
      if (event.key == "Shift") {
        $("#keyboard-upper-container").hide();
        $("#keyboard-lower-container").show();
      }
    },
  });

  //WHEN KEYS ARE PRESSED THEY SHOULD BE HIGHLIGHTED IN THE BROWSER
  $(document).on({
    //THIS IS THE 'keydown' LISTENER
    keydown: function (event) {
      //IF GAMEOVER
      if (!gameOver && i >= sentences.length) {
        //SET GAME OVER TO TRUE
        gameOver = true;
        //CREATE DATE2
        //USING NEW DATE TO STORE TIME IN MILLISECONDS
        date2 = new Date();
        //MINUTES VARIABLE  (60000 CONVERTS TO MINUTES)
        minutes = Math.abs(date2.getTime() - date1.getTime()) / 60000;
        //CALCULATE WPM
        let wpm = Math.round(NUMWORDS / minutes - 2 * mistakes);
        //DISPLAY WPM
        $("#sentence").text(
          "Ran out of sentences! And you had " + wpm + " words per minute!"
        );
        //EMPTY TARGET LETTER
        $("#target-letter").text(" ");
        //BUTTON WITH TEXT 'Play Again?'
        $("#target-letter").html(
          '<button type="button" class="btn btn-primary" id="btn0">Play Again?</button>'
        );
        //HIDE BUTTON
        $("#btn0").hide();
        //FADE IN BUTTON
        $("#btn0").fadeIn(1000);
        //RESET IF YES
      }

      //KEEP SHIFT FROM TRIGGERING 'S' KEY
      if (!gameOver && event.key != "Shift") {
        //CREATE 'date1' WITH FIRST KEYPRESS
        if (!gameOver && i == 0 && counter == 0) {
          date1 = new Date();
        }

        $("#" + event.key.charCodeAt(0)).css("background-color", "yellow");
        //IF IN CURRENT SENCTECE EXECUTE THE FOLLOWING:

        if (!gameOver && counter + 1 < sentences[i].length) {
          //+1 REMOVES THE NEED TO PRESS A KEY TO MOVE TO NEXT SENTENCE
          //SELECT YELLOW BLOCK AND MOVE IT 'X' PIXELS TO THE RIGHT
          //IF 'sentences[n][counter + 1] != " "' THEN MOVE 15PX
          if (!gameOver && sentences[i][counter + 1] == " ") {
            marginLeft += 15;
            $("#yellow-block").css("margin-left", marginLeft + "px");
          } else {
            marginLeft += 18;
            $("#yellow-block").css("margin-left", marginLeft + "px");
          }
          //IF CHARACTER IS RIGHT ADD CHECK TO 'id="feedback"'
          if (!gameOver && charCor(event.key, sentences[i][counter])) {
            $("#feedback").append(
              '<span class="glyphicon glyphicon-ok"></span>'
            );
          } else {
            //ELSE IF CHARACTER IS INCORRECT AD 'X' MARK TO 'id="feedback"'
            $("#feedback").append(
              '<span class="glyphicon glyphicon-remove"></span>'
            );
            mistakes++; //+1 TO MISTAKES COUNTER
          }
          counter++;
          //PUT THE EXPECTED CHARACTER IN A BOX
          $("#target-letter").text(sentences[i][counter]);
        } else {
          //RESET CODE WHEN SENTENCE IS DONE
          counter = 0; //COUNTER RESET
          i++; //NEXT SENTENCE FROM ARRAY
          marginLeft = 0; //RESET, MARGIN LEFT
          $("#yellow-block").css("margin-left", marginLeft + "px");
          //NEXT SENTENCE IN SENTENCE BOX
          $("#sentence").text(sentences[i]);
          //CLEAR FEEDBACK
          $("#feedback").empty();
        } //end of if counter < sentences[n] block
      }
    },

    keyup: function (event) {
      //PROTECT FROM SHIFT TRIGGERING S KEY
      if (!gameOver && event.key != "Shift") {
        $("#" + event.key.charCodeAt(0)).css("background-color", "#f5f5f5");
      }
    },
  });

  //EVENT LISTENER ON PLAY AGAIN BUTTON
  $(document).on("click", "#btn0", function () {
    location = location;
  });
});

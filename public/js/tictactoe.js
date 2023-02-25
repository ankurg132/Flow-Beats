
      // GRAB ELEMENTS
      const tiles = document.querySelectorAll(".tile"); //grab all divs w/ class of tile
      const strike = document.getElementById("strike");
      const turnNotice = document.getElementById("turn-notice");
      const gameOverArea = document.getElementById("game-over-area");
      const gameOverText = document.getElementById("game-over-text");
      const playAgain = document.getElementById("play-again");

      // SOUND EFFECTS
      const gameOverSound = new Audio(
        "https://github.com/christadejesus/games-js/blob/main/spooky-tic-tac-toe/audio/strange-lullaby.wav?raw=true"
      );
      const clickSound1 = new Audio(
        "https://github.com/christadejesus/games-js/blob/main/spooky-tic-tac-toe/audio/boo-and-laugh.wav?raw=true"
      );
      const clickSound2 = new Audio(
        "https://github.com/christadejesus/games-js/blob/main/spooky-tic-tac-toe/audio/scary-shout.wav?raw=true"
      );

      // DEFINE PLAYERS/TURN/BOARD
      const player_X = "👻"; //assigns ghost emoji to player
      const player_Y = "🧛"; //assigns dracula emoji to player
      let turn = player_X; //will change programmatically, initialized to start w/ player_X

      const boardState = Array(tiles.length); //grabs all tiles and places them into an array
      boardState.fill(null); //all tiles will start with a value of null

      // ASSIGN HOVER STATES
      function setHoverText() {
        //remove/clear any hoverClass that will be added below
        tiles.forEach((tile) => {
          tile.classList.remove("👻-hover");
          tile.classList.remove("🧛-hover");
        });

        const hoverClass = `${turn}-hover`; //use template literal to build class programmatically

        tiles.forEach((tile) => {
          if (tile.innerText == "") {
            //if the tile is empty...
            tile.classList.add(hoverClass); //...add the hoverClass on hover
          }
        });
      }
      setHoverText(); //don't forget to call the function!

      // ASSIGN CLICK EVENTS TO CLICKED TILES
      tiles.forEach((tile) => tile.addEventListener("click", tileClick));

      function tileClick(event) {
        const tile = event.target;
        const tileNumber = tile.dataset.index;

        //if the game has ended and the game-over-area is made visible, player cannot click tiles (until play-again button is selected)
        if (gameOverArea.classList.contains("visible")) {
          return;
        }

        if (tile.innerText != "") {
          //if the tile has already been clicked & has emoji
          return;
        } else if (turn === player_X) {
          tile.innerText = player_X; //populates tile with player_X's emoji
          boardState[tileNumber - 1] = player_X; //assigns the player_X value to the tile in the boardState array
          turn = player_Y; //prepares for the next play of other player!
          clickSound1.play();
        } else {
          tile.innerText = player_Y; //populates tile with player_Y's emoji
          boardState[tileNumber - 1] = player_Y; //assigns the player_X value to the tile in the boardState array
          turn = player_X; //prepares for the next play of other player!
          clickSound2.play();
        }
        turnNotice.innerText = `It's ${turn}'s turn.`;
        setHoverText(); //Clears hover state so hover emoji is no longer visible once tile clicked
        checkWinner(); //Checks for a winning combination with each tile click
      }

      // DEFINE WINNING COMBINATIONS

      const winningCombinations = [
        //rows
        { combo: [1, 2, 3], strikeClass: "strike-row-1" },
        { combo: [4, 5, 6], strikeClass: "strike-row-2" },
        { combo: [7, 8, 9], strikeClass: "strike-row-3" },
        //columns
        { combo: [1, 4, 7], strikeClass: "strike-column-1" },
        { combo: [2, 5, 8], strikeClass: "strike-column-2" },
        { combo: [3, 6, 9], strikeClass: "strike-column-3" },
        //diagonals
        { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
        { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
      ];

      // CHECK FOR WINNER & ASSIGN STRIKE
      function checkWinner() {
        //check for winner
        for (const winningCombination of winningCombinations) {
          //access each object in array of objects & assign to new variable
          const { combo, strikeClass } = winningCombination; //object destructuring
          const tileValue1 = boardState[combo[0] - 1]; //declare new const (1/3) & assign value
          const tileValue2 = boardState[combo[1] - 1]; //declare new const (2/3) & assign value
          const tileValue3 = boardState[combo[2] - 1]; //declare new const (3/3) & assign value

          if (
            tileValue1 != null &&
            tileValue1 === tileValue2 &&
            tileValue1 === tileValue3 //if all 3 values in a combo are not empty & match, winner!
          ) {
            strike.classList.add(strikeClass); //add the cooresponding strikeClass to the strike div element
            gameOverArea.classList.add("visible"); //show game-over-area when winner is determined
            gameOverScreen(tileValue1); //gameOverScreen * defined below * takes in the value of tileValue1 IF a winner is determined, otherwise it takes in the value of null * see below *
          }
        }

        //CHECK FOR DRAW
        const allTilesFilled = boardState.every((tile) => tile != null); //if every tile has a value of an emoji but has not satisfied checkWinner
        if (allTilesFilled) {
          gameOverScreen(null); //no tileValue1 will be assigned!
        }
      }

      // DEFINE THE gameOverScreen FUNCTION
      function gameOverScreen(winnerText) {
        let text = "It's a Draw!"; //assigns the default text value
        if (winnerText != null) {
          //if the function takes in a tileValue1 above...
          text = `${winnerText} is the Winner!`;
        }
        gameOverArea.classList.add("visible");
        gameOverText.innerText = text; //populates the game-over-text with appropriate message
        gameOverSound.play();
      }

      // PLAY AGAIN BUTTON
      playAgain.addEventListener("click", startNewGame);

      function startNewGame() {
        strike.className = "strike";
        boardState.fill(null);
        gameOverArea.classList.remove("visible");
        tiles.forEach((tile) => (tile.innerText = ""));
        setHoverText();
        gameOverSound.pause();
      }
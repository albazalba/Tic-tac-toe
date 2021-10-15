import './App.scss';
import React, {useEffect, useState} from 'react';
import Square from './components/Square';
import {Patterns} from './Pattern'

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({winner: "none", state: "none"});
  

  useEffect(() => {
    checkwin();
    checkIfTie();
    player == "X" ? setPlayer("O") : setPlayer("X");
  }, [board]);
 
  useEffect( () => {
    if (result.state == "won") {
      alert(`Game finished! winning player: ${result.winner}`);
      restartGame()
    }
  },[result]);

  const chooseSquare = (square) => {
    setBoard(board.map((val, index) => {
      if (index == square && val == ""){
        return player
      }
      return val
    }));
  };

  const checkwin =  () => {
    Patterns.forEach((currPatter) => {
      const firstPlayer = board[currPatter[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPatter.forEach((index) => {
        if(board[index] != firstPlayer) {
          foundWinningPattern =false;
        }
      });

      if (foundWinningPattern) {
        setResult({winner: player, state: "won"})
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
      restartGame();
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  };

  return (
    <div className="app">
      <h3>TIC_TAC_TOE</h3>
      <div className="board">
        <div className="row">
          <Square chooseSquare={() => chooseSquare(0)} val={board[0]}/>
          <Square chooseSquare={() => chooseSquare(1)} val={board[1]}/>
          <Square chooseSquare={() => chooseSquare(2)} val={board[2]}/>
        </div>
        <div className="row">
          <Square chooseSquare={() => chooseSquare(3)} val={board[3]}/>
          <Square chooseSquare={() => chooseSquare(4)} val={board[4]}/>
          <Square chooseSquare={() => chooseSquare(5)} val={board[5]}/>
        </div>
        <div className="row">
          <Square chooseSquare={() => chooseSquare(6)} val={board[6]}/>
          <Square chooseSquare={() => chooseSquare(7)} val={board[7]}/>
          <Square chooseSquare={() => chooseSquare(8)} val={board[8]}/>
        </div>
      </div>
    </div>
  );
}

export default App;

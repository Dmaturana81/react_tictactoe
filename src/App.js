import React from "react";
import { useState } from "react";
import './index.css';


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]) ;
  const [colors, setColors] = useState(Array(9).fill('square_blue'))
  const [currentMove, setCurrentMove] = useState(0)
  const [reverse, setReverse] = useState(Boolean(false))
  const [position, setPosition] = useState([Array(2)])
  const xIsNext = currentMove % 2 === 0;
  const currentState = history[currentMove] 
  

  function handlePlay(nextSquares, nextColors, x, y) {
    const nextHistory = [...history.slice(0,currentMove + 1), nextSquares];
    const nextPosition = [...position.slice(0,currentMove + 1), [x + 1, y + 1]]
    setColors(nextColors);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setPosition(nextPosition)
  }

  function handleWinner() {

  }

  function handleOrder() {
    setReverse(!reverse)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function generateMoves() {
    let newHistory = history.slice()
    return (
      newHistory.map((squares, move) => {
        let description;
        if (move>0) {
          description = "move to # " + move + "at: " +position[move];
        } else {
          description = "Go to game start"
        }
        if (move < newHistory.length-1){
          return (
             <li key={move}>
              <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-5 rounded-full items-center" onClick={() => jumpTo(move)}>
                {description}
              </button>
            </li>
          )
        } else {
          return (
            <li key={move}>
              {"You are at move # " + move + "at: " +position[move]}
            </li>
          )
        }    
      })
    )

  }
  const moves = generateMoves()

  return (
  <body className="items-center bg-gray-100">
    <div className="game-board items-center">
      <Board xIsNext={xIsNext} squares={currentState} colors={colors} onPlay={handlePlay} onWinner={handleWinner}/>
    </div>
    <div className="game-info">
      <ol>{reverse ? moves.reverse() : moves}</ol>
    </div>
    <div>
      <button onClick={ handleOrder}>Reverse Moves</button>
    </div>
  </body >
    
  )
}


function Board({xIsNext, squares, colors, onPlay}) {
  const nextSquares = squares.slice();
  const nextColors = colors.slice();

  function handleClick(x,y) {
    let i = x * colCount + y
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    if (xIsNext) {
      nextSquares[i] = "X";
      nextColors[i] = 'square_blue';
    }
    else {
      nextSquares[i] = "O";
      nextColors[i] = 'square_red';
    }
    onPlay(nextSquares, nextColors, x, y)
  }
  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner[0];
    colors = colors.map((a,i) => {
      return winner.slice(1).includes(i) ? "square_winner" : a; 
    }
  )
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const rowCount = 3 ;
  const colCount = 3 ;
  return (
    <div>
      <div className="status items-center self-center text-center">
        <h1 className="texts-center items-center place-items-center justify-items-center">
        {status}
        </h1>
      </div>
      <div>
      { [...new Array(rowCount)].map((x, rowIndex) => {
        return (
          <div className="col-span-12 texts-center items-center place-items-center justify-items-center board-row" key={rowIndex}>
            { [...new Array(colCount)].map((y, colIndex) => {
                const position = rowIndex * colCount + colIndex
                return (
                <Square key={position} value={squares[position]} color={colors[position]} onSquareClick={() => handleClick(rowIndex, colIndex)} /> 
                )
              }
            )}
          </div>
        )}
      )}
    </div>
  </div>
  )
}

function Square({ value, onSquareClick, color , background}) {
  return (<button 
            className={color}
            background={background}
            onClick={onSquareClick}>
              {value}
            </button>
         );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}
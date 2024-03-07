import React, { useState } from "react";
import { Box, Button, Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { FaTimes, FaCircle } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    if (!calculateWinner(newBoard)) {
      setPlayer(player === "X" ? "O" : "X");
      if (isAIPlaying && player === "X") {
        const aiMove = calculateAIMove(newBoard);
        handleClick(aiMove);
      }
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const calculateAIMove = (board) => {
    const availableMoves = board.reduce((moves, cell, index) => {
      if (cell === null) moves.push(index);
      return moves;
    }, []);

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  const winner = calculateWinner(board);

  return (
    <Box maxWidth="400px" mx="auto" mt={8}>
      <Heading textAlign="center" mb={4}>
        Tic Tac Toe
      </Heading>
      <Button colorScheme={isAIPlaying ? "red" : "green"} mb={4} onClick={() => setIsAIPlaying(!isAIPlaying)}>
        {isAIPlaying ? "Play with a Friend" : "Play with AI"}
      </Button>
      <SimpleGrid columns={3} spacing={2}>
        {board.map((cell, index) => (
          <Center key={index} bg="gray.100" h="100px" fontSize="4xl" cursor="pointer" onClick={() => handleClick(index)}>
            {cell === "X" ? <FaTimes color="blue" /> : cell === "O" ? <FaCircle color="red" /> : null}
          </Center>
        ))}
      </SimpleGrid>
      {winner && (
        <Text textAlign="center" mt={4} fontSize="2xl">
          {winner === "X" ? "X wins!" : "O wins!"}
        </Text>
      )}
      {!winner && board.every((cell) => cell !== null) && (
        <Text textAlign="center" mt={4} fontSize="2xl">
          It's a draw!
        </Text>
      )}
      <Center mt={4}>
        <Button onClick={resetGame}>Reset Game</Button>
      </Center>
    </Box>
  );
};

export default Index;

import React from "react";
import WordList from "./components/WordList";
import WordInput from "./components/WordInput";
import { Box } from "@chakra-ui/react";
import ResultPanel from "./components/ResultPanel";
import { useSelector } from "react-redux";
import { useTypeChecker } from "./reducers/typeCheckerReducer";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const { timer, isGameStarted } = useSelector(useTypeChecker);

  return (
    <Box>
      <Navbar />
      <Box m={"5"}>
        <WordList />
        <WordInput />
        {isGameStarted && timer === 0 && <ResultPanel />}
      </Box>
    </Box>
  );
};

export default App;

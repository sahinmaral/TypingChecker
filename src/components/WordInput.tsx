import { Box, Button, Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";

import React, {
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTypeChecker,
  startGameStatus,
  setCurrentWordAsCorrect,
  setCurrentWordAsWrong,
  decreaseTimer,
  resetGameStatus,
  setKeyStrokeAsCorrect,
  setKeyStrokeAsWrong,
  setTypedWord,
} from "../reducers/typeCheckerReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const WordInput: React.FC = () => {
  const { isGameStarted, generatedWords, timer } = useSelector(useTypeChecker);

  const totalWordCount = useMemo(() => {
    return generatedWords.filter(
      (generatedWord) => generatedWord.status !== "idle"
    ).length;
  }, [generatedWords]);

  const dispatch = useDispatch();

  const wordInput = useRef<HTMLInputElement>(null);

  const [timerDisplayState, setTimerDisplayState] = useState<boolean>(true);

  let intervalId = 0;

  const stopGame = () => {
    const input = wordInput.current as HTMLInputElement;

    clearInterval(intervalId);
    input.disabled = true;
    input.value = "";
  };

  const startGame = () => {
    dispatch(startGameStatus());
    dispatch(decreaseTimer());
  };

  const resetGame = () => {
    dispatch(resetGameStatus());
    clearInterval(intervalId);
    (wordInput.current as HTMLInputElement).disabled = false;
  };

  useEffect(() => {
    if (isGameStarted) {
      intervalId = setInterval(startGame, 1000);
    }

    if (timer === 0) {
      clearInterval(intervalId);
      stopGame();
    }

    return () => clearInterval(intervalId);
  }, [isGameStarted, timer]);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = wordInput.current as HTMLInputElement;
    let typedWordWithoutSpace = input.value.trimEnd();

    if (!isGameStarted) {
      dispatch(startGameStatus());
      startGame();
    }

    if (event.key === " ") {
      if (generatedWords[totalWordCount].word === typedWordWithoutSpace) {
        dispatch(setCurrentWordAsCorrect(generatedWords[totalWordCount].id));
        dispatch(
          setKeyStrokeAsCorrect(generatedWords[totalWordCount].word.length + 1)
        );
        input.value = "";
      } else {
        if (typedWordWithoutSpace.length !== 0) {
          dispatch(setCurrentWordAsWrong(generatedWords[totalWordCount].id));
          dispatch(
            setKeyStrokeAsWrong(generatedWords[totalWordCount].word.length)
          );
          input.value = "";
        }
      }
    } else {
      if (/^[a-zA-Z]$/.test(event.key)) {
        dispatch(setTypedWord(input.value));
      }
    }
  };

  const handleTimerState = () => {
    setTimerDisplayState(!timerDisplayState);
  };

  const showTimer = useMemo(() => {
    let minutes = Math.floor(timer / 60);
    let seconds = Number(timer % 60);

    return `${minutes}:${
      seconds === 0 ? "00" : seconds % 10 === seconds ? `0${seconds}` : seconds
    }`;
  }, [timer]);

  return (
    <Box bg={useColorModeValue("blackAlpha.300","gray.600")} p={3} borderRadius={"md"} mt={2}>
      <Flex justify={"center"} gap={5}>
        <Input
          fontFamily={"Times New Roman, Times, serif"}
          onKeyUp={handleKeyPress}
          ref={wordInput}
          border={"1px"}
          fontSize={"2xl"}
          bg={useColorModeValue("white","gray.700")}
          w={500}
          h={50}
        />
        <Box
          bg={useColorModeValue("gray.700","gray.800")}
          w={70}
          h={50}
          color={"white"}
          p={2}
          borderRadius={"md"}
        >
          <Flex
            justify={"center"}
            cursor={"pointer"}
            onClick={() => handleTimerState()}
          >
            <Text
              fontSize={"xl"}
              visibility={timerDisplayState ? "visible" : "hidden"}
            >
              {showTimer}
            </Text>
          </Flex>
        </Box>
        <Button
          color={"white"}
          sx={{
            backgroundColor: "blue.400",
            _hover: {
              backgroundColor: "blue.600",
            },
          }}
          w={50}
          h={50}
          onClick={() => resetGame()}
        >
          <FontAwesomeIcon icon={faArrowsRotate} size="lg" />
        </Button>
      </Flex>
    </Box>
  );
};

export default WordInput;

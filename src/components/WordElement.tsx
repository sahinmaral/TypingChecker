import React, { useMemo } from "react";
import { Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { WordElementProps } from "../@types/wordElement";
import { useSelector } from "react-redux";
import { useTypeChecker } from "../reducers/typeCheckerReducer";

const WordElement: React.FC<WordElementProps> = (props) => {
  const { generatedWords, typedWord } = useSelector(useTypeChecker);
  const { colorMode } = useColorMode();

  const bgColorModeWhenCurrentWordTyping = useColorModeValue("gray.200", "gray.900")
  const bgColorModeWhenIdle = useColorModeValue("white", "black")
  const textColorModeWhenIdle = useColorModeValue("black", "white");

  const { currentGeneratedWord, wordOrder } = props;

  let foundGeneratedWord = generatedWords.find(
    (generatedWord) => generatedWord.id === currentGeneratedWord.id
  );

  const totalWordCount = useMemo(() => {
    return generatedWords.filter(
      (generatedWord) => generatedWord.status !== "idle"
    ).length;
  }, [generatedWords]);

  const checkUserIsTypingCorrectly = useMemo(() => {
    return (
      generatedWords[totalWordCount].word.substring(0, typedWord.length) ===
      typedWord.trimEnd()
    );
  }, [typedWord, generatedWords]);


  const textColor = useMemo(() => {
    if (foundGeneratedWord !== undefined) {
      switch (foundGeneratedWord.status) {
        case "correct":
          return "green.400";
        case "wrong":
          return "red.400";
        default:
          return textColorModeWhenIdle;
      }
    }
  }, [generatedWords, colorMode]);

  const bgColor = useMemo(() => {


    if (wordOrder === totalWordCount) {
      if (!checkUserIsTypingCorrectly) {
        return "red.500";
      } else {
        if (typedWord.length === 0)
          return bgColorModeWhenCurrentWordTyping;
        else return "green.400";
      }
    } else {
      return bgColorModeWhenIdle;
    }
  }, [generatedWords, typedWord, colorMode]);

  return (
    <Text
      transitionTimingFunction={"cubic-bezier(.4,0,.2,1)"}
      transitionProperty={"all"}
      transitionDuration={".15s"}
      as="span"
      fontSize="2xl"
      pt={"5px"}
      pb={"5px"}
      pl={"10px"}
      pr={"10px"}
      color={textColor}
      bg={bgColor}
    >
      {currentGeneratedWord.word}
    </Text>
  );
};

export default WordElement;

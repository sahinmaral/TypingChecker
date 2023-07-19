import React, { useEffect, useMemo, useState } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import WordElement from "./WordElement";
import { useTypeChecker } from "../reducers/typeCheckerReducer";
import { useSelector } from "react-redux";

const WordList: React.FC = () => {
  const { generatedWords } = useSelector(useTypeChecker);

  const totalWordCount = useMemo(() => {
    return generatedWords.filter(
      (generatedWord) => generatedWord.status !== "idle"
    ).length;
  }, [generatedWords]);

  const [top, setTop] = useState<number>(0);

  useEffect(() => {
    if (totalWordCount === 0) {
      setTop(0);
    } else {
      const topPx = document.querySelector<HTMLElement>(`.word-list > span:nth-child(${totalWordCount + 1})`);
      if (topPx !== null) {
        if (topPx.offsetTop > top) {
          if(totalWordCount === 1){
            setTop(top + 60);
          }else{
            setTop(top + 50);
          }
        }
      }
    }
  }, [totalWordCount]);

  return (
    <Box
      fontFamily={"Times New Roman, Times, serif"}
      border="1px"
      borderColor={"white"}
      shadow={"md"}
      rounded="md"
      p={"10px"}
      overflow="hidden"
      h={"110px"}
      bg={useColorModeValue("white","black")}
    >
      <Flex flexWrap={"wrap"} top={`-${top}px`} lineHeight={"40px"} position={"relative"} className="word-list">
        {generatedWords.map((generatedWord, index) => {
          return (
            <WordElement
              key={index}
              wordOrder={index}
              currentGeneratedWord={generatedWord}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default WordList;

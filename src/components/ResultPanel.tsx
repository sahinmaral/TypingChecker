import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useTypeChecker } from "../reducers/typeCheckerReducer";
import { WordStatus } from "../config/enums";
import html2canvas from "html2canvas";

const ResultPanel: React.FC = () => {
  const { generatedWords, keyStrokes } = useSelector(useTypeChecker);

  const resultPanelRef = useRef<HTMLDivElement | null>(null);

  const correctWordCount = useMemo(
    () =>
      generatedWords.filter(
        (generatedWord) => generatedWord.status === WordStatus.CORRECT
      ).length,
    [generatedWords]
  );

  const incorrectWordCount = useMemo(
    () =>
      generatedWords.filter(
        (generatedWord) => generatedWord.status === WordStatus.WRONG
      ).length,
    [generatedWords]
  );

  const accuracy = (
    (correctWordCount / correctWordCount + incorrectWordCount) *
    (60 / 60) *
    100
  ).toFixed(2);

  const wpm = Math.round(keyStrokes.correct / 5 / (60 / 60));

  const takeScreenshot = () => {
    //TODO : Farkli bir div veya canvas ureterek screenshot olusturulabilir.

    if (resultPanelRef.current !== null) {
      html2canvas(resultPanelRef.current as HTMLElement).then(function (
        canvas
      ) {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL();

        // Open the data URL in a new window or tab
        const newWindow = window.open();
        if (newWindow !== null) {
          newWindow.document.write('<img src="' + dataURL + '"/>');
        }
      });
    }
  };

  return (
    <Box width={"250px"} mt={5} shadow={"lg"}>
      <Flex bg={"blue.200"} gap={5} color={"white"} p={2}>
        <Text as="b" style={{ textShadow: "2px 2px black" }}>
          Result
        </Text>
        <Text as="span" onClick={() => takeScreenshot()}>Screenshot</Text>
      </Flex>
      <Box bg={"white"} textAlign={"center"} ref={resultPanelRef}>
        <Box bg={"gray.100"} p={5}>
          <Heading as={"h1"} color={"green.700"}>
            {wpm} WPM
          </Heading>
          <Text fontSize={"xs"} color={"gray.400"}>
            (words per minute)
          </Text>
        </Box>

        <UnorderedList styleType={"none"} ms={0}>
          <ListItem p={"3"}>
            <Flex justifyContent={"space-between"}>
              <Text>Keystrokes</Text>
              <Flex gap={"3"}>
                <Box fontSize={"small"}>
                  (
                  <Text as={"span"} color={"green.400"}>
                    {keyStrokes.correct}
                  </Text>{" "}
                  |{" "}
                  <Text as={"span"} color={"red.400"}>
                    {keyStrokes.wrong}
                  </Text>
                  )
                </Box>
                <Text>{keyStrokes.total}</Text>
              </Flex>
            </Flex>
          </ListItem>
          <ListItem bg={"gray.100"} p={"3"}>
            <Flex justifyContent={"space-between"}>
              <Text>Accuracy</Text>
              <Text as={"b"}>{accuracy}%</Text>
            </Flex>
          </ListItem>
          <ListItem p={"3"}>
            <Flex justifyContent={"space-between"}>
              <Text>Correct words</Text>
              <Text as={"b"} color={"green.400"}>
                {correctWordCount}
              </Text>
            </Flex>
          </ListItem>
          <ListItem bg={"gray.100"} p={"3"}>
            <Flex justifyContent={"space-between"}>
              <Text>Wrong Words</Text>
              <Text as={"b"} color={"red.400"}>
                {incorrectWordCount}
              </Text>
            </Flex>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default ResultPanel;

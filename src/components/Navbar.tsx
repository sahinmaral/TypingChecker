import {
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import React from "react";

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <React.Fragment>
      <Box
        bg={useColorModeValue("blue.500", "blue.600")}
        p={"5"}
        borderBottom={"1px"}
        borderBottomColor={useColorModeValue("blue.400", "blue.500")}
      >
        <Flex justifyContent={"space-between"}>
          <Flex gap={"5"}>
            <Text as={"b"} fontSize={"2xl"}>
              Typing Test
            </Text>
            <Text mt={"1.5"}>Improve your Typing Speed</Text>
          </Flex>
          <Flex gap={"5"}>
            <Tooltip label="Contact me by Github">
              <a
                href="https://github.com/sahinmaral"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon size={"xl"} icon={faGithub} />
              </a>
            </Tooltip>
            <Tooltip label="Contact me by Linkedin">
              <a
                href="https://www.linkedin.com/in/your-linkedin-username"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon size={"xl"} icon={faLinkedin} />
              </a>
            </Tooltip>
          </Flex>
        </Flex>
      </Box>
      <Box bg={useColorModeValue("blue.500", "blue.600")} p={"5"}>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Navbar;

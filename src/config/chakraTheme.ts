import { extendTheme, useColorModeValue } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: useColorModeValue("blue.100","gray.900"),
      },
    }),
  },
  initialColorMode: "light",
  useSystemColorMode: false,
});

export default theme

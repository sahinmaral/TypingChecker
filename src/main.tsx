import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

import chakraTheme from "./config/chakraTheme.ts";
import theme from "./config/chakraTheme.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ChakraProvider theme={chakraTheme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </Provider>
);

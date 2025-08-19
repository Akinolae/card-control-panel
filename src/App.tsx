import Main from "./Routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistor } from "./services/appstore";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
});

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <AnimatePresence mode="wait" initial={true}>
              <Main />
            </AnimatePresence>
          </QueryClientProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

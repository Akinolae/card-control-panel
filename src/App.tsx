import Main from "./Routes";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Context from "./Context";

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
    <Context>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence mode="wait" initial={true}>
            <Main />
          </AnimatePresence>
        </QueryClientProvider>
      </ChakraProvider>
    </Context>
  );
}

export default App;

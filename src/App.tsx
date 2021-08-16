import * as React from "react";
import { ChakraProvider, Box, Text, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Text>Appliction</Text>
      </Grid>
    </Box>
  </ChakraProvider>
);

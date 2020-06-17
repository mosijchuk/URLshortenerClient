import React, {useState, useEffect, FC} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import {AuthContext, AuthType} from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { Message } from "./components/Message";
import { MessagesContext } from "./context/MessagesContext";
import { useWindowSize } from "./hooks/window.hook";
import { NavbarMobile } from "./components/NavbarMobile";
import io from "socket.io-client";
import {GlobalMessage} from "./types/types";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    success: {
      main: "#449f48",
      light: "#a8ceaa",
      dark: "rgb(7, 16, 7)",
    },
  },
});


const App: FC = () => {
  const { login, logout, token, userId, ready }:AuthType = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const { isMobile } = useWindowSize();


  const [globalMessage, setGlobalMessage] = useState<GlobalMessage>({
    text: '',
    severity: 'error'
  });

  useEffect(() => {
    const socket = io("http://localhost:4000");
    console.log("socket start");
    socket.on("connect", () => {
      console.log("Connection id", socket.id);
    });

    socket.on("test", (msg:string) => {
      console.log("Resieved", msg);
    });
  }, []);

  if (!ready) {
    return <Loader />;
  }

  const updateGlobalMessage = (text = "", severity:GlobalMessage["severity"] = "error") => {
    setGlobalMessage({
      text,
      severity,
    });
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router>
        <ThemeProvider theme={theme}>
          <MessagesContext.Provider
            value={{
              updateGlobalMessage,
            }}
          >
            <CssBaseline />
            {!isMobile && isAuthenticated && <Navbar />}
            <>{routes}</>
             <Message message={globalMessage} />
            {isMobile && isAuthenticated && <NavbarMobile />}
          </MessagesContext.Provider>
        </ThemeProvider>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

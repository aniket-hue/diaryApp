import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core";
import Header from "./Component/Header";
import theme from "./theme";
import { Route, Switch } from "react-router";
import AddNote from "./views/addNote";
import Dashboard from "./views/dashboard";
import { BrowserRouter } from "react-router-dom";

class Root extends Component {


  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/add-note" component={AddNote} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default Root;

import React, { Component } from "react";
import { Snackbar, ThemeProvider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Header from "./Component/Header";
import theme from "./theme";
import Dashboard from "./views/dashboard";

class Root extends Component {
  state = {
    msg: "",
    severity: "",
    showSnackbar: false,
  };

  handleSnackbar = (msg, severity) => {
    this.setState({ msg, severity, showSnackbar: true });
  };

  handleCloseSnackbar = () => {
    this.setState({ showSnackbar: false });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header />
        <Dashboard snackbar={this.handleSnackbar} />
        <Snackbar
          open={this.state.showSnackbar}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          style={{ zIndex: 20000 }}
        >
          <Alert
            variant="filled"
            onClose={this.handleCloseSnackbar}
            severity={this.state.severity}
          >
            {this.state.msg}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    );
  }
}

export default Root;

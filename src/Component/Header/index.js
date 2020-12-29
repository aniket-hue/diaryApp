import React, { Component } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import styles from "./header.styles";
import { withRouter } from "react-router";

class Header extends Component {
  handleTabChange = (e, newValue) => {
    this.props.history.push(newValue);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <AppBar
          elevation={0}
          style={{
            backgroundColor: "#fcfcfc",
            borderBottom: "2px solid #51af5b",
          }}
        >
          <Toolbar>
            <Typography style={styles.headerTitle} variant="h4">
              DPhi Diary
            </Typography>

            <div style={{ display: "flex", flexGrow: 1 }}></div>

            <Tabs
              value={this.props.history.location.pathname}
              onChange={this.handleTabChange}
              indicatorColor={"white"}
            >
              <Tab
                classes={{ selected: classes.selectedTab }}
                label="Your Notes"
                value="/"
              />
              <Tab
                classes={{ selected: classes.selectedTab }}
                label="Add Note"
                value="/add-note"
              />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </>
    );
  }
}

export default withRouter(withStyles(styles)(Header));

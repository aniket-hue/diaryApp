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

class Header extends Component {
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

            <Tabs value={"/"} indicatorColor={"#fff"}>
              <Tab
                classes={{ selected: classes.selectedTab }}
                label="Your Notes"
                value="/"
              />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </>
    );
  }
}

export default withStyles(styles)(Header);

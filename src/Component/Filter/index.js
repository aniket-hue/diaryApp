import React, { Component } from "react";
import { Select, MenuItem, withStyles } from "@material-ui/core";
import styles from "./fitler.styles";

class Filter extends Component {
  state = {
    monthFilter: null,
    yearFilter: null,
  };

  applyFilter = () => {
    this.props.applyFilter({ ...this.state });
  };

  clearFilter = () => {
    this.setState(
      {
        monthFilter: null,
        yearFilter: null,
      },
      () => this.props.applyFilter({ ...this.state })
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={styles.filterBox}>
        <Select
          value={this.state.monthFilter ? this.state.monthFilter : "all"}
          onChange={(e) => this.setState({ monthFilter: e.target.value })}
          classes={{root:classes.select}}
          inputProps={{
              
          }}
        >
          <MenuItem value="all" disabled>
            Select Month
          </MenuItem>
          {this.props.months.map((el) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>

        <span style={styles.verticalLine}></span>

        <Select
          value={this.state.yearFilter ? this.state.yearFilter : "all"}
          onChange={(e) => this.setState({ yearFilter: e.target.value })}
          classes={{root:classes.select}}
        >
          <MenuItem value="all" disabled>
            Select Year
          </MenuItem>
          {this.props.years.map((el) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>

        <span style={styles.verticalLine}></span>

        <span onClick={this.applyFilter} style={styles.filterBtn}>
          Apply
        </span>

        <span style={styles.verticalLine}></span>

        <span onClick={this.clearFilter} style={styles.filterBtn}>
          Clear
        </span>
      </div>
    );
  }
}

export default withStyles(styles)(Filter);

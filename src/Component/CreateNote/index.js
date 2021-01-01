import { Button, TextField, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./createNote.styles";
import { Close } from "@material-ui/icons";
class CreateNote extends Component {
  state = {
    title: "",
    description: "",
    date: "",
  };

  handleNoteData = () => {
    const data = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
    };
    this.props.handleCreate(data);
  };

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <div style={styles.modalHeader}>
          <Typography style={styles.headerLabel}>Create Note</Typography>
          <div style={{ display: "flex", flexGrow: 1 }}></div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => this.props.closeModal()}
          >
            <Close />
          </span>
        </div>
        <div style={styles.container}>
          <div style={styles.fieldsBlock}>
            <form>
              <TextField
                name="title"
                value={this.state.title}
                style={styles.textField}
                label="Title"
                fullWidth={true}
                variant="outlined"
                onChange={this.inputHandler}
              />
              <TextField
                name="description"
                value={this.state.description}
                style={styles.textField}
                label="Description"
                multiline={true}
                fullWidth={true}
                variant="outlined"
                rows={6}
                onChange={this.inputHandler}
              />
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.inputHandler}
                style={styles.dateInput}
                placeholder="Select Date"
              />
            </form>
          </div>
          <Button
            variant="contained"
            style={{ ...styles.createButt, backgroundColor: "black" }}
            onClick={this.handleNoteData}
          >
            Create
          </Button>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(CreateNote);

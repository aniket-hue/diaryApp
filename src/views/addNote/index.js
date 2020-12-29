import { Button, TextField, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./addNote.styles";
import firebase from "../../firebase";
import Spinner from "../../Component/Spinner";

class AddNote extends Component {
  state = {
    title: "",
    description: "",
    date: "",
    loading: false,
  };

  //   async componentDidMount() {
  //     const items = [];
  //     const data = await firebase
  //       .firestore()
  //       .collection("notes")
  //       .onSnapshot((q) => {
  //         q.forEach((el) => items.push(el.data()));
  //       });
  //     console.log(items);
  //   }

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postNote = async () => {
    const data = {
      ...this.state,
      date: new Date().toString(),
    };
    this.setState({ loading: true });
    await firebase.firestore().collection("notes").add({
      data,
    });
    this.setState({ loading: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div style={styles.container}>
            <div style={styles.addNoteBox}>
              <Typography variant="h2">Add Note</Typography>
              <div style={styles.fieldsBlock}>
                <TextField
                  name="title"
                  style={styles.textField}
                  label="Title"
                  fullWidth={true}
                  variant="outlined"
                  onBlur={this.inputHandler}
                />
                <TextField
                  name="description"
                  style={styles.textField}
                  label="Description"
                  multiline={true}
                  fullWidth={true}
                  variant="outlined"
                  rows={6}
                  onBlur={this.inputHandler}
                />
              </div>
              <Button onClick={this.postNote} variant="outlined">
                Submit
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default withStyles(styles)(AddNote);

import React, { Component } from "react";
import { Button, TextField, withStyles } from "@material-ui/core";
import styles from "./editNote.styles";
import firebase from "../../firebase";

class EditNote extends Component {
  state = {
    title: "",
    description: "",
    id: "",
    date: "",
  };

  componentDidMount() {
    this.fetchNote();
  }

  componentDidUpdate(prevProps) {
    if (this.props.note !== prevProps.note) {
      this.fetchNote();
    }
  }

  fetchNote = () => {
    const { note } = this.props;
    this.setState({
      title: note.title,
      description: note.description,
      id: note.id,
      date: note.date,
    });
  };

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEdit = async () => {
    const data = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
    };

    await firebase
      .firestore()
      .collection("notes")
      .doc(this.state.id)
      .update({ data });

    this.props.snackbar("Note edited successfully", "success");
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.fieldsBlock}>
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
        </div>
        <Button variant="contained" onClick={this.handleEdit}>
          Edit
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(EditNote);

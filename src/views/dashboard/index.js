import { Button, SwipeableDrawer, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import NotesTable from "../../Component/NotesTable";
import Spinner from "../../Component/Spinner";
import firebase from "../../firebase";
import styles from "./dashboard.styles";
import { Add } from "@material-ui/icons";
import CreateNote from "../../Component/CreateNote";

class Dashboard extends Component {
  state = {
    notes: [],
    allNotes: [],
    loading: true,
    createNoteModal: false,
  };

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = async () => {
    const data = await firebase
      .firestore()
      .collection("notes")
      .onSnapshot((q) => {
        const items = [];
        q.forEach((el) => {
          items.push({ ...el.data().data, id: el.id });
        });
        this.setState({ allNotes: items, notes: items, loading: false });
      });
  };

  handleCreate = async (data) => {
    await firebase.firestore().collection("notes").add({ data });
    this.setState({ createNoteModal: false });
  };

  render() {
    const { classes } = this.props;
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div style={{ padding: 70 }}>
        <div style={{ marginBottom: 20 }}>
          <Button
            style={{ ...styles.createButt, backgroundColor: "#7f7fff" }}
            startIcon={<Add />}
            variant="contained"
            onClick={() => this.setState({ createNoteModal: true })}
          >
            Create Note
          </Button>
        </div>
        <NotesTable notes={this.state.notes} snackbar={this.props.snackbar} />
        <SwipeableDrawer
          anchor="top"
          onClose={() =>
            this.setState({
              createNoteModal: !this.state.createNoteModal,
            })
          }
          open={this.state.createNoteModal}
          classes={{ paper: classes.modal }}
        >
          <CreateNote
            handleCreate={(data) => this.handleCreate(data)}
            closeModal={() => this.setState({ createNoteModal: false })}
          />
        </SwipeableDrawer>
      </div>
    );
  }
}
export default withStyles(styles)(Dashboard);

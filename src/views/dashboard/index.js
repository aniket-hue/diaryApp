import { Button, SwipeableDrawer, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import NotesTable from "../../Component/NotesTable";
import Spinner from "../../Component/Spinner";
import firebase from "../../firebase";
import styles from "./dashboard.styles";
import { Add } from "@material-ui/icons";
import CreateNote from "../../Component/CreateNote";
import moment from "moment";
class Dashboard extends Component {
  state = {
    notes: [],
    allNotes: [],
    loading: true,
    createNoteModal: false,
    startDate: "",
    endDate: "",
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

  onDateChangeHandle = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.startDate !== "" && this.state.endDate !== "") {
        this.setFilter();
      }
    });
  };

  setFilter = () => {
    let { startDate, endDate, allNotes } = this.state;

    if (moment(startDate).isAfter(endDate))
      this.props.snackbar("Start Date should be smaller!", "error");
    else {
      allNotes = allNotes.filter(
        (el) =>
          moment(startDate).isSameOrBefore(el.date, "day") &&
          moment(endDate).isSameOrAfter(el.date, "day")
      );
      this.setState({ notes: allNotes, startDate, endDate });
    }
  };

  render() {
    const { classes } = this.props;
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div style={{ padding: 70 }}>
        <div style={{ marginBottom: 20 }}>
          <Button
            style={{
              ...styles.createButt,
              backgroundColor: "#7f7fff",
            }}
            startIcon={<Add />}
            variant="contained"
            onClick={() => this.setState({ createNoteModal: true })}
          >
            Create Note
          </Button>
          <div style={styles.filterBox}>
            <span style={styles.dateLabel}>Start Date:</span>{" "}
            <input
              style={styles.dateBox}
              type="date"
              name="startDate"
              value={this.state.startDate}
              onChange={this.onDateChangeHandle}
            />
            <span style={styles.verticalLine}></span>
            <span style={styles.dateLabel}> End Date:</span>{" "}
            <input
              style={styles.dateBox}
              value={this.state.endDate}
              type="date"
              name="endDate"
              onChange={this.onDateChangeHandle}
            />
            <span
              onClick={() =>
                this.setState({
                  startDate: "",
                  endDate: "",
                  notes: this.state.allNotes,
                })
              }
              style={{
                marginLeft: 10,
                fontFamily: "Montserrat",
                cursor: "pointer",
              }}
            >
              Clear
            </span>
          </div>
        </div>
        <NotesTable notes={this.state.notes} snackbar={this.props.snackbar} />
        <SwipeableDrawer
          anchor="top"
          onOpen={() => {
            this.setState({
              createNoteModal: true,
            });
          }}
          onClose={() =>
            this.setState({
              createNoteModal: false,
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

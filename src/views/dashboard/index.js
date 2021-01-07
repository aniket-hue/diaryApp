import { Button, SwipeableDrawer, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import NotesTable from "../../Component/NotesTable";
import Spinner from "../../Component/Spinner";
import firebase from "../../firebase";
import styles from "./dashboard.styles";
import { Add } from "@material-ui/icons";
import CreateNote from "../../Component/CreateNote";
import Filter from "../../Component/Filter";
import moment from "moment";

class Dashboard extends Component {
  state = {
    notes: [],
    allNotes: [],
    loading: true,
    createNoteModal: false,
    months: [],
    years: [],
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

        let years = new Set(),
          months = new Set();

        q.forEach((el) => {
          items.push({ ...el.data().data, id: el.id });

          let date = el.data().data.date.split("-");

          years.add(date[0]);

          months.add(
            moment(date)
              .month(moment(date).month() - 1)
              .format("MMMM")
          );
        });

        this.setState({
          allNotes: items,
          notes: items,
          loading: false,
          years: [...years],
          months: [...months],
        });
      });
  };

  setFilter = (filter) => {
    if (!filter.yearFilter && !filter.monthFilter)
      this.setState({ notes: this.state.allNotes });
    else {
      let { allNotes } = this.state;

      if (filter.monthFilter) {
        allNotes = allNotes.filter(({ date }) => {
          return (
            moment(date).month(moment(date).month()).format("MMMM") ===
            filter.monthFilter
          );
        });
      }

      if (filter.yearFilter) {
        allNotes = allNotes.filter(({ date }) => {
          date = date.split("-")[0];
          return date === filter.yearFilter;
        });
      }

      this.setState({ notes: allNotes });
    }
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
            style={{
              ...styles.createButt,
              backgroundColor: "#7f7fff",
            }}
            startIcon={<Add />}
            variant="contained"
            onClick={() => this.setState({ createNoteModal: true })}
            // onClick={()=>this.sentryButton()}
          >
            Create Note
          </Button>

          <Filter
            applyFilter={(data) => this.setFilter(data)}
            months={this.state.months}
            years={this.state.years}
          />
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

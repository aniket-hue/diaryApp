import React, { Component } from "react";
import NotesTable from "../../Component/notesTable";
import Spinner from "../../Component/Spinner";
import firebase from "../../firebase";
class Dashboard extends Component {
  state = {
    notes: [],
    allNotes: [],
    loading: true,
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
  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div style={{ padding: 70 }}>
        <NotesTable notes={this.state.notes} snackbar={this.props.snackbar} />
      </div>
    );
  }
}
export default Dashboard;

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Paper,
  withStyles,
  Collapse,
  TableSortLabel,
} from "@material-ui/core";
import React, { Component } from "react";
import styles from "./notesTable.styles";
import moment from "moment";
import EditNote from "../../Component/editNote";
import firebase from "../../firebase";
import { Edit, Delete } from "@material-ui/icons";

class NotesTable extends Component {
  state = {
    order: "asc",
    orderBy: "title",
    maxAnomalies: 0,
    editMode: {},
  };

  componentDidMount() {
    let editMode = {};
    this.props.notes.forEach((el) => {
      editMode = {
        ...editMode,
        [el.id]: false,
      };
    });
    this.setState({ editMode });
  }

  getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => this.descendingComparator(a, b, orderBy, order)
      : (a, b) => -this.descendingComparator(a, b, orderBy, order);
  };

  handleSortRequest = (cellId) => {
    const isAsc = this.state.order === "asc" && this.state.orderBy === cellId;
    this.setState({ order: isAsc ? "desc" : "asc", orderBy: cellId });
  };

  descendingComparator = (a, b, orderBy, order) => {
    if (!b[orderBy] || b[orderBy] < a[orderBy]) {
      return -1;
    } else if (!a[orderBy] || b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  handleDeleteNote = async (id) => {
    await firebase.firestore().collection("notes").doc(id).delete();
    this.props.snackbar("Note deleted successfully", "success");
  };

  render() {
    const { classes } = this.props;
    return (
      <TableContainer
        classes={{ root: classes.tableContainer }}
        component={Paper}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={this.state.orderBy === "title"}
                  direction={
                    this.state.orderBy === "title" ? this.state.order : "asc"
                  }
                  onClick={() => this.handleSortRequest("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={this.state.orderBy === "description"}
                  direction={
                    this.state.orderBy === "description"
                      ? this.state.order
                      : "asc"
                  }
                  onClick={() => this.handleSortRequest("description")}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={this.state.orderBy === "date"}
                  direction={
                    this.state.orderBy === "date" ? this.state.order : "asc"
                  }
                  onClick={() => this.handleSortRequest("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.stableSort(
              this.props.notes,
              this.getComparator(this.state.order, this.state.orderBy)
            ).map((data) => {
              return (
                <>
                  <TableRow hover key={data.id}>
                    <TableCell>{data.title}</TableCell>
                    <TableCell
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {data.description}
                    </TableCell>
                    <TableCell>
                      {moment(data.date).format("MMMM Do YYYY")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ ...styles.editDelButt, background: "#4caf50" }}
                        startIcon={<Edit />}
                        onClick={() =>
                          this.setState({
                            editMode: {
                              ...this.state.editMode,
                              [data.id]: !this.state.editMode[data.id],
                            },
                          })
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        startIcon={<Delete />}
                        style={{ ...styles.editDelButt, background: "#f44336" }}
                        onClick={() => this.handleDeleteNote(data.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} style={{ padding: 0 }}>
                      <Collapse in={this.state.editMode[data.id]}>
                        <EditNote note={data} snackbar={this.props.snackbar} />
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(styles)(NotesTable);

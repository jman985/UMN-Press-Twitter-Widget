import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import CSVReader from "../CsvParser/CsvParser";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { spacing } from "@material-ui/system";

const styles = (theme) => ({
  root: {
    width: "80%",
    //marginLeft: theme.spacing.unit * 3,
    margin: "100px auto",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  row: {
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.background.default,
      backgroundColor: "#f5f2ef",
    },
  },
  Btn: {
    margin: "40px 30px 50px 50px",
  },
});

class UserPage extends Component {

  acceptCsv = () => {
    this.props.dispatch({
      type: "SEND_CSV_TO_DB",
      payload: this.props.csv.data,
    });
    this.props.history.push("/publications");
  };

  render() {
    const { classes } = this.props;
    const CustomTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    return (
      <div>
        <div style={{ marginLeft: "30px", marginTop: "25px" }}>
          <h2
            style={{ display: "inline-block", fontWeight: "100" }}
            id="welcome"
          >
            Welcome, {this.props.user.username}! Upload a Csv file.
          </h2>
          <CSVReader />
        </div>

        {this.props.csv.loaded ? (
          <>
            <div></div>
            <Paper className={classes.root}>
              <label htmlFor="outlined-button-file">
                <Button
                  onClick={this.acceptCsv}
                  variant="outlined"
                  component="span"
                  className={classes.Btn}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  component="span"
                  className={classes.Btn}
                >
                  Reject
                </Button>
              </label>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Title</CustomTableCell>
                    <CustomTableCell>Subtitle</CustomTableCell>
                    <CustomTableCell>Author</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.csv.data.map((book) => (
                    <TableRow className={classes.row} key={book.data.id}>
                      <TableCell className={classes.titleLink} align="left">
                        {book.data.title}
                      </TableCell>
                      <TableCell align="left">{book.data.subtitle}</TableCell>
                      <TableCell align="left">{book.data.author}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </>
        ) : null}
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  csv: state.csvReducer,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(UserPage));

//  <div
//             style={{
//               width: "80%",
//               border: "1px solid black",
//               margin: "50px auto",
//               padding: "20px",
//             }}
//           >
//             <button onClick={this.acceptCsv}>Looks good!</button>
//             <table>
//               <thead>
//                 <th>Title</th>
//                 <th>Subtitle</th>
//                 <th>Author</th>
//               </thead>

//               <tbody>
//                 {this.props.csv.data.map((book, index) => (
//                   <tr id={index}>
//                     <td>{book.data.title}</td>
//                     <td>{book.data.subtitle}</td>
//                     <td>{book.data.author}</td>
//                     <td>

//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

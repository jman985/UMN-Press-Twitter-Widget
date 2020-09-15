import React, { Component } from "react";
import { connect } from "react-redux";
import CSVReader from "../CsvParser/CsvParser";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import PublicationTable from "../PublicationTable/PublicationTable";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

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
      <Box textAlign="center" display='flex' flexDirection='column' alignItems="center">
        <Paper display='flex' justifyContent="center" style={{maxWidth:'50%', minWidth: '30%', padding: "30px", marginTop: "25px" }}>
          <Typography variant='h5'
            style={{ display: "inline-block", fontWeight: "100" }}
            id="welcome">
            Welcome, {this.props.user.username}! 
          </Typography>
          <Typography variant='h6'>
              Upload a CSV File
          </Typography>
          <CSVReader />
        {this.props.csv.loaded ? (
          <>
            
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

            
          </>
        ) : null}
        </Paper>

        {this.props.csv.loaded ? 
        <PublicationTable />
        : null}

      </Box>
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

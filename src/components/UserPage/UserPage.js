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
    margin: "100px auto",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  row: {
    "&:nth-of-type(odd)": {
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

const mapStateToProps = (state) => ({
  user: state.user,
  csv: state.csvReducer,
});


export default withStyles(styles)(connect(mapStateToProps)(UserPage));
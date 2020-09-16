import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InclusionToggle from "../Publications/InclusionToggle";
import Button from "@material-ui/core/Button";
import { spacing } from "@material-ui/system";
import IconButton from '@material-ui/core/IconButton';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import './PublicationTable2.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = (theme) => ({
  root: {
    width: "80%",
    margin: "40px auto",
    overflowX: "auto",
    paddingTop:'0px',
    paddingBottom:'0px !important',
  },
  table: {
    minWidth: 700,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f2ef",
    },
  },
  title: {
    color: "black",
    "&:hover": {
      color: "#a39d9d",
      cursor: "pointer",
    },
  },
  Btn: {
    margin: "40px 30px 50px 50px",
  },
});

class PublicationTable2 extends Component {

  state = {
    pageStart: 0,
    update: 0
  }

  componentDidUpdate(prevProps){
    if (this.props.publication !== prevProps.publication){
      this.setState({update: this.state.update + 1})
    }
  }


  // calculates what time the last search was
  determineLastSearch = (sqlDate) => {
      let readableTime = new Date(sqlDate)
      let date = readableTime.toLocaleDateString()
      let time = readableTime.toLocaleTimeString()
    return date + ' at ' + time;
  }


  // goes forward/backward to the next 100 publications when the forward/backward buttons are pressed 
  handlePageChange = (direction) => {
    if (direction === 'forward') {
      this.setState({pageStart: this.state.pageStart + 100})
    }
    else if (direction === 'backward' && this.state.pageStart > 0) {
      this.setState({pageStart: this.state.pageStart - 100})
    }
  }

  // counts the number of undecided tweets for display on the publications table
  tweetCount = (bookId) =>{
    let relatedTweets = this.props.dbTweets.filter(function (filteredTweets) {
      return Number(filteredTweets.publication_id) === Number(bookId)});
    let undecidedTweets = relatedTweets.filter(function (filteredTweets) {
      return (filteredTweets.approved) === null});
    return undecidedTweets.length;
  }


  // changes the type of search for the publication on the same row as the selector
  handleSearchTypeChange = (bookId, searchType) => {
    this.props.dispatch({type: 'CHANGE_SEARCH_TYPE', payload: {id: bookId, searchType: searchType}})
  }


  // checks the search type of each book so the select menus can reflect their current value
  getSearchType = (bookId) => {
    let book = this.props.publication.filter(function (book) {
      return book.id === bookId})
    return book[0].search_type
  }


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
      <>
          <Paper className={classes.root}>
            <IconButton onClick={()=>this.handlePageChange('backward')}><FastRewindIcon/></IconButton>
            <IconButton onClick={()=>this.handlePageChange('forward')}><FastForwardIcon/></IconButton>
            <Table className={classes.table}>
              <TableHead>
                <TableRow className={classes.row}>
                  <CustomTableCell>Title</CustomTableCell>
                  <CustomTableCell>Subtitle</CustomTableCell>
                  <CustomTableCell>Author</CustomTableCell>
                  <CustomTableCell>Last Searched</CustomTableCell>
                  <CustomTableCell>Undecided Tweets</CustomTableCell>
                  <CustomTableCell>Search Type</CustomTableCell>
                  <CustomTableCell>Include/Exclude</CustomTableCell>
                </TableRow>
              </TableHead>

              <TableBody key={this.state.update}>
                {this.props.publication.slice(this.state.pageStart,this.state.pageStart+100).map((book) => (
                  <TableRow className={classes.row} key={book.id}>
                    <TableCell
                      className={classes.title}
                      onClick={() => {
                        this.props.history.push(`publications/${book.id}`);
                      }}
                    >
                      {book.title}
                    </TableCell>
                   
                    <TableCell align="left">{book.subtitle}</TableCell>
                    
                    <TableCell align="left">{book.author1}</TableCell>
                    
                    <TableCell align="left">
                      {book.last_searched == null
                        ? "Never"
                        : this.determineLastSearch(book.last_searched)}
                    </TableCell>
                    
                    <TableCell align="left">
                      {this.tweetCount(book.id) === 0
                        ? 'None'
                        : this.tweetCount(book.id)}
                    </TableCell>
                    
                    <TableCell align="left">
                      <FormControl >
                        <Select
                          className='select'
                          defaultValue={()=>this.getSearchType(book.id)}
                          onChange={(event)=>this.handleSearchTypeChange(book.id, event.target.value)}
                        >
                          <MenuItem value={'T'}>Title</MenuItem>
                          <MenuItem value={'TaA'}>Title AND Author</MenuItem>
                          <MenuItem value={'TaS'}>Title AND Subtitle</MenuItem>
                          <MenuItem value={'ToS'}>Title OR Subtitle</MenuItem>
                          <MenuItem value={'S'}>Subtitle</MenuItem>
                          <MenuItem value={'SaA'}>Subtitle AND Author</MenuItem>
                          <MenuItem value={'TaAoS'}>Title AND Author OR Subtitle</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    
                    <TableCell>
                      <InclusionToggle
                        publicationId={book.id}
                        include={book.include}
                      />
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <IconButton onClick={()=>this.handlePageChange('backward')}><FastRewindIcon/></IconButton>
            <IconButton onClick={()=>this.handlePageChange('forward')}><FastForwardIcon/></IconButton>
          </Paper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  publication: state.publication,
  dbTweets: state.dbTweets
});


export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(PublicationTable2))
);

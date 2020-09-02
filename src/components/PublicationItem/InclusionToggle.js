import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  toggleContainer: {
    height: 56,
    width: 56,
    padding: `${theme.spacing.unit*2}px ${theme.spacing.unit * 3}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `auto`,
  },
});

class ToggleButtons extends React.Component {
  state = {
    include: this.props.include,
  };

//  componentDidMount() {
    // this.props.dispatch({type:'GET_BOOKMARKS', payload: this.props.user.id})
    // check if the user has this page bookmarked and toggle the bookmark state if so.
    // await this.props.dispatch({type:'GET_BOOKMARKS', payload: this.state.userId})
    // console.log('these are the bookmarks on componenetDidMount',this.props.bookmarks, this.props.location.pathname)
  //   this.props.publication.map((book)=>{
  //     if (!book.include){
  //       this.setState({include: false});
  //     } 
  //   })
  // }
  

  handleInclusionToggle = (event, include) => {
    this.setState({ include });
    this.props.dispatch({type:'PUBLICATION_TOGGLE_INCLUSION', payload: this.props.publicationId});
  };


  render() {
    if (this.props.publication.map === undefined) return null;
    const { classes } = this.props;
    return (
        <>
            <ToggleButtonGroup value={this.state.include} exclusive >
              {this.state.include ? 
              <ToggleButton className={classes.toggleContainer} selected={true} value={false} onClick={this.handleInclusionToggle}>
                <StarIcon/>
              </ToggleButton>
              :
              <ToggleButton className={classes.toggleContainer} selected={false} value={true} onClick={this.handleInclusionToggle}>
                <StarBorderIcon />
              </ToggleButton>}
            </ToggleButtonGroup>

          {/* {JSON.stringify(this.props.bookmarks)}
          {JSON.stringify(this.state)} */}
          {/* <Typography variant="caption" gutterBottom>
            Bookmark Button
          </Typography> */}
        </>
    );
  }
}

ToggleButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  publication: state.publication,
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(ToggleButtons)));

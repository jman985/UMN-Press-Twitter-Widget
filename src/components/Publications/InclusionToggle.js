import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
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
                <CheckBoxIcon/>
              </ToggleButton>
              :
              <ToggleButton className={classes.toggleContainer} selected={false} value={true} onClick={this.handleInclusionToggle}>
                <CheckBoxOutlineBlankIcon />
              </ToggleButton>}
            </ToggleButtonGroup>
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

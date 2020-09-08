import React, { Component } from "react";
import { connect } from "react-redux";
import InclusionToggle from "./InclusionToggle";
import PublicationTable from "../PublicationTable/PublicationTable";

class Publications extends Component {

  componentDidMount = () => {
      this.props.dispatch({type: 'FETCH_PUBLICATIONS'})
  }
  
  handleClick = () => {
    this.props.dispatch({
      type: "FETCH_TWEETS",
      payload: this.props.publication,
    });
    this.props.dispatch({ type: "UPDATE_TIMESTAMP" });
  };

  render() {
    if (this.props.publication.map === undefined) return null;
    return (
      <>
        <PublicationTable />

        <button onClick={this.handleClick}>Search</button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  publication: state.publication,
});

export default connect(mapStateToProps)(Publications);

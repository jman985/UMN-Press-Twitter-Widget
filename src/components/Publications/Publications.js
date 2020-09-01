import React, { Component } from 'react';
import {connect} from 'react-redux';


class Publications extends Component {

  // componentDidMount() {
  //   this.props.dispatch({type:'GET_RECENT_BILLS'});
  // }

  // handleBillClick = (id) => {
  //   this.props.history.push('/Bills/' + id)
  // }

  handleClick = () => {
      this.props.dispatch({type: 'FETCH_TWEETS', payload: this.props.publication});
  }

  render() {
    if (this.props.publication.map === undefined) return null;
    return(
      <>
        <table>
          <thead>
              <tr>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Author</th>
                <th>Include/Exclude</th>
              </tr>
          </thead>
          {/* {JSON.stringify(this.props.publication)} */}
          <tbody>
            {this.props.publication.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.subtitle}</td>
                <td>{book.author1}</td>
                <td>
                    <select name="include" id="include">
                    <option value="true">Include</option>
                    <option value="false">Exclude</option>
                    </select> 
                </td>
              </tr>
              )
            )}
          </tbody>
        </table>
        <button onClick={this.handleClick}>
            Search
        </button>
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  publication: state.publication,
});


export default connect(mapStateToProps)(Publications);
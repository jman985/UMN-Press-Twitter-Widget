import React, { Component } from 'react';
import {connect} from 'react-redux';


class Publications extends Component {

  // componentDidMount() {
  //   this.props.dispatch({type:'GET_RECENT_BILLS'});
  // }

  // handleBillClick = (id) => {
  //   this.props.history.push('/Bills/' + id)
  // }

  render() {
    if (this.props.publication.map === undefined) return null;
    return(
      <>
        <table>
          <thead>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Author</th>
          </thead>
          {/* {JSON.stringify(this.props.publication)} */}
          <tbody>
            {this.props.publication.map((book, index) => (
              <tr id={index}>
                <td>{book.title}</td>
                <td>{book.subtitle}</td>
                <td>{book.author1}</td>
              </tr>
              )
            )}
          </tbody>
        </table>
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  publication: state.publication,
});


export default connect(mapStateToProps)(Publications);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import InclusionToggle from './InclusionToggle'


class Publications extends Component {

  handleClick = () => {
      this.props.dispatch({type: 'FETCH_TWEETS', payload: this.props.publication});
      this.props.dispatch({type: 'UPDATE_TIMESTAMP'});

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
          <tbody>
            {this.props.publication.map((book, index) => (
              <tr key={index}>
                <td className="book-select" onClick={()=>{this.props.history.push(`publications/${book.id}`)}}>{book.title}</td>
                <td>{book.subtitle}</td>
                <td>{book.author1}</td>
                <td><InclusionToggle publicationId={book.id} include={book.include}/></td>
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
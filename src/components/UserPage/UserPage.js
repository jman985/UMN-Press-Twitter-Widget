import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import CSVReader from "../CsvParser/CsvParser";

class UserPage extends Component {

  acceptCsv = () => {
    this.props.dispatch({
      type: "SEND_CSV_TO_DB",
      payload: this.props.csv.data,
    });
    this.props.history.push("/publications");
  };

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        <p>Your ID is: {this.props.user.id}</p>
        <LogOutButton className="log-in" />
        <CSVReader />

        {this.props.csv.loaded ? (
          <div
            style={{
              width: "80%",
              border: "1px solid black",
              margin: "50px auto",
              padding: "20px",
            }}
          >
            <button onClick={this.acceptCsv}>Looks good!</button>
            <table>
              <thead>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Author</th>
              </thead>

              <tbody>
                {this.props.csv.data.map((book, index) => (
                  <tr id={index}>
                    <td>{book.data.title}</td>
                    <td>{book.data.subtitle}</td>
                    <td>{book.data.author}</td>
                    <td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
export default connect(mapStateToProps)(UserPage);

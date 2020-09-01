import React, { Component } from "react";
import { CSVReader } from "react-papaparse";
import { connect } from "react-redux";
const buttonRef = React.createRef();

class CsvParser extends Component {
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleCsvLoad = (data) => {
    console.log("---------------------------");
    console.log("poopooooop", data);

    this.props.dispatch({
      type: "LOAD_CSV_INTO_STORE",
      payload: data,
    });
    console.log("---------------------------");
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  render() {
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleCsvLoad}
          onError={this.handleOnError}
          config={{ header: true }}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                width: "60%",
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
                marginTop: "100px",
                marginLeft: "10%",
              }}
            >
              <button
                type="button"
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: "15px",
                  marginLeft: 0,
                  marginRight: 0,
                  width: "20%",
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                Browe file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  height: 55,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: "60%",
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: "15px",
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(CsvParser);

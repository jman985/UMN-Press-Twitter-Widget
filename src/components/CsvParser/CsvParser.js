import React, { Component } from "react";
import { CSVReader } from "react-papaparse";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
const buttonRef = React.createRef();

class CsvParser extends Component {
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleCsvLoad = (data) => {
    this.props.dispatch({
      type: "LOAD_CSV_INTO_STORE",
      payload: data,
    });
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    // console.log(data);
  };

  render() {
    const { classes } = this.props;
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
                width: "100%",
                justifyContent: "center",
                display: "inline-block",
                flexDirection: "row",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            >

              <Button
                variant="outlined"
                type="button"
                onClick={this.handleOpenDialog}
              >
                Preview CSV file
              </Button>

              {/* <div
                style={{
                  borderWidth: 0.5,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  height: 55,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: "50px",
                  paddingTop: 3,
                  width: "30%",
                  height: "45px",
                }}
              >
                {file && file.name}
              </div> */}
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

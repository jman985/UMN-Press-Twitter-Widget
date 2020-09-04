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
                marginLeft: "3%",
              }}
            >
              {/* <Button
                variant="outlined"
                component="span"
                className={classes.button}
              >
                Upload
              </Button> */}
              <button
                type="button"
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: "15px",
                  border: ".5px solid black",
                  marginLeft: 0,
                  marginRight: 25,
                  width: "18%",
                  height: "50px",
                  paddingLeft: 0,
                  paddingRight: 0,
                  backgroundColor: "#EEF5F5",

                  fontSize: "16px",
                }}
              >

                View Csv file
      
              </button>

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

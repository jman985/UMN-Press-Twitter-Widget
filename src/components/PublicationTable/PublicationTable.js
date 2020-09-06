import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";
//Column, SortDirection, Table are regualr Componets from react-virtualized...///AutoSizer is a Higher Order Component HOC which takes a reg Component and
//spits out a new one.

import { connect, useSelector, useDispatch } from "react-redux";

const styles = (theme) => ({
  table: {
    fontFamily: theme.typography.fontFamily,
    // fontFamily: "",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
  poop: {
    fontFamily: "monospace",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;
    {
      console.log("fartFART", onRowClick);
    }
    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    console.log("in cellRender", cellData);
    const { columns, classes, rowHeight, onRowClick } = this.props;
    console.log("POOOOOPPPSSSS", onRowClick);
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: "asc",
      [SortDirection.DESC]: "desc",
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel
          active={dataKey === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    console.log("POOP PROPS", this.props);

    return (
      <TableCell
        component="div"
        className={classNames(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    // const dispatch = useDispatch();
    // const csv = useSelector((state) => state.csv.data);
    const { publication } = this.props;
    console.log("Publication data RENDEr", publication);
    const { classes, columns, ...tableProps } = this.props;
    console.log("redux", this.props);
    return (
      //AutoSizer will pass the function height and width values which then are  passed into the Table componenet

      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(
              (
                { cellContentRenderer = null, className, dataKey, ...other },
                index
              ) => {
                let renderer;
                if (cellContentRenderer != null) {
                  renderer = (cellRendererProps) =>
                    this.cellRenderer({
                      cellData: cellContentRenderer(cellRendererProps),
                      columnIndex: index,
                    });
                } else {
                  renderer = this.cellRenderer;
                }

                return (
                  <Column
                    key={dataKey}
                    headerRenderer={(headerProps) =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index,
                      })
                    }
                    className={classNames(classes.flexContainer, className)}
                    cellRenderer={renderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              }
            )}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

// const mapStateToProps = (state) => {
//   return {
//     publication: state.publication,
//   };
// };
const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// const rows = data;

// const data = [
//   ["Author name1", "there is a subttle", "paul boberg"],
//   ["Another author", 237, 9.0, 37, 4.3],
//   ["poop", 262, 16.0, 24, 6.0],
//   ["Cupcake", 305, 3.7, 67, 4.3],
//   ["Gingerbread", 356, 16.0, 49, 3.9],
// ];

// let id = 0;
// function createData(poop, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, poop, calories, fat, carbs, protein };
// }

// const rows = [];

// const csvData = (props) => {
//   const data = props.publications;
//   for (let i = 0; i < data.length; i += 1) {
//     rows.push("poop");
//   }
// };

// for (let i = 0; i < 100; i += 1) {
//   const randomSelection = data[Math.floor(Math.random() * data.length)];
//   rows.push(createData(...randomSelection));
// }

function PublicationTable(props) {
  const rows = props.publication;
  console.log("gjgjgjg", rows.length);
  return (
    <Paper style={{ height: 500, width: "80%", margin: "50px auto" }}>
      <WrappedVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={(event) => {
          //alert(event.rowData.id);
          props.history.push(`publications/${event.rowData.id}`);
        }}
        columns={[
          {
            width: 200,
            flexGrow: 1.0,
            label: "Title",
            dataKey: "title",
          },
          {
            width: 200,
            label: "Subtitle",
            dataKey: "subtitle",
            numeric: true,
          },
          {
            width: 180,
            label: "Author",
            dataKey: "author1",
            numeric: true,
          },
          {
            width: 180,
            label: "Last Searched",
            dataKey: "last_searched",
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  publication: state.publication,
});
export default withRouter(connect(mapStateToProps)(PublicationTable));

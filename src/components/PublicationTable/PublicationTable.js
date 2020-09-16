import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";
import InclusionToggle from "../PublicationItem/InclusionToggle";
//Column, SortDirection, Table are regualr Componets from react-virtualized...///AutoSizer is a Higher Order Component HOC which takes a reg Component and
//spits out a new one.

import { connect, useSelector, useDispatch } from "react-redux";

const styles = (theme) => ({
  table: {
    fontFamily: theme.typography.fontFamily,
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
  toggleCell: {
    justifyContent: "center",
  },
  noClick: {
    cursor: "initial",
  },
});

class MuiVirtualizedTable extends React.PureComponent {

  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;
    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };


  cellRenderer = ({ cellData, columnIndex = null, rowIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight,flexDirection:'row' }}
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

    return (
      //Material Ui component
      <TableCell
        component="div"
        className={classNames(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight, flexDirection:'row' }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
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
                {
                  cellContentRenderer = null,
                  className,
                  dataKey,
                  data,

                  ...other
                },
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

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

function PublicationTable(props) {
  const rows = props.csv.data;

  return (
    <Paper style={{ height: 500, width: "80%", margin: "50px auto" }}>
      <WrappedVirtualizedTable
        PublicationData={rows}
        rowCount={rows.length}
        rowGetter={({ index }) => {
          return rows[index].data;
        }}
        onRowClick={(event) => {
        }}
        columns={[
          {
            width: 200,
            flexGrow: 1.0,
            label: "Title",
            dataKey: "title",
          },
          {
            width: 400,
            label: "Subtitle",
            dataKey: "subtitle",
            numeric: true,
          },
          {
            width: 180,
            label: "Author",
            dataKey: "author",
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  publication: state.publication,
  csv: state.csvReducer,
});
export default withRouter(connect(mapStateToProps)(PublicationTable));

import React, { Component } from "react";
import Like from "./like";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} setLike={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger"
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { moviesAll, sortColumn, onSort } = this.props;
    return (
      <table className="table table-dark">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={moviesAll} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;

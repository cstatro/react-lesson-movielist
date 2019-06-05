import React, { Component } from "react";
import "../App.css";
import Like from "./like";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./paginator";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MenuFilter from "./menuFilter";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Rentals extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    currentGenre: "all",
    sortColumn: { path: "title", order: "asc" }
  };
  render() {
    console.log(this.state.currentGenre);
    const {
      pageSize,
      currentPage,
      movies: moviePreFilter,
      currentGenre
    } = this.state;
    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database</p>;
    } else {
      const filtered =
        currentGenre === "all"
          ? moviePreFilter
          : moviePreFilter.filter(movie => movie.genre.name === currentGenre);

      const sorted = _.orderBy(
        filtered,
        [this.state.sortColumn.path],
        [this.state.sortColumn.order]
      );

      const moviesAll = paginate(sorted, currentPage, pageSize);
      return (
        <div className="row">
          <div className="col-2">
            <MenuFilter
              updateGenre={this.handleGenreUpdate}
              genres={this.state.genres}
              currentGenre={this.state.currentGenre}
            />
          </div>
          <div className="col">
            <p>Showing {filtered.length} movies in the database</p>
            <MoviesTable
              moviesAll={moviesAll}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <span>
              <Pagination
                itemsCount={filtered.length}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </span>
          </div>
        </div>
        // <button onClick={this.logState}>Show state</button>
      );
    }
  }
  handleDelete = movie => {
    console.log(movie);
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });

    //
  };

  handleSort = path => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      console.log(sortColumn);
    } else {
      console.log(sortColumn);
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  handleGenreUpdate = genre => {
    const currentGenre = genre;

    this.setState({ currentGenre, currentPage: 1 });
    console.log("current genre is", this.state.currentGenre);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  logState = () => {
    console.log(this.state.movies);
  };
  //setColumns;
  populateRows = () => {
    const movies = this.state.movies;
    return;
  };
}

export default Rentals;

/* function App() {
  return <h1>Yoooo</h1>;
} */

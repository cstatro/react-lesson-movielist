import React, { Component } from "react";
import "../App.css";
import Like from "./like";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./paginator";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MenuFilter from "./menuFilter";

class Rentals extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    currentGenre: "all"
  };
  render() {
    console.log(this.state.currentGenre);
    const { pageSize, currentPage } = this.state;
    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database</p>;
    } else {
      const moviesAll = paginate(this.state.movies, currentPage, pageSize);
      return (
        <React.Fragment>
          <p>Showing {this.state.movies.length} movies in the database</p>

          <MenuFilter
            updateGenre={this.handleGenreUpdate}
            genres={this.state.genres}
            currentGenre={this.state.currentGenre}
          />

          <table className="table table-dark">
            <thead>
              <tr className="thead-light">
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>

            <tbody>
              {moviesAll.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      setLike={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <span>
            <Pagination
              itemsCount={this.state.movies.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </span>
        </React.Fragment>
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

  handleGenreUpdate = genre => {
    const allMovies = [...getMovies()];
    const currentGenre = genre;
    const movies = allMovies.filter(movie => movie.genre.name === genre);
    console.log("fart", movies);

    this.setState({ currentGenre, movies });
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

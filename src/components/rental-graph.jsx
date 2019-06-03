import React, { Component } from "react";
import "../App.css";
import { getMovies } from "../services/fakeMovieService";

class Rentals extends Component {
  state = {
    movies: getMovies()
  };
  render() {
    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database</p>;
    } else {
      return (
        <React.Fragment>
          <p>Showing {this.state.movies.length} movies in the database</p>
          <table className="table table-dark">
            <thead>
              <tr className="thead-light">
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
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

import React, { Component } from "react";

class MenuFilter extends Component {
  render() {
    const { updateGenre, genres, currentGenre } = this.props;
    console.log(genres);
    return (
      <ul class="list-group ">
        <li
          key="all"
          onClick={() => updateGenre("all")}
          class={
            currentGenre === "all"
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          All
        </li>
        {genres.map(genre => (
          <li
            key={genre.name}
            onClick={() => updateGenre(genre.name)}
            className={
              genre.name === currentGenre
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default MenuFilter;

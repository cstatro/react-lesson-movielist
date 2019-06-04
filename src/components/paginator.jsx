import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {pages.map(page => (
          <li
            key={page}
            class={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} class="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

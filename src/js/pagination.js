import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import ref from './Refs';

function tuiPagination() {
  const options = {
    totalItems: 200,
    itemsPerPage: 10,
    visiblePages: 10,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const pagination = new Pagination(ref.paginationRef, options);

  pagination.on('beforeMove', event => {
    const currentPage = event.page;

    if (currentPage === 10) {
      return false;
    }
    console.log(currentPage);
  });
}
tuiPagination();

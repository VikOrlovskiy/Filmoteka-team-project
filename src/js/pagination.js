import Pagination from 'tui-pagination';
import ref from './Refs';

function tuiPagination() {
  const options = {
    totalItems: 100,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const pagination = new Pagination(ref.paginationRef, options);

  pagination.on('beforeMove', event => {
    const currentPage = event.page;

    // if (currentPage === 10) {
    //   return false;
    // }
    console.log(currentPage);
  });
}
tuiPagination();

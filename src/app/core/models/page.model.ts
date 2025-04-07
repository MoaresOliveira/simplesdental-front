export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  pageable: Pageable;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
}


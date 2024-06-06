import Button from "../Button/button";
import styles from "./pagination.module.css";

interface PaginationProps {
  totalRows: number;
  rowsPerPageOptions: number[];
  currentPage: number;
  currentRowsPerPage: number;
  onClick: (newPage: number) => void;
  onChange: (newRowsPerPage: number) => void;
}

export default function Pagination({
  totalRows,
  rowsPerPageOptions,
  currentPage,
  currentRowsPerPage,
  onClick,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalRows / currentRowsPerPage);
  const displayStart = (currentPage - 1) * currentRowsPerPage + 1;
  const displayEnd = Math.min(currentPage * currentRowsPerPage, totalRows);

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="rowsPerPage">
          Rows per page:
          <select
            id="rowsPerPage"
            aria-label="select row number per page"
            className={styles.selectRowPerPage}
            value={currentRowsPerPage}
            onChange={(e) => onChange(+e.target.value)}
          >
            {rowsPerPageOptions.map((option) => (
              <option
                key={option}
                value={option}
                aria-label={`${option} rows per page`}
              >
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <span>
        {displayStart}-{displayEnd} of {totalRows}
      </span>
      <div className={styles.buttons}>
        <Button
          onClick={() => onClick(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => onClick(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

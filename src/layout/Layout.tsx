import { useMemo, useState } from "react";
import Button from "../components/Button/button";
import ListItem from "../components/ListItem/ListItem";
import useCountriesData from "../hooks/useCountriesData";
import styles from "./layout.module.css";
import Pagination from "../components/Paggination/Pagination";
import {
  displayCountriesWithPagination,
  rowsPerPageOptions,
  sortCountries,
} from "./layoutUtils";

export default function Layout() {
  const { countriesData, errorMsg, loading } = useCountriesData();
  const [selectedFilter, setSelectedFilter] = useState<
    "none" | "area" | "oceania"
  >("area");
  const [isSortDescending, setIsSortDescending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredCountries = useMemo(
    () =>
      countriesData?.filter((countryData) => {
        if (selectedFilter === "area") {
          return countryData.area < 65300;
        }
        if (selectedFilter === "oceania") {
          return countryData.region.toLocaleLowerCase() === "oceania";
        }
        return countriesData;
      }),
    [countriesData, selectedFilter]
  );

  const sortedCountries = useMemo(
    () => sortCountries(filteredCountries, isSortDescending),
    [filteredCountries, isSortDescending]
  );

  const isTheList = sortedCountries.length !== 0;

  const displayedCountries = displayCountriesWithPagination(
    sortedCountries,
    currentPage,
    rowsPerPage
  );

  return (
    <div className={styles.container}>
      <h1>Countries</h1>
      <div className={styles.buttonsContainer}>
        <div className={styles.filters}>
          <Button
            isDisabled={!isTheList}
            isUppercase
            onClick={() => setSelectedFilter("area")}
          >
            Smaller than Lithuania
          </Button>
          <Button
            isDisabled={!isTheList}
            isUppercase
            onClick={() => setSelectedFilter("oceania")}
          >
            Oceania region
          </Button>
        </div>
        <Button
          isDisabled={!isTheList}
          onClick={() => setIsSortDescending(!isSortDescending)}
        >
          Sorted by {isSortDescending ? "Z-A" : "A-Z"}
        </Button>
      </div>
      {displayedCountries.map((countryData) => (
        <ListItem key={countryData.name} item={countryData} />
      ))}
      {loading && <div className={styles.noResults}>{loading}</div>}
      {errorMsg && <div className={styles.noResults}>{errorMsg}</div>}
      {isTheList && (
        <Pagination
          totalRows={sortedCountries.length}
          rowsPerPageOptions={rowsPerPageOptions}
          currentPage={currentPage}
          currentRowsPerPage={rowsPerPage}
          onClick={setCurrentPage}
          onChange={setRowsPerPage}
        />
      )}
    </div>
  );
}

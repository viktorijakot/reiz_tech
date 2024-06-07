import { Country } from "../hooks/useCountriesData";

export const LITHUANIA_AREA = 65300

export const sortCountries = (array: Country[], isDescending: boolean) =>
    array
      .slice()
      .sort((a, b) =>
        isDescending
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name)
      );

export const rowsPerPageOptions = [5, 10, 20];

export const displayCountriesWithPagination = (
    data: Country[],
    currentPage: number,
    rowsPerPage: number
  ) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedAvailableLunchCards = data.slice(startIndex, endIndex);
  
    return displayedAvailableLunchCards;
  };
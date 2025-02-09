import { useState, useMemo } from "react";

const useSort = (data = []) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedData = useMemo(() => {
    if (!sortColumn) return data; // If no sorting is applied, return original data

    return [...data].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
    });
  }, [data, sortColumn, sortDirection]);

  const handleSortColumn = (column) => {
    setSortColumn(column);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return { sortedData, sortColumn, sortDirection, handleSortColumn };
};

export default useSort;

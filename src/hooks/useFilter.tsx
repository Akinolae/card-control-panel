import { useEffect, useMemo, useState } from "react";

interface FilterProp {
  data: Array<unknown>;
  filterText: string;
  exclude?: Array<string> | ["action", "actions"];
}

/**
 * @param {*} filterProp
 */
export const useFilter = (filterProp: FilterProp) => {
  const { data, filterText, exclude } = filterProp;
  const [filteredValue, setFilteredValue] = useState<unknown[]>([]);
  const dataToFilter: unknown[] = data as unknown[];

  /*
    added default fields to exclude when filtering
    Removes duplicate before filtering from data array
  */
  const fieldsNotFilter = useMemo(() => {
    return [...new Set(exclude || [])];
  }, [exclude]);

  useEffect(() => {
    const filteredData = dataToFilter.filter(
      (val: unknown) =>
        typeof val === "object" &&
        val !== null &&
        Object.keys(val as object)
          .filter((x: string) => !fieldsNotFilter?.includes(x))
          .some((k) => {
            return String((val as Record<string, unknown>)[k])
              .toLowerCase()
              .includes(filterText.toLowerCase());
          })
    );

    setFilteredValue(filteredData);
  }, [data, filterText, dataToFilter, fieldsNotFilter]);

  return filteredValue;
};

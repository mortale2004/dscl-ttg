import { PAGE, PAGE_SIZE } from "@dscl-ttg/constants";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchParam = (
  defaultSearchParams?: any
): {
  searchParams: any;
  setSearchParams: (data: any) => void;
  setParam: (key: string, value: any) => void;
  removeParam: (key: string) => void;
  resetParams: () => void;
  page: number;
  setPage: (page: number) => void;
} => {
  const [page, setPage] = useState<number>(PAGE);

  const [searchParams, setSearchParams] = useSearchParams();

  const methods = useMemo(() => {
    // Convert URLSearchParams to regular object
    const params = Object.fromEntries(searchParams.entries());

    return {
      // Return current params with defaults applied
      searchParams: { ...defaultSearchParams, ...params },
      setPage: setPage,
      page: page,

      // Update params
      setSearchParams: (newParams: any) => {
        const updatedParams = new URLSearchParams();

        // Merge current params, defaults, and new params
        const mergedParams = {
          ...defaultSearchParams,
          ...Object.fromEntries(searchParams.entries()),
          ...newParams,
        };

        // Remove empty/null/undefined values and set in URLSearchParams
        Object.entries(mergedParams).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            updatedParams.set(key, value as any);
          }
        });

        setPage(PAGE);
        setSearchParams(updatedParams);
      },

      // Set single param
      setParam: (key: string, value: any) => {
        const updatedParams = new URLSearchParams(searchParams);
        if (value !== null && value !== undefined && value !== "") {
          updatedParams.set(key, value);
        } else {
          updatedParams.delete(key);
        }
        setPage(PAGE);
        setSearchParams(updatedParams);
      },

      // Remove specific param
      removeParam: (key: string) => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete(key);
        setPage(PAGE);
        setSearchParams(updatedParams);
      },

      // Reset to defaults
      resetParams: () => {
        const defaultParams = new URLSearchParams();
        Object.entries(defaultSearchParams || {}).forEach(
          ([key, value]: any) => {
            defaultParams.set(key, value);
          }
        );
        setPage(PAGE);
        setSearchParams(defaultParams);
      },
    };
  }, [searchParams, setSearchParams, defaultSearchParams, page]);
  return methods;
};

import { PAGE } from "@dscl-ttg/constants";
import { useSearchParam } from "@dscl-ttg/hooks";
import Search from "@ui/Search";
import React, { memo, useCallback } from "react";

type HeaderSearchProps = {};

const HeaderSearch: React.FC<HeaderSearchProps> = memo(({}) => {
  const { searchParams, setSearchParams } = useSearchParam();

  const onChange = useCallback((_: string, event: any, __?: any) => {
    setSearchParams({ page: PAGE, search: event?.target?.value });
  }, []);

  return (
    <Search
      sx={{
        width: 180,
      }}
      value={(searchParams as any)?.search || ""}
      onChange={onChange as any}
    />
  );
});

export default HeaderSearch;

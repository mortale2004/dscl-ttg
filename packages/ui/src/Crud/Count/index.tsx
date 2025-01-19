import { Box, Typography } from "@mui/material";
import { crudDataAtom } from "@dscl-ttg/store";
import React, { memo } from "react";
import { useRecoilValue } from "recoil";

type CountProps = {};

const Count: React.FC<CountProps> = memo(({}) => {
  const crudData = useRecoilValue(crudDataAtom);
  return (
    crudData.count > 0 && (
      <Typography sx={{ color: "text.secondary", marginLeft: "auto" }}>
        {crudData.data.length} of {crudData.count}
      </Typography>
    )
  );
});

export default Count;

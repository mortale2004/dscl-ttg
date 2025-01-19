import React, { Fragment, memo } from "react";
import { useRecoilValue } from "recoil";
import { settingsSelector } from "@dscl-ttg/store";
import LoadingBar from "react-top-loading-bar";
import Loader from "../Loader";

type SuspenseProps = {
  children: React.ReactNode;
};

const Suspense: React.FC<SuspenseProps> = memo(({ children }) => {
  const settings = useRecoilValue<any>(settingsSelector);
  return (
    <React.Suspense
      fallback={
        <Fragment>
          <LoadingBar
            color={settings?.theme?.palette?.secondary?.main}
            progress={90}
            height={4}
            shadow
          />
          <Loader />
        </Fragment>
      }
    >
      {children}
    </React.Suspense>
  );
});

export default Suspense;

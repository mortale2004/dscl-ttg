import React, { memo } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import Fallback from "./Fallback";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = memo(
  ({ children }) => {
    return (
      <ReactErrorBoundary
        fallbackRender={(props) => <Fallback {...props} />}
        onReset={(details) => {}}
      >
        {children}
      </ReactErrorBoundary>
    );
  },
);

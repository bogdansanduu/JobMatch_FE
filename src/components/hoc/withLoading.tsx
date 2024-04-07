import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
interface WithLoadingProps {
  loading?: boolean;
}

const withLoading = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => {
  return ({ loading, ...props }) => {
    return loading ? <CircularProgress /> : <Component {...(props as P)} />;
  };
};

export default withLoading;

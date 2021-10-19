import React from "react";

const NoMatch = () => {
  const style = {
    height: "100vh",

    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={style}>
      <div>
        <h6 style={{ color: "red" }}>404 error! Not Found</h6>
      </div>
    </div>
  );
};

export default NoMatch;

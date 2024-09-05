import React from "react";

const Categorylayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Categorylayout;

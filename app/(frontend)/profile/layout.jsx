import React from "react";
import ProfileNavbar from "./_components/ProfileNavbar";

const layout = ({ children }) => {
  return (
    <div className="container">
      <div className="bg-primary-foreground">
        <ProfileNavbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;

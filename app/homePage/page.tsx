import React from "react";
import RecentList from "../ui/RecentList";

const HomePage = () => {
  return (
    <>
      <RecentList limit={9} />
    </>
  );
};

export default HomePage;

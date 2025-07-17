import React from "react";
import RecentPosts from "../ui/RecentPosts";

const HomePage = () => {
  return (
    <>
      <RecentPosts limit={9} />
    </>
  );
};

export default HomePage;

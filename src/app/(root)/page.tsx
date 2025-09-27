import React from "react";
import Header from "../../../components/Header";
import VideoCard from "../../../components/VideoCard";
const Page = () => {
  return (
    <main className="wrapper page">
      <Header
        subHeader="All Video"
        title="Public Library"
      />
      <h1>Welcome to loom clone</h1>
      <VideoCard/>
    </main>
  );
};

export default Page;

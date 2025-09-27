import React from "react";
import Header from "../../../components/Header";
import VideoCard from "../../../components/VideoCard";
const Page = () => {
  return (
    <main className="wrapper page">
      <Header subHeader="All Video" title="Public Library" />
      <h1 className="text-3xl">Welcome to loom clone</h1>
      <VideoCard
        id="1"
        title="Sample Video"
        thumbnail="/assets/samples/thumbnail (1).png"
        createdAt="2025-05-01 06:25:54:437"
        userImg="/assets/images/jason.png"
        username="Jason"
        views={23}
        visibility="public"
        duration={156}
      />
    </main>
  );
};

export default Page;

import React from "react";
import Header from "../../../../../components/Header";
import VideoCard from "../../../../../components/VideoCard";
import { dummyCards } from "../../../../../constants";
async function page({ params }: ParamsWithSearch) {
  const { id } = await params;
  return (
    <div className="wrapper page">
      <div className="text-2xl font-karla">
        <Header
          subHeader="vivekjo.dev@gmail.com"
          title="Vivek Joshi || Frontend Developer"
          userImg="/assets/images/dummy.jpg"
        />
        <section className="video-grid">
          {dummyCards.map((card) => (
            <VideoCard key={card.id} {...card} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default page;

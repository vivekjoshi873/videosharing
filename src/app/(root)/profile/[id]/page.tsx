import React from "react";
import Header from "../../../../../components/Header";
async function page({ params }: ParamsWithSearch) {
  const { id } = await params;
  return (
    <div className="wrapper page">
      <div className="text-2xl font-karla">
        <Header
          subHeader="vivekjo.dev@gmail.com"
          title="Vivek Joshi || Frontend Developer"
          userImg="/assets/images/dummy.jpg"
        ></Header>
      </div>
    </div>
  );
}

export default page;

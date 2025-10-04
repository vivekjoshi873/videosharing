"use client";
import React, { useState } from "react";
import FormField from "../../../components/FormField";
import FileInput from "../../../components/FileInput";
function page() {
  const [error, setError] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}
      <form className="rounded-20 shadow-10 gap-6 w-full flex-col px-5 py-8">
        <FormField
          id="title"
          label="Title"
          placeholder={"Enter a clear and concise video title"}
          value={formData.title}
          onChange={handleInputChange}
        />
        <FormField
          id="description"
          label="Description"
          placeholder={"Describe what this video is about "}
          value={formData.description}
          as="textarea"
          onChange={handleInputChange}
        />
        <FileInput />
        <FileInput />
        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          as="select"
          options={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ]}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default page;

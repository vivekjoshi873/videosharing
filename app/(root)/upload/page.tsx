"use client";
import React, { useState } from "react";
import FormField from "../../../components/FormField";
import FileInput from "../../../components/FileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "../../../constants";
import { useFileInput } from "../../../lib/hooks/useFileInput";
function page() {
  const [error, setError] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "",
  });
  const video = useFileInput(MAX_VIDEO_SIZE); 
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE );
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
        <FileInput 
        id="video"
        label="Video"
        accept="video/*"
        file={video.file}
        previewUrl={video.previewUrl}
        inputRef={video.inputRef}
        onChange={video.handleFileChange}
        onReset={video.resetFile}
        type="video"
      />
        <FileInput 
        id="thumbnail"
        label="Thumbnail"
        accept="image/*"
        file={thumbnail.file}
        previewUrl={thumbnail.previewUrl}
        inputRef={thumbnail.inputRef}
        onChange={thumbnail.handleFileChange}
        onReset={thumbnail.resetFile}
        type="image"
      />
        <FormField
         id="visibility"
          label="Visibility"
          onChange={handleInputChange}
          value={formData.visibility}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
        />
      </form>
    </div>
  );
}

export default page;

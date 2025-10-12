"use client";
import React, { useEffect, useState } from "react";
import FormField from "../../../components/FormField";
import FileInput from "../../../components/FileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "../../../constants";
import { useFileInput } from "../../../lib/hooks/useFileInput";
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from "../../../lib/actions/video";
import { useRouter } from "next/navigation";
function page() {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "",
  });
  const uploadFileToBunny = (
    file: File,
    uploadUrl: string,
    accessKey: string
  ): Promise<void> => {
    return fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "content-type": file.type,
        AccessKey: accessKey,
      },
      body: file,
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to upload file to Bunny");
      }
    });
  };
  const video = useFileInput(MAX_VIDEO_SIZE);
  useEffect(()=>{
    if(!video.duration!==null){
     setVideoDuration(video.duration);
    }
 },[video.duration])
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!video.file || !thumbnail.file) {
        setError("Please select both video and thumbnail files.");
        return;
      }
      if (!formData.title || !formData.description || !formData.visibility) {
        setError("Please fill in all the fields.");
        return;
      }
      const {
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey,
        videoId,
      } = await getVideoUploadUrl();
      if (!videoUploadUrl || !videoAccessKey || !videoId) {
        throw new Error("Failed to get video upload credentials");
      }
      await uploadFileToBunny(video.file,videoUploadUrl,videoAccessKey);
      const {
        uploadUrl: thumbnailUploadUrl,
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl,
      } = await getThumbnailUploadUrl(videoId);
      if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl) {
        throw new Error("Failed to get video upload credentials");
      }
      await uploadFileToBunny(thumbnail.file,thumbnailUploadUrl,thumbnailAccessKey);
      await saveVideoDetails({
        videoId,
        ...formData,
        duration:videoDuration,
        thumbnailUrl: thumbnailCdnUrl,
      });
      router.push(`/video/${videoId}`);
    } catch (error) {
      console.log("Error Submitting Form", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}
      <form
        className="rounded-20 shadow-10 gap-6 w-full flex-col px-5 py-8"
        onSubmit={handleSubmit}
      >
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
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default page;

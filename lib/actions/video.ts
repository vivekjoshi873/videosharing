"use server";
import { BUNNY } from "../../constants";
import { auth } from "../auth";
import { apiFetch, getEnv, withErrorHandling } from "../utils";
import { headers } from "next/headers";
const VIDEO_UPLOAD_URL = BUNNY.STREAM_BASE_URL;
const THUMBAIL_STORAGE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID");
const ACCESS_KEY = {
  streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
  storageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
};
const getSessionUserId = async (): Promise<string | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Not authenticated");
  }
  return session.user.id;
};
export const getVideoUploadUrl = withErrorHandling(async () => {
  const userId = await getSessionUserId();
  const videoResponse = await apiFetch(
    `${VIDEO_UPLOAD_URL}/${BUNNY_LIBRARY_ID}/videos`,
    {
      method: "POST",
      bunnyType: "stream",
      body: {
        title: "temporary title",
        collectionId: "",
      },
    }
  );
  const uploadUrl = `${VIDEO_UPLOAD_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;
  return {
    videoId: videoResponse.guid,
    uploadUrl,
    accessKey: ACCESS_KEY.streamAccessKey,
  };
});

export const getThumbnailUploadUrl = withErrorHandling(
  async (videoId: string) => {
    const fileName = `${Date.now()}-${videoId}-thumbail`;
    const uploadUrl = `${THUMBAIL_STORAGE_URL}/thumbnails/${BUNNY_LIBRARY_ID}/${fileName}`;
    const cdnUrl = `${THUMBAIL_CDN_URL}/thumbnails/${fileName}`;
    return{
      uploadUrl,
      cdnUrl,
      accessKey: ACCESS_KEY.storageAccessKey 
    }
  }
);

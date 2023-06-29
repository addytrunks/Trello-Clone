import { storage } from "@/appwrite"

export const getUrl = async (image) => {
    const url = storage.getFilePreview(JSON.parse(image).bucketId, JSON.parse(image).fileId)
    return url;
}
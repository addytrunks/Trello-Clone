const { storage } = require("@/appwrite");
const { ID } = require("appwrite");

const uploadImage = async(file) => {
    if(!file) return;
    
    const fileUploaded = await storage.createFile(
        "649ae1e4bf915e1f5a41",
        ID.unique(),
        file
    )

    return fileUploaded
}

export default uploadImage;
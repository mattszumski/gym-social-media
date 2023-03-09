import File from "../models/File.js";

export const addUploadedFilesData = (ownerId, filesArray) => {
  const filesData = filesArray.map((val) => {
    return {
      originalName: val.originalname,
      storedName: val.filename,
      location: val.destination,
      mimetype: val.mimetype,
      encoding: val.encoding,
      ownerId,
    };
  });

  return File.bulkCreate(filesData);
};

export const getPhotoWithId = (photoId) => {
  return File.findByPk(photoId);
};

export const getUserPhotos = (userId) => {
  return File.findAll({
    where: {
      ownerId: userId,
    },
    attributes: ["id", "path", "location", "storedName"],
  });
};

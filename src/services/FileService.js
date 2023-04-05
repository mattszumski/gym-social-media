import sharp from "sharp";
import File from "../models/File.js";
import UserProfile from "../models/UserProfile.js";
import { BelongsTo } from "sequelize";

export const addUploadedFilesData = (ownerId, filesArray, postId = 0) => {
  const filesData = filesArray.map((val) => {
    return {
      originalName: val.originalname,
      storedName: val.filename,
      location: val.destination,
      mimetype: val.mimetype,
      encoding: val.encoding,
      ownerId,
      postId,
    };
  });

  return File.bulkCreate(filesData);
};

export const createPhotoThumbnails = async (filesArray) => {
  filesArray.forEach((element) => {
    sharp(element.path).resize(200).toFile(`${element.destination}md-${element.filename}`);
    sharp(element.path).resize(40).toFile(`${element.destination}sm-${element.filename}`);
  });
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

export const getUserProfilePhotoData = (userId) => {
  return File.findOne({
    include: [
      {
        model: UserProfile,
        required: true,
        attributes: ["id"],
        where: { userId },
        association: new BelongsTo(File, UserProfile, { foreignKey: "id", targetKey: "profilePhotoId", constraints: false }),
      },
    ],
    attributes: ["storedName", "path"],
  });
};

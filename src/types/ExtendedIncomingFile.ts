export default interface ExtendedIncomingFile extends File {
  mimetype: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

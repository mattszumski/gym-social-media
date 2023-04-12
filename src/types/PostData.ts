import { Optional } from "sequelize";

export default interface PostData extends Optional<any, string> {
  id?: number;
  text?: string;
  media?: string;
  edited?: boolean;
  userId?: number;
}

export interface IUser {
  id?: number;
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
}

export interface IUserAuth extends IUser {
  password?: string;
}

export interface IUserProfile {
  id?: number;
  city?: string;
  gym?: string;
  about?: string;
  profilePhotoId?: string | number;
}

export interface IUserSettings {
  id?: number;
  language?: string;
}

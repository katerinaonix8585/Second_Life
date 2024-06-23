export interface ImageData {
  "1024x1024": string;
  "320x320": string;
  "64x64": string;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number;
  locationId: number;
  lastActive: string;
  images?: {
    values: { [key: string]: ImageData };
  };
}

export interface UserDataSliceState {
  data: UserData;
  status: "default" | "loading" | "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number;
  locationId: number;
  lastActive: string;
}

export interface UserDataSliceState {
  data: UserData;
  status: "default" | "loading" | "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

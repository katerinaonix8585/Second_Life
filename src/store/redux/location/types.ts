/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LocationData {
  id: number;
  name: string;
}

export interface LocationDataSliceState {
  data: LocationData[];
  statusLocation: "default" | "loading" | "success" | "error";
  errorLocation: any;
}

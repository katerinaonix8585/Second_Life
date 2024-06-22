export interface RejectData {
  id: number;
  name: string;
}

export interface RejectDataSliceState {
  rejects: RejectData[];
  statusReject: "default" | "loading" | "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorReject: any;
}

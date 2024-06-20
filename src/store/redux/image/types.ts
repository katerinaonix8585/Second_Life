export interface ImageData {
  entityType: string;
  entityId: number;
  file: File | null;
}

export interface ImageSliceState {
  data: ImageData | null;
  status: "idle" | "loading" | "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

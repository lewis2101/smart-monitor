export type CameraStatusItem = {
  label: string;
  count: number;
  status: "all" | "active" | "offline";
};

export type CameraStatusProps = {
  list: CameraStatusItem[];
};

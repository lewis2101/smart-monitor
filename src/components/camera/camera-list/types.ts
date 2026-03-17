export type CameraListItem = {
  title: string;
  description: string;
  thumbnailImage: string;
  isLive: boolean;
  isActive: boolean;
};

export type CameraListProps = {
  list: CameraListItem[];
};

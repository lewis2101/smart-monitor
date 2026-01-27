export type AddressSelectorRoute = {
  wp1: string;
  wp2: string;
  lat1: number;
  lat2: number;
  lon1: number;
  lon2: number;
  color: string;
  point1: {
    x: number;
    y: number;
    city: string;
    house: string;
    value: string;
    street: string;
    country: string;
    formatted_path: string;
  };
  point2: {
    x: number;
    y: number;
    city: string;
    house: string;
    value: string;
    street: string;
    country: string;
    formatted_path: string;
  };
  points: [x: number, y: number][];
  status?: string;
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  defaultStart?: boolean;
};

export type MapMapperKeys = "2gis" | "yandex" | "open-street" | "esri";

export const mapsMapper: Record<MapMapperKeys, { link: string; crs: string }> = {
  "2gis": {
    link: "https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}",
    crs: "EPSG:3857",
  },
  yandex: {
    link: "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=21.12.28&x={x}&y={y}&z={z}&lang=ru_RU",
    crs: "EPSG:3395",
  },
  "open-street": {
    link: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    crs: "EPSG:3857",
  },
  esri: {
    link: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    crs: "EPSG:3857",
  },
};

import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { Coordinates } from "@/helpers/coordinates";
import { ZoomLevels } from "@/helpers/zoom-levels";
import { type LocationType } from "@/types/global.types";

export type MapStyleThemes = "light" | "dark";

export const MapStyles: Record<MapStyleThemes, string> = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
} as const;

type Props = {
  center?: LocationType;
  zoom?: number;
  mapContainerRef: React.RefObject<HTMLDivElement>;
  style?: MapStyleThemes;
};

const createMapInstance = ({ center = Coordinates.georgia, zoom = 3, mapContainerRef, style = "light" }: Props) => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

  return new mapboxgl.Map({
    center: [center.longitude, center.latitude],
    container: mapContainerRef.current,
    attributionControl: false,
    style: MapStyles[style],
    dragPan: true,
    zoom,
  });
};

export const createMapboxInstance = () => {
  if (typeof window === "undefined") return null;

  const tempContainer = document.createElement("div");

  tempContainer.id = "mapbox-container";
  tempContainer.style.width = "100%";
  tempContainer.style.height = "100%";

  return createMapInstance({
    center: Coordinates.georgia,
    zoom: ZoomLevels.state,
    mapContainerRef: { current: tempContainer },
    style: "dark",
  });
};

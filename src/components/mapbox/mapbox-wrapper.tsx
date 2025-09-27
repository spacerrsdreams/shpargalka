"use client";

import { Disclaimer } from "@/components/mapbox/disclaimer";
import { MapBox } from "@/components/mapbox/mapbox";

export const MapWrapper = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <MapBox />
      <Disclaimer />
    </div>
  );
};

import { type RefObject } from "react";
import { create } from "zustand";

import { createMapboxInstance } from "@/lib/mapbox";

interface MapState {
  mapInstance: mapboxgl.Map | null;

  clearMapInstance: () => void;
  setMapInstance: (map: mapboxgl.Map) => void;
  mountMap: (containerRef: RefObject<HTMLDivElement | null>) => void;
}

export const useMapStore = create<MapState>((set, get) => {
  const mapInstance = createMapboxInstance();

  return {
    mapInstance,

    mountMap: (containerRef) => {
      const { mapInstance } = get();

      if (!containerRef.current) {
        console.error("Cannot mount map: missing container reference");

        return;
      }

      if (!mapInstance) {
        console.error("Cannot mount map: missing map instance");

        return;
      }

      const mapContainer = mapInstance.getContainer();

      if (mapContainer.parentNode) {
        mapContainer.parentNode.removeChild(mapContainer);
      }

      containerRef.current?.appendChild(mapInstance.getContainer());

      mapInstance.resize();
    },

    setMapInstance: (map) => set({ mapInstance: map }),

    clearMapInstance: () => {
      const { mapInstance } = get();

      mapInstance?.remove();
      set({ mapInstance: null });
    },
  };
});

// state
export const useMapInstance = () => useMapStore((state) => state.mapInstance);

// actions
export const useMountMap = () => useMapStore((state) => state.mountMap);
export const useSetMapInstance = () => useMapStore((state) => state.setMapInstance);
export const useClearMapInstance = () => useMapStore((state) => state.clearMapInstance);

import { type LocationType } from "@/types/global.types";

type CoordinateKeys = "georgia";

export const Coordinates: Record<CoordinateKeys, LocationType> = {
  georgia: {
    latitude: 41.6959,
    longitude: 44.832,
  },
} as const;

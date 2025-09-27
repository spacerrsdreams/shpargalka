"use client";

import { useMountMap } from "@/store/map.store";
import { memo, useEffect, useRef } from "react";

import { isClientSide } from "@/lib/utils";

export const MapBox = memo(() => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mountMap = useMountMap();

  useEffect(() => {
    //! Mount on client side, server causes errors
    if (!mapContainerRef.current || !isClientSide()) return;

    mountMap(mapContainerRef);
  }, [mountMap]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
});

MapBox.displayName = "MapBox";

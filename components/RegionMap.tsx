"use client";
import { useEffect } from "react";
import type { Region, Coordinates } from "@/data/types";

interface RegionMapProps {
  regions: Region[];
  center: Coordinates;
  zoom?: number;
  height?: string;
}

export default function RegionMap({
  regions,
  center,
  zoom = 7,
  height = "350px",
}: RegionMapProps) {
  useEffect(() => {
    let map: L.Map | null = null;
    const mapId = "region-map";

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const container = document.getElementById(mapId);
      if (!container || container.getAttribute("data-initialized")) return;
      container.setAttribute("data-initialized", "true");

      map = L.map(mapId).setView([center.lat, center.lng], zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map!);

      regions.forEach((region) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:#1B3A2D;color:white;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.3)">${region.name}</div>`,
          iconAnchor: [0, 0],
        });
        L.marker([region.coordinates.lat, region.coordinates.lng], { icon })
          .addTo(map!)
          .bindPopup(
            `<strong>${region.name}</strong><br>${region.description}`
          );
      });
    });

    return () => {
      if (map) {
        map.remove();
        const container = document.getElementById(mapId);
        if (container) container.removeAttribute("data-initialized");
      }
    };
  }, [regions, center, zoom]);

  return (
    <div className="rounded-xl overflow-hidden border border-stone-200">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div id="region-map" style={{ height }} />
    </div>
  );
}

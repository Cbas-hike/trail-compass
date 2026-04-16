"use client";
import { useEffect } from "react";
import type { Coordinates } from "@/data/types";

interface RouteMapProps {
  center: Coordinates;
  zoom?: number;
  markers?: {
    position: Coordinates;
    label: string;
    type: "start" | "end" | "waypoint";
  }[];
  height?: string;
}

export default function RouteMap({
  center,
  zoom = 12,
  markers = [],
  height = "400px",
}: RouteMapProps) {
  useEffect(() => {
    let map: L.Map | null = null;

    import("leaflet").then((L) => {
      // Fix default marker icons
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const container = document.getElementById("trail-map");
      if (!container || container.getAttribute("data-initialized")) return;
      container.setAttribute("data-initialized", "true");

      map = L.map("trail-map").setView([center.lat, center.lng], zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      markers.forEach((marker) => {
        const color =
          marker.type === "start"
            ? "#1B3A2D"
            : marker.type === "end"
              ? "#E8923A"
              : "#4A7C59";
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.4)"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });
        L.marker([marker.position.lat, marker.position.lng], { icon })
          .addTo(map!)
          .bindPopup(marker.label);
      });

      // Draw route line if waypoints exist
      const allPoints = markers.map(
        (m) => [m.position.lat, m.position.lng] as [number, number]
      );
      if (allPoints.length > 1) {
        L.polyline(allPoints, { color: "#1B3A2D", weight: 3, opacity: 0.8 }).addTo(
          map!
        );
      }
    });

    return () => {
      if (map) {
        map.remove();
        const container = document.getElementById("trail-map");
        if (container) container.removeAttribute("data-initialized");
      }
    };
  }, [center, zoom, markers]);

  return (
    <div className="rounded-xl overflow-hidden border border-stone-200">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div id="trail-map" style={{ height }} />
    </div>
  );
}

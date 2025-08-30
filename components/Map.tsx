"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useVendorContext, Vendor } from "../context/VendorContext";

// Fix for default icon issue with webpack
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

/**
 * A helper component that listens for changes to the `selectedVendor` state
 * and uses the `useMap` hook to programmatically pan/zoom the map. This is the
 * standard react-leaflet pattern for triggering imperative map actions from
 * declarative state.
 */
function MapUpdater() {
  const { selectedVendor } = useVendorContext();
  const map = useMap();

  useEffect(() => {
    if (selectedVendor) {
      map.flyTo([selectedVendor.location.lat, selectedVendor.location.lng], 15);
    }
  }, [selectedVendor, map]);

  return null;
}

/**
 * Renders the interactive Leaflet map and vendor markers.
 *
 * This component is strictly client-side, as Leaflet directly manipulates the DOM.
 *
 * Key Implementation Details:
 * - Icon Fix: Manually configures the default Leaflet marker icons. This is a
 * necessary workaround for a common issue where icons fail to load correctly
 * in environments using bundlers like Webpack/Next.js.
 * - Client-Side Guard: Uses a simple `isClient` state check to delay rendering
 * until the component has mounted in the browser, preventing SSR errors.
 * - MapUpdater: Leverages the nested `MapUpdater` component to bridge React's
 * declarative state from context with Leaflet's imperative `map.flyTo()` API.
 */
export default function Map() {
  const { vendors } = useVendorContext();
  const [isClient, setIsClient] = useState(false);

  // This ensures the map only renders on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Explicitly type tehranPosition as a tuple [number, number]
  // to satisfy the 'center' prop's type requirement.
  const tehranPosition: [number, number] = [35.7219, 51.3347];

  // When importing images in Next.js, we need to use the .src property
  // for the actual URL string that Leaflet expects.
  const DefaultIcon = L.icon({
    iconRetinaUrl: iconRetinaUrl.src,
    iconUrl: iconUrl.src,
    shadowUrl: shadowUrl.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"></div>
    );
  }

  return (
    <MapContainer
      center={tehranPosition}
      zoom={12}
      scrollWheelZoom={true}
      className="w-full h-full z-0 rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vendors.map((vendor: Vendor) => (
        <Marker
          key={vendor.id}
          position={[vendor.location.lat, vendor.location.lng]}
        >
          <Popup>
            <b>{vendor.brandName}</b>
            <br />
            {vendor.contactPerson}
          </Popup>
        </Marker>
      ))}
      <MapUpdater />
    </MapContainer>
  );
}

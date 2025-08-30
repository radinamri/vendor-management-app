"use client";

import dynamic from "next/dynamic";
import Header from "../components/Header";
import VendorList from "../components/VendorList";
import Modals from "../components/Modals";

/**
 * Main application page component.
 *
 * This component orchestrates the primary layout of the vendor management dashboard.
 *
 * Key features:
 * - Dynamically imports the Map component with SSR disabled. This is critical because
 * the 'react-leaflet' library directly manipulates the DOM and would fail during
 * server-side rendering. A skeleton loader is displayed during the component's load time.
 * - Implements a responsive two-column layout that stacks on smaller screens,
 * displaying the vendor list and the interactive map.
 * - Renders the global Header and the container for all modals.
 */

// The Map component is client-side only, so we dynamically import it to prevent
// it from being included in the initial server-side render.
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"></div>
  ),
});

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-hidden">
        <div className="lg:col-span-1 overflow-y-auto h-full rounded-lg bg-gray-100 dark:bg-gray-900">
          <VendorList />
        </div>
        <div className="lg:col-span-2 h-[50vh] lg:h-full">
          <Map />
        </div>
      </div>
      <Modals />
    </main>
  );
}

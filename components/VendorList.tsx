"use client";

import { useVendorContext } from "../context/VendorContext";
import VendorCard from "./VendorCard";
import { en as t } from "../data/i18n";

/**
 * Renders the main scrollable list of vendor cards.
 *
 * This component's primary role is to display the vendors that match the
 * current application state (e.g., search filters). It subscribes to the
 * `VendorContext` to get the `filteredVendors` array.
 *
 * By design, this component is purely presentational. All the heavy lifting
 * (like filtering the vendor list based on the search query) is handled
 * upstream in the context's memoized selectors. This keeps the rendering
 * logic here simple and performant.
 */
export default function VendorList() {
  const { filteredVendors } = useVendorContext();

  return (
    <div className="p-4">
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {t.itemsFound(filteredVendors.length)}
      </div>
      <div className="space-y-4">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No vendors found.</p>
        )}
      </div>
    </div>
  );
}

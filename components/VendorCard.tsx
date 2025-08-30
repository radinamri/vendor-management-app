"use client";

import Image from "next/image";
import { Edit, Trash2, MapPin, Phone } from "lucide-react";
import { useVendorContext, Vendor } from "../context/VendorContext";
import { en as t } from "../data/i18n";

// Define the type for the component's props
interface VendorCardProps {
  vendor: Vendor;
}

/**
 * A default SVG logo component to be used when a vendor doesn't have a logoUrl.
 * It renders a generic "store" icon, ensuring a consistent and clean UI.
 */
function DefaultVendorLogo() {
  return (
    <div className="w-20 h-20 flex-shrink-0 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-400 dark:text-gray-300 w-full h-full"
      >
        <path d="M8 21V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v16" />
        <path d="M12 21h-4a2 2 0 0 1-2-2v-3" />
        <path d="M12 21h4a2 2 0 0 0 2-2v-3" />
        <path d="M4 11h16" />
        <path d="M12 3v2" />
      </svg>
    </div>
  );
}

/**
 * Displays the information for a single vendor in a card layout.
 *
 * This is a core presentational component, designed to be used within the
 * VendorList. It renders the vendor's key details and provides the primary
 * user actions: selecting the vendor to view on the map, initiating an edit,
 * and triggering the delete confirmation process.
 *
 * All stateful logic is delegated to the global `VendorContext` via the
 * `dispatch` function. This keeps the card focused solely on rendering UI
 * based on the `vendor` prop it receives.
 */
export default function VendorCard({ vendor }: VendorCardProps) {
  const { dispatch } = useVendorContext();

  const handleSelect = () =>
    dispatch({ type: "SELECT_VENDOR", payload: vendor.id });
  const handleEdit = () =>
    dispatch({ type: "OPEN_ADD_EDIT_MODAL", payload: vendor });
  const handleDelete = () =>
    dispatch({ type: "OPEN_DELETE_MODAL", payload: vendor });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="p-4 flex gap-4">
        {vendor.logoUrl ? (
          <Image
            src={vendor.logoUrl}
            alt={`${vendor.brandName} Logo`}
            width={80}
            height={80}
            className="rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover"
            unoptimized // Add this prop to allow external SVGs
          />
        ) : (
          <DefaultVendorLogo />
        )}

        <div className="flex-grow">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            {vendor.brandName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.personInCharge}: {vendor.contactPerson}
          </p>
          <a
            href={`tel:${vendor.phone}`}
            className="text-sm text-blue-500 hover:underline flex items-center gap-1 mt-1"
          >
            <Phone size={14} /> {vendor.phone}
          </a>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 p-2 flex justify-end gap-2">
        <button
          onClick={handleSelect}
          title={t.showOnMap}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <MapPin size={18} />
        </button>
        <button
          onClick={handleEdit}
          title={t.editInformation}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={handleDelete}
          title={t.deleteVendor}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

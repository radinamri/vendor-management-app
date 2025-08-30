"use client";

import React from "react";
import { Plus, Search } from "lucide-react";
import { useVendorContext } from "../context/VendorContext";
import { en as t } from "../data/i18n";

/**
 * Renders the main application header.
 *
 * This component provides global application controls, including a live search
 * filter for the vendor list and the primary action to initiate the creation
 * of a new vendor. It is designed to be sticky for constant user access.
 *
 * State interaction (search query and modal triggers) is managed through the
 * `useVendorContext` hook, keeping this component focused on presentation and
 * user input.
 */
export default function Header() {
  const { searchQuery, dispatch } = useVendorContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  const openAddModal = () => {
    dispatch({ type: "OPEN_ADD_EDIT_MODAL" });
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-8xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t.vendorPanel}
        </h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            <Plus size={20} />
            <span className="hidden md:inline">{t.addNewVendor}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

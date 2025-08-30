/**
 * @file i18n.tsx
 * @description Centralized dictionary for English (en-US) UI strings.
 *
 * This file serves as the master dictionary for all user-facing text in the
 * application. Centralizing strings here is crucial for maintainability and
 * simplifies the process of internationalization (i18n).
 *
 * ---
 *
 * ### Contribution Guidelines:
 *
 * 1.  **Structure:** Group strings by component or feature view. This makes it
 * easier to locate and manage text as the application scales.
 *
 * 2.  **Dynamic Strings:** For text that requires variable interpolation (e.g.,
 * displaying a count), use a function that accepts the necessary
 * parameters and returns the formatted string.
 *
 * 3.  **Adding Languages:** To support a new language, create a corresponding
 * file (e.g., `fa.ts`) and replicate the *exact* key structure found here.
 * The application's language provider will then be able to swap between
 * them seamlessly.
 */
export const en = {
  // Header
  vendorPanel: "Vendor Panel",
  searchPlaceholder: "Search by brand name...",
  addNewVendor: "Add New Vendor",
  itemsFound: (count: number) =>
    `${count} ${count === 1 ? "item" : "items"} found.`,

  // Vendor Card
  personInCharge: "Person in charge",
  editInformation: "Edit Information",
  deleteVendor: "Delete Vendor",
  showOnMap: "Show on Map",
  contact: "Contact",

  // Add/Edit Modal
  addVendorTitle: "Add New Vendor",
  editVendorTitle: "Edit Vendor Information",
  brandName: "Brand Name",
  contactPersonName: "Contact Person's Full Name",
  logoImageUrl: "Logo Image URL",
  contactNumber: "Contact Number",
  createVendor: "Create Vendor",
  updateVendor: "Update Vendor",
  cancel: "Cancel",

  // Delete Modal
  deleteModalTitle: "Confirm Deletion",
  deleteModalMessage: (brandName: string) =>
    `Are you sure you want to delete ${brandName}? This action cannot be undone.`,
  confirmDelete: "Confirm Delete",

  // Toasts
  toastVendorAdded: "Vendor added successfully!",
  toastVendorUpdated: "Vendor updated successfully!",
  toastVendorDeleted: "Vendor deleted successfully!",
};

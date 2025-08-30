"use client";

import React, { useState, useEffect, Dispatch } from "react";
import { useVendorContext, Vendor, Action } from "../context/VendorContext";
import { en as t } from "../data/i18n";
import { X } from "lucide-react";

/**
 * Centralized manager for all modal dialogs in the application.
 *
 * This component subscribes to the VendorContext to determine which modal
 * to display (Add/Edit or Delete Confirmation). By consolidating modal
 * logic here, we keep the main application layout clean and ensure only
 * one modal can be active at a time. It also renders a shared backdrop
 * overlay for a consistent look and a universal close mechanism.
 */
export default function Modals() {
  const {
    isAddEditModalOpen,
    isDeleteModalOpen,
    vendorToEdit,
    vendorToDelete,
    dispatch,
  } = useVendorContext();

  const closeModal = () => dispatch({ type: "CLOSE_MODALS" });

  // Render nothing if no modals are supposed to be open.
  if (!isAddEditModalOpen && !isDeleteModalOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={closeModal}
        aria-hidden="true"
      ></div>
      {isAddEditModalOpen && (
        <AddEditModal
          vendorToEdit={vendorToEdit}
          closeModal={closeModal}
          dispatch={dispatch}
        />
      )}
      {isDeleteModalOpen && vendorToDelete && (
        <DeleteModal
          vendorToDelete={vendorToDelete}
          closeModal={closeModal}
          dispatch={dispatch}
        />
      )}
    </>
  );
}

// --- Type definition for AddEditModal props ---
interface AddEditModalProps {
  vendorToEdit: Vendor | null;
  closeModal: () => void;
  dispatch: Dispatch<Action>;
}

/**
 * A controlled form component for both creating and updating vendors.
 *
 * It maintains its own local form state, which is initialized from the
 * `vendorToEdit` prop if one is provided (for editing), or with default
 * values (for creating). On submission, it dispatches the appropriate
 * ADD_VENDOR or UPDATE_VENDOR action to the global context.
 */
function AddEditModal({
  vendorToEdit,
  closeModal,
  dispatch,
}: AddEditModalProps) {
  const [formData, setFormData] = useState({
    brandName: "",
    contactPerson: "",
    phone: "",
    logoUrl: "",
    location: { lat: 35.7219, lng: 51.3347 }, // Default location
  });

  // Effect to sync local form state with the vendor being edited.
  useEffect(() => {
    if (vendorToEdit) {
      setFormData(vendorToEdit);
    } else {
      // Reset form when opening to add a new vendor
      setFormData({
        brandName: "",
        contactPerson: "",
        phone: "",
        logoUrl: "",
        location: { lat: 35.7219, lng: 51.3347 },
      });
    }
  }, [vendorToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (vendorToEdit) {
      dispatch({
        type: "UPDATE_VENDOR",
        payload: { ...formData, id: vendorToEdit.id },
      });
    } else {
      dispatch({ type: "ADD_VENDOR", payload: formData });
    }
    closeModal();
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 w-full max-w-md p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 id="modal-title" className="text-xl font-bold">
          {vendorToEdit ? t.editVendorTitle : t.addVendorTitle}
        </h2>
        <button
          onClick={closeModal}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="brandName">
            {t.brandName}
          </label>
          <input
            id="brandName"
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="contactPerson"
          >
            {t.contactPersonName}
          </label>
          <input
            id="contactPerson"
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            {t.contactNumber}
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="logoUrl">
            {t.logoImageUrl}
          </label>
          <input
            id="logoUrl"
            type="url"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {vendorToEdit ? t.updateVendor : t.createVendor}
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Type definition for DeleteModal props ---
interface DeleteModalProps {
  vendorToDelete: Vendor;
  closeModal: () => void;
  dispatch: Dispatch<Action>;
}

/**
 * A simple confirmation modal to prevent accidental vendor deletion.
 * On confirmation, it dispatches the DELETE_VENDOR action with the vendor's ID.
 */
function DeleteModal({
  vendorToDelete,
  closeModal,
  dispatch,
}: DeleteModalProps) {
  const handleDelete = () => {
    dispatch({ type: "DELETE_VENDOR", payload: vendorToDelete.id });
    closeModal();
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 w-full max-w-sm p-6"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <h2 id="delete-modal-title" className="text-xl font-bold mb-2">
        {t.deleteModalTitle}
      </h2>
      <p
        id="delete-modal-description"
        className="text-gray-600 dark:text-gray-300 mb-6"
      >
        {t.deleteModalMessage(vendorToDelete.brandName)}
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={closeModal}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          {t.cancel}
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          {t.confirmDelete}
        </button>
      </div>
    </div>
  );
}

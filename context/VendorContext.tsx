"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  Dispatch,
} from "react";
import { initialVendors } from "../data/vendors";
import { toast } from "react-hot-toast";
import { en as t } from "../data/i18n";

/**
 * @file VendorContext.tsx
 * @description Manages the global state for the vendor application.
 *
 * This context serves as the single source of truth for all vendor-related
 * data and UI state. It leverages the `useReducer` hook for robust and predictable
 * state management, which is preferable to multiple `useState` hooks when
 * dealing with complex, interrelated state.
 *
 * Key Responsibilities:
 * - Storing and managing the master list of vendors.
 * - Handling all CRUD (Create, Read, Update, Delete) operations.
 * - Managing UI state such as search queries and modal visibility.
 * - Providing memoized, derived state (e.g., `filteredVendors`) for
 * performance optimization, preventing unnecessary recalculations.
 *
 * The context is fully type-safe with TypeScript, defining clear structures for
 * state, actions, and the context's value to ensure a reliable developer experience.
 *
 * To consume this context, components should use the `useVendorContext` custom hook.
 */

// --- 1. DEFINE TYPES ---

export type Vendor = {
  id: number;
  brandName: string;
  contactPerson: string;
  phone: string;
  location: { lat: number; lng: number };
  logoUrl: string;
};

type State = {
  vendors: Vendor[];
  searchQuery: string;
  selectedVendorId: number | null;
  isAddEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  vendorToEdit: Vendor | null;
  vendorToDelete: Vendor | null;
};

// Define all possible actions for the reducer for type safety
export type Action =
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SELECT_VENDOR"; payload: number }
  | { type: "ADD_VENDOR"; payload: Omit<Vendor, "id"> }
  | { type: "UPDATE_VENDOR"; payload: Vendor }
  | { type: "DELETE_VENDOR"; payload: number }
  | { type: "OPEN_ADD_EDIT_MODAL"; payload?: Vendor }
  | { type: "OPEN_DELETE_MODAL"; payload: Vendor }
  | { type: "CLOSE_MODALS" };

// The complete shape of the context value
type VendorContextType = State & {
  filteredVendors: Vendor[];
  selectedVendor: Vendor | null;
  dispatch: Dispatch<Action>;
};

// --- 2. DEFINE INITIAL STATE ---
const initialState: State = {
  vendors: initialVendors,
  searchQuery: "",
  selectedVendorId: null,
  isAddEditModalOpen: false,
  isDeleteModalOpen: false,
  vendorToEdit: null,
  vendorToDelete: null,
};

// --- 3. CREATE CONTEXT ---
const VendorContext = createContext<VendorContextType | undefined>(undefined);

// --- 4. REDUCER FUNCTION ---
function vendorReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SELECT_VENDOR":
      return { ...state, selectedVendorId: action.payload };
    case "ADD_VENDOR": {
      const newVendor = { ...action.payload, id: Date.now() }; // Simple unique ID
      toast.success(t.toastVendorAdded);
      return { ...state, vendors: [...state.vendors, newVendor] };
    }
    case "UPDATE_VENDOR": {
      toast.success(t.toastVendorUpdated);
      return {
        ...state,
        vendors: state.vendors.map((vendor) =>
          vendor.id === action.payload.id ? action.payload : vendor
        ),
      };
    }
    case "DELETE_VENDOR": {
      toast.error(t.toastVendorDeleted);
      return {
        ...state,
        vendors: state.vendors.filter((vendor) => vendor.id !== action.payload),
      };
    }
    case "OPEN_ADD_EDIT_MODAL":
      return {
        ...state,
        isAddEditModalOpen: true,
        vendorToEdit: action.payload || null,
      };
    case "OPEN_DELETE_MODAL":
      return {
        ...state,
        isDeleteModalOpen: true,
        vendorToDelete: action.payload,
      };
    case "CLOSE_MODALS":
      return {
        ...state,
        isAddEditModalOpen: false,
        isDeleteModalOpen: false,
        vendorToEdit: null,
        vendorToDelete: null,
      };
    default:
      return state;
  }
}

// --- 5. PROVIDER COMPONENT ---
export function VendorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(vendorReducer, initialState);

  const filteredVendors = useMemo(() => {
    return state.vendors.filter((vendor) =>
      vendor.brandName.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.vendors, state.searchQuery]);

  const selectedVendor = useMemo(() => {
    return state.vendors.find((v) => v.id === state.selectedVendorId) || null;
  }, [state.vendors, state.selectedVendorId]);

  const value: VendorContextType = {
    ...state,
    filteredVendors,
    selectedVendor,
    dispatch,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
}

// --- 6. CUSTOM HOOK ---
export function useVendorContext() {
  const context = useContext(VendorContext);
  if (context === undefined) {
    throw new Error("useVendorContext must be used within a VendorProvider");
  }
  return context;
}

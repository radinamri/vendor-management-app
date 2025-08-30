/**
 * @file vendors.tsx
 * @description Provides the initial seed data for vendors.
 *
 * This file serves as a mock data source for development and demonstration
 * purposes. In a production environment, this data would be fetched from a
 * remote API endpoint and managed by the global state context.
 *
 * The structure of each vendor object should adhere to the `Vendor` type
 * defined in `VendorContext.tsx` to ensure type consistency throughout
 * the application.
 *
 * When adding new entries for testing:
 * - Ensure `id` is unique.
 * - `logoUrl` can use a placeholder service like placehold.co.
 * - `location` coordinates should be valid lat/lng pairs.
 */
export const initialVendors = [
  {
    id: 1,
    brandName: "Parsian Trading Co.",
    contactPerson: "Mr. Saeed Moradi",
    phone: "021-22345302",
    logoUrl: "https://placehold.co/100x100/E0E0E0/333?text=LOGO",
    location: {
      lat: 35.7219,
      lng: 51.3347,
    },
  },
  {
    id: 2,
    brandName: "Mobarakeh Steel",
    contactPerson: "Mr. Amir Seyedi",
    phone: "021-88765432",
    logoUrl: "https://placehold.co/100x100/C0C0C0/333?text=LOGO",
    location: {
      lat: 35.7319,
      lng: 51.3547,
    },
  },
  {
    id: 3,
    brandName: "Ofogh Fartak Group",
    contactPerson: "Ms. Ravaneh Mehr",
    phone: "021-44556677",
    logoUrl: "https://placehold.co/100x100/A0A0A0/333?text=LOGO",
    location: {
      lat: 35.7119,
      lng: 51.3847,
    },
  },
  {
    id: 4,
    brandName: "Atlas Eco",
    contactPerson: "Mr. Expert Team",
    phone: "021-12345678",
    logoUrl: "https://placehold.co/100x100/B0B0B0/333?text=LOGO",
    location: {
      lat: 35.7593,
      lng: 51.4226,
    },
  },
];

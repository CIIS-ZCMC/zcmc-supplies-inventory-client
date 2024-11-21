/**
 * System Name must be assign here
 */
export const SYSTEM_NAME = "Supplies Inventory System";

/**
 * Umis SSO Signing Path
 *
 * Don't change this path as this is the main authentication of the umis and your system.
 */
export const SSO_SIGNING_PATH = "signing-in";

/**
 * Directory of user first sigin
 * Change according to your system needs
 */
export const ROOT_PATH = "/dashboard";

/**
 * Server End points add here
 */
export const API = {
  AREAS: "areas",
  AREA_STORE: 'area-store',

  BRANDS: "brands",
  BRAND_STORE: 'brand-store',

  SUPPLIERS: "suppliers",
  SUPPLIER_STORE: 'supplier-store',

  UNITS: "units",
  UNIT_STORE: 'unit-store',

  SOURCES: "sources",
  SOURCE_STORE: 'source-store',

  CATEGORIES: "categories",
  CATEGORY_STORE: 'category-store',

  SUPPLIES: "supplies",
  SUPPLY_STORE: 'supply-store',

  INVENTORY: "get-inventory",
  RECEIVING: "receiving-list",

  RELEASING: "releasing-list",
  BRAND_REGULAR: 'selected-supply-brand-regular',

  STOCKOUT: 'stock-out',
  STOCKIN: 'stock-in',
};

/**
 * URLs of different site
 * landing_page site where user sign in
 *
 * When building the site update all files that use development
 * use the production_landing_page for signing page
 * use the production for your system url
 */
export const BASE_URL = {
  development_landing_page: "http://192.168.5.1:5170", // This will be the landing page
  production_landing_page: "https://zcmc.online", // This will be the production landing page url
  production: "https://api_name.zcmc.online/api/", // Change the sub domain name to your prefer name
  development: "http://localhost:8000/api", // You can change the port or ip here
};
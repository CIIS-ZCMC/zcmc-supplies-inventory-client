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
  AREA_STORE: "area-store",

  BRANDS: "brands",
  BRAND_STORE: "brand-store",

  SUPPLIERS: "suppliers",
  SUPPLIER_STORE: "supplier-store",

  UNITS: "units",
  UNIT_STORE: "unit-store",

  SOURCES: "sources",
  SOURCE_STORE: "source-store",

  CATEGORIES: "categories",
  CATEGORY_STORE: "category-store",

  SUPPLIES: "supplies",
  SUPPLY_STORE: "supply-store",

  INVENTORY: "get-inventory",
  RECEIVING: "receiving-list",

  RELEASING: "releasing-list",
  SELECTED_RELEASING_LIST: "selected-releasing-list",

  BRAND_REGULAR: 'selected-supply-brand-regular',
  BRAND_DONATION: 'selected-supply-brand-donation',

  STOCKOUT: "stock-out",
  STOCKIN: "stock-in",
  STOCK_UPDATE: "stock-in-backlogs",

  DASHBOARD_TOTAL: "get-dashboard-total",
  DASHBOARD_SUPPLIES: "get-dashboard-supplies",

  REPORTS_DATE: "get-date",
  REPORTS_NEAR_EXP: "get-near-expiration",
  REPORTS_DISPOSAL: "get-disposed-items",
  REPORTS_STARTING_BAL: "get-starting-balance",
  REPORTS_ITEM_COUNT: "get-item-count",
  REPORTS_ZERO_STOCKS: "get-zero-stocks",
  REPORTS_CONSUMED: "get-most-consumed",
  REPORTS_UNCONSUMED: "get-without-transaction",
  REPORTS_SUFFICIENT: "get-sufficient-supply",
  REPORTS_REORDER: "get-reorder-supply",
  REPORTS_ITEM_COUNT_BREAKDOWN: "get-item-breakdown",
  REPORTS_ITEM_COUNT_TOTAL: "get-item-total",
  REPORTS_ITEM_COUNT_IAR: "get-item-iar",
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

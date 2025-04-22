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
export const MigrateLibraries = {
  UNIT: "fetch-Unit-data-bizbox",
};

export const API = {
  AREAS: "areas",
  AREA_STORE: "area-store",
  AREA_UPDATE: "area-update",
  AREA_SHOW: "area-view",

  BRANDS: "brands",
  BRAND_STORE: "brand-store",
  BRAND_UPDATE: "brand-update",
  BRAND_SHOW: "brand-view",

  SUPPLIERS: "suppliers",
  SUPPLIER_STORE: "supplier-store",
  SUPPLIER_UPDATE: "supplier-update",
  SUPPLIER_SHOW: "supplier-view",

  UNITS: "units",
  UNIT_STORE: "unit-store",
  UNIT_UPDATE: "unit-update",
  UNIT_SHOW: "unit-view",

  SOURCES: "sources",
  SOURCE_STORE: "source-store",
  SOURCE_UPDATE: "source-update",
  SOURCE_SHOW: "source-view",
  SOURCE_LIST:"source-list",

  CATEGORIES: "categories",
  CATEGORY_STORE: "category-store",
  CATEGORY_UPDATE: "category-update",
  CATEGORY_SHOW: "category-view",

  SUPPLIES: "supplies",
  SUPPLY_STORE: "supply-store",
  SUPPLY_UPDATE: "supply-update",
  SUPPLY_SHOW: "supply-view",

  INVENTORY: "get-inventory",
  RECEIVING: "receiving-list",
  STOCK_IN_UPDATE: "stock-in-update",
  STOCK_IN_DETAILS: "stock-in-details",

  RELEASING: "releasing-list",
  SUPPLY_RELEASING_LIST: "supply-releasing-list",
  SUPPLY_RECEIVING_LIST: "supply-receiving-list",
  SELECTED_RELEASING_LIST: "selected-releasing-list",

  BRAND_REGULAR: "selected-supply-brand-regular",
  BRAND_DONATION: "selected-supply-brand-donation",

  STOCKOUT: "stock-out",
  STOCKIN: "stock-in",
  STOCK_UPDATE: "stock-in-backlogs",
  STOCK_UPDATE_LIST: "backlog-list",

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
  REPORTS_AREA_SUPPLY: "get-area-supply",
  REPORTS_SUPPLY_REGULAR: "get-supply-regular",
  REPORTS_STARTINGBAL_FETCHDATA:"get-supply-starting-balances",

  FETCH_AREA:"fetch-Area-data-bizbox",
  FETCH_CATEGORIES:"fetch-Category-data-bizbox",
  FETCH_UNITS:"fetch-Unit-data-bizbox",
  FETCH_SUPPLIERS:"fetch-Supplier-data-bizbox",
  FETCH_SUPPLIES:"fetch-items-data-bizbox",
  GET_LASTSYNCED:"lastsynced-items"
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
  development_landing_page: "http://192.168.8.95:8000/api",//127.0.0.1:8000/api", // This will be the landing page
  production_landing_page: "https://zcmc.online", // This will be the production landing page url
  production: "http://192.168.8.95:8000/api", // Change the sub domain name to your prefer name
  development: "http://192.168.8.95:8000/api", // You can change the port or ip here
  local: "http://192.168.8.95:8000/api", // You can change the port or ip here
};

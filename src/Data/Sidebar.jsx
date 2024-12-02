import { AlignLeft, Archive, BarChart, Box, Camera, Chrome, Clipboard, DollarSign, Home, LogIn, Settings, Tag, UserPlus, Users } from "react-feather";

export const MENUITEMS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        title: "Physical",
        type: "sub",
        active: false,
        children: [
          { path: "/product/category", title: "Category", type: "link" },
          { path: "/product/sub-category", title: "Sub Category", type: "link" },
          { path: "/product-list", title: "Product List", type: "link" },
          { path: "/product-detail", title: "Product Detail", type: "link" },
          { path: "/add-product", title: "Add Product", type: "link" },
        ],
      },
      {
        title: "digital",
        type: "sub",
        active: false,
        children: [
          { path: "/product/category", title: "Category", type: "link" },
          { path: "/product/sub-category", title: "Sub Category", type: "link" },
          { path: "/product-list", title: "Product List", type: "link" },
          { path: "/add-product", title: "Add Product", type: "link" },
        ],
      },
    ],
  },
  {
    title: "Sales",
    icon: DollarSign,
    type: "sub",
    active: false,
    children: [
      { path: "/sales/orders", title: "Orders", type: "link" },
      { path: "/sales/transactions", title: "Transactions", type: "link" },
    ],
  },
  {
    title: "Coupons",
    icon: Tag,
    type: "sub",
    active: false,
    children: [
      { path: "/coupons-list", title: "List Coupons", type: "link" },
      { path: "/create-coupons", title: "Create Coupons", type: "link" },
    ],
  },
  {
    title: "Pages",
    icon: Clipboard,
    type: "sub",
    active: false,
    children: [
      { path: "/pages-list", title: "List Page", type: "link" },
      { path: "/create-pages", title: "Create Page", type: "link" },
    ],
  },
  {
    title: "Media",
    path: "/media",
    icon: Camera,
    type: "link",
    active: false,
  },
  {
    title: "Menus",
    icon: AlignLeft,
    type: "sub",
    active: false,
    children: [
      { path: "/menu-list", title: "List Menu", type: "link" },
      { path: "/create-menus", title: "Create Menu", type: "link" },
    ],
  },
  {
    title: "Users",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/users/list-user", title: "User List", type: "link" },
      { path: "/create-user", title: "Create User", type: "link" },
    ],
  },
  {
    title: "Vendors",
    icon: Users,
    type: "sub",
    active: false,
    children: [
      { path: "/vendors/list-vendors", title: "Vendor List", type: "link" },
      { path: "/create-vendor", title: "Create Vendor", type: "link" },
    ],
  },
  {
    title: "Localization",
    icon: Chrome,
    type: "sub",
    children: [
      { path: "/localization/translations", title: "Translations", type: "link" },
      { path: "/localization/currency-rates", title: "Currency Rates", type: "link" },
      { path: "/localization/taxes", title: "Taxes", type: "link" },
    ],
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart,
    type: "link",
    active: false,
  },
  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    children: [{ path: "/profile", title: "Profile", type: "link" }],
  },
  {
    title: "Invoice",
    path: "/invoice",
    icon: Archive,
    type: "link",
    active: false,
  },
  {
    title: "Login",
    path: "/login",
    icon: LogIn,
    type: "link",
    active: false,
  },
];


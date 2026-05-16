import type { JSX } from "react";

// Auth
import Login from "@pages/login";
import CheckOtp from "@pages/checkOtp";
import SelectWorkspace from "@pages/selectWorkspace";
import CreateWorkspace from "@pages/createWorkspace";
import InviteMembers from "@pages/inviteMembers";

// Dashboard
import Dashboard from "@pages/dashboard";

// import ContactInfo from "@pages/appearance/contactInfo";
// import WebsiteAppearance from "@pages/appearance/websiteAppearance";
// import WebsiteTracking from "@pages/appearance/websiteTracking";

// Settings
// import CurrenciesForm from "@pages/setting/currenciesForm";
// import EmailForm from "@pages/setting/emailForm";
// import GeneralAddress from "@pages/setting/generalAddress";
// import GeneralInfo from "@pages/setting/generalInfo";
// import LicenceForm from "@pages/setting/licenseForm";
// import PaymentGateway from "@pages/setting/paymentGatewayForm";
// import ShippingSetting from "@pages/setting/shippingSetting";
// import ShippingConfig from "@pages/setting/shippingConfig";
// import TaxManagement from "@pages/setting/taxesManagement";

// // Users
// import AdminList from "@pages/users/adminList";
// import UserLists from "@pages/users/userList";
// import UserHistory from "@pages/users/userLoginHistory";

// ==============================
// ✅ PUBLIC ROUTES
// ==============================
export const publicRoutes: { path: string; component: JSX.Element }[] = [
  { path: "/", component: <Login /> },
  { path: "/login", component: <Login /> },
  { path: "/check-otp", component: <CheckOtp /> },
  { path: "/select-workspace", component: <SelectWorkspace /> },
  { path: "/create-workspace", component: <CreateWorkspace /> },
  { path: "/invite-members", component: <InviteMembers /> },
];

// ==============================
// ✅ PROTECTED ROUTES
// ==============================
export const protectedRoutes: { path: string; component: JSX.Element }[] = [
  // Dashboard
  { path: "/dashboard", component: <Dashboard /> },

  // // Residents
  // { path: "/residents", component: <ResidentsPage /> },

  // //Complaints
  // { path: "/complaints", component: <ComplaintPage /> },

  // //Staff
  // { path: "/staff", component: <StaffManagementPage /> },

  // // Committee
  // { path: "/committee", component: <CommitteePage /> },

  // // Expenses
  // { path: "/expenses", component: <ExpensesPage /> },

  // // Notices
  // { path: "/notices", component: <NoticesPage /> },

  // // Request Documents
  // { path: "/request-documents", component: <RequestDocumentsPage /> },

  // // Vehicle Stickers
  // { path: "/vehicle-stickers", component: <VehicleStickersPage /> },

  // // Visitor Monitoring
  // { path: "/visitor-monitoring", component: <VisitorMonitoringPage /> },

  // // Notifications
  // { path: "/notifications", component: <NotificationsPage /> },

  // // Role Access
  // { path: "/role-access", component: <RoleAccessPage /> },

  // // Analytics
  // { path: "/analytics", component: <AnalyticsPage /> },

  // // Chatbot PDF Management
  // {
  //   path: "/chatbot-pdf-management",
  //   component: <ChatbotPdfManagementPage />,
  // },

  // // Violations & Fines
  // {
  //   path: "/violations-&-fines",
  //   component: <ViolationsFinesPage />,
  // },

  // // Settings
  // { path: "/settings/languages", component: <Languages /> },
  // { path: "/settings/staff-categories", component: <StaffCategories /> },
  // {
  //   path: "/settings/complaint-category",
  //   component: <ComplaintCategoryPage />,
  // },

  // // Users
  // { path: "/users/admin-list", component: <AdminList /> },
  // { path: "/users/user-list", component: <UserLists /> },
  // { path: "/users/user-history", component: <UserHistory /> },
];

// ==============================
// ✅ LEGACY (OPTIONAL)
// ==============================
export const authRoutes: { path: string; component: JSX.Element }[] = [
  ...publicRoutes,
  ...protectedRoutes,
];

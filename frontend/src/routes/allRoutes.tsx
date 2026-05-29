import type { JSX } from "react";
import Login from "@pages/login";
import CheckOtp from "@pages/checkOtp";
import SelectWorkspace from "@pages/selectWorkspace";
import CreateWorkspace from "@pages/createWorkspace";
import InviteMembers from "@pages/inviteMembers";
import Dashboard from "@pages/Dashboard/dashboardPage";
import InboxPage from "@pages/Inbox/inboxPage";
import MessagesPage from "@pages/Messages/messagesPage";
import DocumentPage from "@pages/Documents/documentPage";
import SettingsPage from "@pages/Settings/settingsPage";

export const publicRoutes: { path: string; component: JSX.Element }[] = [
  { path: "/", component: <Login /> },
  { path: "/login", component: <Login /> },
  { path: "/check-otp", component: <CheckOtp /> },
  { path: "/select-workspace", component: <SelectWorkspace /> },
  { path: "/create-workspace", component: <CreateWorkspace /> },
  { path: "/invite-members", component: <InviteMembers /> },
];

export const protectedRoutes: { path: string; component: JSX.Element }[] = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/dashboard/:workspaceId", component: <Dashboard /> },
  { path: "/inbox", component: <InboxPage /> },
  { path: "/messages", component: <MessagesPage /> },
  { path: "/chat/:channel", component: <MessagesPage /> },
  { path: "/documents", component: <DocumentPage /> },
  { path: "/documents/:docId", component: <DocumentPage /> },
  { path: "/settings", component: <SettingsPage /> },
  { path: "/settings/:tab", component: <SettingsPage /> },
];

export const authRoutes: { path: string; component: JSX.Element }[] = [
  ...publicRoutes,
  ...protectedRoutes,
];


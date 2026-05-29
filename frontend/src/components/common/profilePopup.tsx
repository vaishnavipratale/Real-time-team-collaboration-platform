"use client";

import { useMemo } from "react";
import { Icons } from "@components/icons";
import { useSession } from "@context/sessionContext";
import { useTranslation } from "react-i18next";

const capitalizeWords = (str: string | null | undefined): string =>
  !str
    ? "Not provided"
    : str
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

interface ProfilePopupProps {
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { user } = useSession();

  const profileData = useMemo(
    () => ({
      name:
        `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
        user?.email ||
        "",
      email: user?.email,
      phone: user?.mobile || user?.phone,
      role: user?.role,
    }),
    [user]
  );

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md rounded-xl shadow-xl flex flex-col overflow-hidden">
        {/* ✅ Teal Header - same as Super Admin */}
        <div className="relative bg-primary px-6 pt-6 pb-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <Icons.X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center">
              <span className="text-2xl font-semibold text-white">
                {getInitials(profileData.name)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {capitalizeWords(profileData.name)}
              </h2>
              <p className="text-sm text-white/70 mt-0.5">
                {profileData.role
                  ?.split("_")
                  .map((w: string) => w[0].toUpperCase() + w.slice(1))
                  .join(" ")}
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Body - same as Super Admin */}
        <div className="px-6 py-6">
          <div className="space-y-5">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t("profile.emailAddress")}
              </label>
              <p className="text-sm text-foreground mt-1.5 break-all">
                {profileData.email || t("profile.notProvided")}
              </p>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t("profile.mobileNumber")}
              </label>
              <p className="text-sm text-foreground mt-1.5">
                {profileData.phone || t("profile.notProvided")}
              </p>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {t("profile.accountStatus")}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs font-medium text-success">
                    {t("profile.active")}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;

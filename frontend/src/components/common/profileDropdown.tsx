// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Icons } from "@components/icons";
// import { useTranslation } from "react-i18next";

// export type ProfileDropdownProps = {
//   name: string;
//   role: string;
//   onLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
//   onClose: () => void;
//   onProfileClick: () => void;
// };

// export default function ProfileDropdown({
//   name,
//   role,
//   onLogout,
//   onClose,
//   onProfileClick,
// }: ProfileDropdownProps) {
//   const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
//   const { t } = useTranslation();
//   return (
//     <>
//       <div className="absolute right-0 mt-4 w-56 bg-white rounded-b-md shadow-lg z-50 overflow-hidden border border-gray-soft border-t-0">
//         <div className="px-4 py-3 border-b border-gray-soft">
//           <p className="text-sm font-semibold text-gray-dark">
//             {name || t("layout.defaultUserName")}
//           </p>
//           <p className="text-xs text-gray-dark">{role || t("layout.defaultRole")}</p>
//         </div>
//         <div className="py-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onProfileClick();
//             }}
//             className="flex items-center gap-2 px-4 py-2 text-sm text-green-base font-semibold hover:bg-gray-soft w-full text-left"
//           >
//             <Icons.UserCircle className="h-5 w-5 text-green-base" />
//             {t("profile.yourProfile")}
//           </button>
//           {/* <Link
//           to="/settings/general-info"
//           onClick={onClose}
//           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//         >
//           Settings
//         </Link> */}
//           <button
//             onClick={(e) => {
//               onLogout(e);
//               onClose();
//             }}
//             className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-dark hover:bg-gray-soft cursor-pointer"
//           >
//             <Icons.LogOut className="h-5 w-5 text-gray-dark" />
//             {t("profile.signOut")}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

import { useTranslation } from "react-i18next";
import { Icons } from "@components/icons";
import type { MouseEvent } from "react";

export type ProfileDropdownProps = {
  name: string;
  role: string;
  onLogout: (e: MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  onProfileClick: () => void;
};

export default function ProfileDropdown({
  name,
  role,
  onLogout,
  onClose,
  onProfileClick,
}: ProfileDropdownProps) {
  const { t } = useTranslation();
  return (
    <>
      <div className="absolute right-0 mt-4 w-56 bg-white rounded-b-md shadow-lg z-50 overflow-hidden border border-gray-soft border-t-0">
        <div className="px-4 py-3 border-b border-gray-soft">
          <p className="text-sm font-semibold text-gray-dark">
            {name || "User Name"}
          </p>
          <p className="text-xs text-gray-dark">{role || "Role"}</p>
        </div>
        <div className="py-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProfileClick();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-green-base font-semibold hover:bg-gray-soft w-full text-left"
          >
            <Icons.UserCircle className="h-5 w-5 text-green-base" />
            {t("profile.yourProfile")}
          </button>
          {/* <Link
          to="/settings/general-info"
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Settings
        </Link> */}
          <button
            onMouseDown={(e) => {
              console.log("onMouseDown fired for logout button");
              onLogout(e);
              onClose();
            }}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-dark hover:bg-gray-soft cursor-pointer"
          >
            <Icons.LogOut className="h-5 w-5 text-gray-dark" />
            {t("profile.signOut")}
          </button>
        </div>
      </div>
    </>
  );
}


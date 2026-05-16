"use client";

import React from "react";
import ActionDropdown from "./actionDropdown";
import { Icons } from "@components/icons";

interface RowActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const RowActionMenu: React.FC<RowActionMenuProps> = ({ onEdit, onDelete }) => {
  return (
    <ActionDropdown
      iconType="horizontal"
      options={[
        {
          label: "Edit",
          action: onEdit,
          icon: <Icons.Edit className="h-4 w-4" />,
          className: "text-[rgb(var(--zinc-dark))] hover:bg-[rgb(var(--zinc-soft))]",
        },
        {
          label: "Delete",
          action: onDelete,
          icon: <Icons.Trash className="h-4 w-4" />,
          className: "text-[rgb(var(--red-base))] hover:bg-[rgb(var(--red-soft))]",
        },
      ]}
    />
  );
};

export default RowActionMenu;

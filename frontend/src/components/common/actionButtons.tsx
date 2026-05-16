import React from "react";
import { Icons } from "@components/icons";

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onDownload?: () => void;
  onAssignRole?: () => void;
  onSave?: () => void;
  className?: string;
}

const actionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  onView,
  onDownload,
  onAssignRole,
  onSave,
  className = "flex items-center gap-2",
}) => {
  return (
    <div className={className}>
      {onView && (
        <button
          onClick={onView}
          title="View"
          className="cursor-pointer bg-gray-light/50 hover:bg-gray-light p-2 rounded-lg transition"
        >
          <Icons.Eye className="w-5 h-5 text-gray-dark/90" />
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          title="Edit"
          className="cursor-pointer bg-blue-soft/50 hover:bg-blue-soft/40 p-2 rounded-lg transition"
        >
          <Icons.Edit className="w-5 h-5 text-blue-light" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          title="Delete"
          className="cursor-pointer bg-[rgb(var(--red-soft))] hover:bg-[rgb(var(--red-light))] p-2 rounded-lg transition"
        >
          <Icons.Trash className="w-5 h-5 text-[rgb(var(--red-base))]" />
        </button>
      )}
      {onDownload && (
        <button
          onClick={onDownload}
          title="Download"
          className="cursor-pointer bg-green-soft hover:bg-green-light/50 p-2 rounded-lg transition"
        >
          <Icons.Download className="w-5 h-5 text-green-base" />
        </button>
      )}
      {onAssignRole && (
        <button
          onClick={onAssignRole}
          title="Assign Role"
          className="cursor-pointer bg-purple-light/80 hover:bg-purple-light p-2 rounded-lg transition"
        >
          <Icons.UserCheck className="w-5 h-5 text-purple-500" />
        </button>
      )}
      {onSave && (
        <button
          onClick={onSave}
          title="Save"
          className="cursor-pointer bg-green-300 hover:bg-green-400/50 p-2 rounded-lg transition"
        >
          <Icons.Save className="w-5 h-5 text-green-700" />
        </button>
      )}
    </div>
  );
};

export default actionButtons;

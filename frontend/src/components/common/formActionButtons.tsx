import React from "react";
import ActionSizeButton from "./actionSizeButton";

interface FormActionButtonsProps {
  primaryLabel: string;
  onPrimary: () => void;
  onCancel: () => void;
  primaryVariant?: "primary" | "add" | "danger" | "warning" | "secondary";
}

const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  primaryLabel,
  onPrimary,
  onCancel,
  primaryVariant = "add",
}) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <ActionSizeButton
        sizeVariant="sm"
        variant="secondary"
        label="Cancel"
        onClick={onCancel}
      />
      <ActionSizeButton
        sizeVariant="sm"
        variant={primaryVariant}
        label={primaryLabel}
        onClick={onPrimary}
      />
    </div>
  );
};

export default FormActionButtons;


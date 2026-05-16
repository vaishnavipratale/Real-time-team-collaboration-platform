import React from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "@components/icons";
import Button from "./button"; 


interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card text-foreground rounded-lg shadow-2xl w-[90%] max-w-md px-8 py-8 border border-border animate-fade-in">
        {/* Icon + Heading */}
        <div className="flex items-start gap-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <Icons.AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">{t("logoutModal.areYouSure")}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t("logoutModal.logoutConfirmation")}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="secondary" size="md" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <Button variant="danger" size="md" onClick={onConfirm}>
            {t("common.yesLogout")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

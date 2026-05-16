import React from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <div className="flex items-center h-[48px] rounded-xl border border-gray-200 bg-white px-4">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="search"
          name="resident-search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          value={value}
          onChange={onChange}
          placeholder={t("commonLabels.searchPlaceholder")}
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchInput;

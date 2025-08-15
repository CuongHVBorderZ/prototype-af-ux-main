import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterDropdownProps {
  className?: string;
  setFilterIds?: (options: FilterOption[]) => void;
}

export function FilterDropdown({
  className,
  setFilterIds,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<FilterOption[]>([
    { id: "watch", label: "時計", checked: false },
    { id: "bag", label: "バッグ", checked: false },
    { id: "apparel", label: "アパレル", checked: false },
    { id: "other", label: "その他", checked: false },
  ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (id: string) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option,
      ),
    );
  };

  const handleReset = () => {
    setOptions((prev) => prev.map((option) => ({ ...option, checked: false })));
  };

  const handleOk = () => {
    setIsOpen(false);
    // You can add your filter logic here
    // setFilterIds(options.filter(opt => opt.checked));
  };

  const hasSelectedOptions = options.some((opt) => opt.checked);

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Filter Button */}
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center w-7 h-6 px-1.5 border border-[#D9D9D9] bg-white rounded shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10"
        style={{
          boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
        >
          <path
            d="M12.0326 2.10547H1.96735C1.63238 2.10547 1.42321 2.47051 1.59137 2.76172L4.77145 8.16758V11.457C4.77145 11.699 4.96559 11.8945 5.20621 11.8945H8.79371C9.03434 11.8945 9.22848 11.699 9.22848 11.457V8.16758L12.4099 2.76172C12.5767 2.47051 12.3675 2.10547 12.0326 2.10547ZM8.24957 10.9102H5.75035V8.77734H8.25094V10.9102H8.24957ZM8.38082 7.67539L8.25094 7.90234H5.74899L5.6191 7.67539L2.90797 3.08984H11.092L8.38082 7.67539Z"
            fill="black"
            fillOpacity="0.45"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute bottom-full left-8 mt-2 w-38 bg-white rounded shadow-lg z-50"
          style={{
            boxShadow:
              "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
            width: "200px",
          }}
        >
          {/* Checkbox List */}
          <div className="p-2">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-center h-8 px-3 py-1 rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOptionChange(option.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-4 h-4 border border-[#D9D9D9] bg-white rounded flex items-center justify-center">
                      {option.checked && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.5 1L3.5 6L1.5 4"
                            stroke="#1677FF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span
                    className="text-sm font-normal leading-[22px]"
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontFamily:
                        "Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    {option.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer with buttons */}
          <div
            className="flex items-center gap-2 p-2 border-t"
            style={{ borderColor: "rgba(230, 230, 230, 0.60)" }}
          >
            <button
              onClick={handleReset}
              disabled={!hasSelectedOptions}
              className={cn(
                "flex-1 px-1.5 py-0 h-6 rounded text-sm font-normal leading-[22px] border-0 bg-transparent",
                hasSelectedOptions
                  ? "text-gray-600 hover:text-gray-800"
                  : "text-gray-400 cursor-not-allowed",
              )}
              style={{
                fontFamily:
                  "Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif",
                color: hasSelectedOptions
                  ? "rgba(0, 0, 0, 0.88)"
                  : "rgba(0, 0, 0, 0.25)",
              }}
            >
              リセット
            </button>
            <button
              onClick={handleOk}
              className="flex-1 px-1.5 py-0 h-6 rounded text-sm font-normal leading-[22px] text-white border-0"
              style={{
                backgroundColor: "#1677FF",
                boxShadow: "0 2px 0 0 rgba(5, 145, 255, 0.10)",
                fontFamily:
                  "Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

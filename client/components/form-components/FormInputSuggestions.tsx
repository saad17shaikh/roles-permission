import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { useRef, useState, useMemo } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface FormProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  className?: string;
  type: string;
  disabledStr?: string;
  disable?: boolean;
  isRequired?: boolean;
  route: string;
  searchQuery: any;
  fieldName: any;
  fieldValue: any;
  isEntryPage?: boolean;
  customHandleClick?: (item: any) => void;
  customHandleBlur?: () => void;
}

const FormInputSuggestions = ({
  form,
  name,
  label,
  placeholder,
  className,
  type,
  isRequired,
  disable,
  route,
  searchQuery,
  fieldName,
  fieldValue,
  isEntryPage,
  customHandleClick,
  customHandleBlur,
}: FormProps) => {
  const { debouncedValue } = useDebounce({
    searchquery: searchQuery,
    route,
    delayValue: 500,
  });
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const suggestionsListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = (item: any) => {
    if (form.formState?.errors[name]?.message) {
      form.clearErrors(name);
    }
    form.setValue(name, item[fieldValue]);
    setIsDropdownOpen(false);
    if (customHandleClick) {
      customHandleClick(item);
    }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (debouncedValue.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === debouncedValue.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex <= 0 ? debouncedValue.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleClick(debouncedValue[highlightedIndex]);
      }
    }

    // Scroll to the highlighted suggestion
    if (suggestionsListRef.current && highlightedIndex >= 0) {
      const suggestionElement = suggestionsListRef.current.children[
        highlightedIndex
      ] as HTMLDivElement;
      suggestionElement?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const inputValue = useMemo(() => form.getValues(name), [form, name]);
  const handleFocus = () => {
    if (debouncedValue.length > 0) {
      setIsDropdownOpen(true);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(name, e.target.value);
    setIsDropdownOpen(true);
    if (e.target.value === "") {
      setIsDropdownOpen(false);
    } else {
      setHighlightedIndex(-1); // Reset the highlighted index when the input changes
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 200);
    if (customHandleBlur) {
      customHandleBlur();
    }
  };

  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn(className, "mb-3  space-y-0.5")}>
            <FormLabel
              className={`${
                isEntryPage ? "md:text-sm" : "md:text-base"
              }  text-gray-800 dark:text-gray-300`}
            >
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disable}
                className={`bg-gray-200 dark:bg-gray-700 border-none dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-100/50 outline-none focus:!outline-rose-400 ${
                  isEntryPage ? "text-xs h-7" : ""
                }`}
                onChange={handleInputChange}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                ref={inputRef}
              />
            </FormControl>
            <FormMessage
              className={`${
                isEntryPage ? "text-xs tracking-wider" : " tracking-wider"
              }`}
            />
          </FormItem>
        )}
      />
      <div className="relative">
        {isDropdownOpen && debouncedValue.length > 0 && (
          <div
            className="absolute max-h-[300px] cbar overflow-auto left-0 mt-1 z-50 w-full bg-white shadow-lg"
            ref={suggestionsListRef}
          >
            {debouncedValue.map((item: any, i) => (
              <div
                key={i}
                className={cn(
                  `cursor-pointer border-b p-2 border-gray-200 text-sm hover:bg-gray-200 ${
                    isEntryPage && "text-sm p-1"
                  }`,
                  i === highlightedIndex && "bg-gray-300"
                )}
                onClick={() => handleClick(item)}
              >
                <span
                  className={`${isEntryPage ? "text-xs tracking-wider " : ""}`}
                >
                  {" "}
                  {item[fieldName]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInputSuggestions;

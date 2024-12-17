import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
interface SelectProps {
  name: string;
  form: any;
  label: string;
  placeholder: string;
  children: React.ReactNode;
  isRequired?: boolean;
  disabled?: boolean;
  isEntryPage?: boolean;
  className?: string;
  dataSource?: string;
}

const SelectComp = ({
  name,
  label,
  form,
  children,
  placeholder,
  isRequired,
  disabled,
  isEntryPage,
  className,
  dataSource,
}: SelectProps) => {
  return (
    <div className={cn("", className)}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="mb-1 space-y-0.5">
            <FormLabel
              className={`${
                isEntryPage ? "md:text-xs" : "text-base"
              }  text-gray-800 dark:text-gray-300 whitespace-nowrap`}
            >
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              disabled={disabled}
            >
              <FormControl>
                <div className="relative ">
                  <SelectTrigger
                    className={`border border-none  ${
                      isEntryPage ? "h-7 text-[0.80rem] " : ""
                    } bg-gray-200 dark:border-gray-700 capitalize focus:!outline-main-color dark:bg-gray-700 ${
                      disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={disabled}
                  >
                    {field.value ? (
                      <SelectValue
                        placeholder={placeholder}
                        className="text-xs "
                      />
                    ) : (
                      `${placeholder}`
                    )}
                  </SelectTrigger>
                </div>
              </FormControl>
              <SelectContent className="dark:bg-gray-900 p-3 capitalize">
                {children}
              </SelectContent>
            </Select>
            <FormMessage
              className={`${
                isEntryPage ? "text-xs tracking-wider" : " tracking-wider"
              }`}
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SelectComp;

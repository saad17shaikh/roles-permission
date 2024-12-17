import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { RiEyeCloseFill } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormProps = {
  form: UseFormReturn<z.infer<any>>;
  name: string;
  label: string;
  placeholder: string;
  className?: string;
  type: string;
  disabledStr?: string;
  disable?: boolean;
  isRequired?: boolean;
  isEntryPage?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const FormInput = ({
  form,
  name,
  label,
  placeholder,
  className,
  type,
  isRequired,
  disable,
  isEntryPage,
  onBlur,
}: FormProps) => {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          const value = parseFloat(e.target.value);
          if (type === "number" && value < 0) {
            e.target.value = "0"; // Reset to 0 if the value is negative
            field.onChange("0"); // Directly update the field value
          }
          if (onBlur) onBlur(e);
        };

        return (
          <FormItem className={cn`${isEntryPage ? "" : "md:mb-3"}`}>
            <FormLabel
              className={`${
                isEntryPage ? "md:text-xs" : "md:text-base"
              } text-gray-800 dark:text-gray-300 whitespace-nowrap cursor-text`}
            >
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              {type === "password" ? (
                <div className="relative">
                  <Input
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    {...field}
                    className="bg-gray-200 dark:bg-gray-700 border-none dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-100/50 !outline-main-color"
                  />
                  {show ? (
                    <BsEyeFill
                      className="absolute right-2 top-3 cursor-pointer w-5 h-5 dark:text-gray-200 text-gray-600"
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <RiEyeCloseFill
                      className="absolute right-2 top-3 cursor-pointer w-5 h-5 dark:text-gray-200 text-gray-600"
                      onClick={() => setShow(!show)}
                    />
                  )}
                </div>
              ) : (
                <Input
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  disabled={disable}
                  onBlur={type === "number" ? handleBlur : onBlur}
                  min={type === "number" ? "0" : undefined}
                  step="any" // Allows decimal values if needed
                  className={`bg-gray-200 dark:bg-gray-700 border-none dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-100/50 outline-none focus:!outline-main-color ${
                    isEntryPage ? "h-7 text-xs" : ""
                  }`}
                />
              )}
            </FormControl>
            <FormMessage
              className={`${
                isEntryPage ? "text-xs tracking-wider" : "tracking-wider"
              }`}
            />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;

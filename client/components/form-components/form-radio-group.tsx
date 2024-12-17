"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// import { InvoiceSchema } from "@/lib/zodSchema";
import { cn } from "@/lib/utils";

interface RadioGroupFormProps {
  label: string;
  radioGroupItem: { value: any; label: string; className?: string }[];
  form: UseFormReturn<z.infer<any>>;
  name: string;
  className?: string;
  isHtmlStyle?: boolean;
  isRequired?: boolean;
}

export function RadioGroupForm({
  label,
  radioGroupItem,
  form,
  name,
  className,
  isHtmlStyle,
  isRequired,
}: RadioGroupFormProps) {
  const value = form.watch(name);
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className="mt-1 whitespace-nowrap">
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={cn("", className)}
              >
                {radioGroupItem.map((item) => {
                  return (
                    <FormItem
                      key={item.value}
                      className={`${
                        isHtmlStyle && "flex items-center space-x-2 space-y-0"
                      } `}
                    >
                      <FormControl className={``}>
                        <RadioGroupItem
                          value={item.value}
                          className={`${isHtmlStyle ? "block" : "hidden"}`}
                        />
                      </FormControl>
                      {isHtmlStyle ? (
                        <FormLabel htmlFor={item.value}>{item.label}</FormLabel>
                      ) : (
                        <FormLabel
                          className={cn(
                            `py-1 rounded-md px-4 cursor-pointer border-2 hover:border-2 hover:border-main-color duration-200  ${
                              value === item.value &&
                              "bg-main-color text-white duration-200 border-none"
                            }`,
                            item.className
                          )}
                        >
                          {item.label}
                        </FormLabel>
                      )}
                    </FormItem>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-xs"/>
          </FormItem>
        )}
      />
    </>
  );
}

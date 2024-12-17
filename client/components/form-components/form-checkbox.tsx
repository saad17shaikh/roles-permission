import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
interface CheckBoxesCompProps {
  data: any[];
  form: UseFormReturn<any, any, undefined>;
  label: string;
  valueName: string;
  labelName: string;
  name: string;
  className?: string;
}
const CheckBoxesComp = ({
  data,
  form,
  name,
  label,
  valueName,
  labelName,
  className,
}: CheckBoxesCompProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="bulletin_def"
        render={() => (
          <FormItem className={cn("space-y-0.5 mb-3 h-full")}>
            <FormLabel className="text-base text-gray-800  dark:text-gray-300">
              {label} <span className="text-rose-400"></span>
            </FormLabel>
            <div
              className={cn(
                " grid grid-cols-4 gap-y-2  bg-gray-200 py-3 rounded-md px-3 max-h-full overflow-auto",
                className
              )}
            >
              {data &&
                data.map((item) => {
                  return (
                    <div className="" key={item[valueName]}>
                      <FormField
                        key={item[valueName]}
                        control={form.control}
                        name={name}
                        render={({ field }) => {
                          return (
                            <div className="grid grid-cols-2">
                              <FormItem
                                key={item[valueName]}
                                className="flex items-start  space-x-3 space-y-0 capitalize "
                              >
                                <FormControl className="">
                                  <Checkbox
                                    checked={field.value?.includes(
                                      item[valueName]
                                    )}
                                    onCheckedChange={(checked: any) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item[valueName],
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value: any) =>
                                                value !== item[valueName]
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item[labelName]}
                                </FormLabel>
                              </FormItem>
                            </div>
                          );
                        }}
                      />
                    </div>
                  );
                })}
            </div>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CheckBoxesComp;

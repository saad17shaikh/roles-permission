"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface SingleCheckBoxProps {
  form: any;
  label: string;
  name: string;
  className?: string;
}
const SingleCheckBox = ({
  form,
  label,
  name,
  className,
}: SingleCheckBoxProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem
            className={cn(
              "flex flex-row items-start space-x-3 space-y-0 rounded-md  p-2",
              className
            )}
          >
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-medium">{label}</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default SingleCheckBox;

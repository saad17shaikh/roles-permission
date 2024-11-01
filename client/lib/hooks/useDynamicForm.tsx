//The useDynamicForm hook is a utility for creating and managing dynamic forms in React using React Hook Form and Zod for schema validation

// Arguments
// schema (z.ZodType<any, any>):
// A Zod schema object used for validating the form fields. The schema defines the shape and constraints of the form data.
// defaultValues (z.infer<T>):
// The default values for the form fields, inferred from the provided Zod schema. These values are used to initialize the form.

import { useState, useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const useDynamicForm = <T extends z.ZodType<any, any>>(
  schema: T,
  defaultValues: z.infer<T>
) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form: UseFormReturn<z.infer<T>> = useForm<z.infer<T>>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  return {
    open,
    setOpen,
    isPending,
    startTransition,
    form,
  };
};

export default useDynamicForm;

import { DynamicFormFieldType } from "@/lib/type";
import { SelectItem } from "../ui/select";
import FormInput from "./form-input";
import SelectComp from "./form-select";

interface FormDynamicFieldsProps {
  fields: DynamicFormFieldType[];
  form: any;
}
export const FormDynamicFields: React.FC<FormDynamicFieldsProps> = ({
  fields,
  form,
}) => {
  return (
    <>
      {fields.map((item) => {
        let componentToRender;

        switch (item.input_type) {
          case "input":
            componentToRender = (
              <FormInput
                form={form}
                label={item.label}
                name={item.name}
                placeholder={item.placeholder}
                type={item.type}
                isRequired
                disable={item.disable ? item.disable : false}
              />
            );
            break;
          case "select":
            componentToRender = (
              <SelectComp
                form={form}
                label={item.label}
                name={item.name}
                placeholder={item.placeholder}
                isRequired
                disabled={item.disable ? item.disable : false}
              >
                {item?.select_comp_data &&
                  item?.select_comp_data?.map((sel) => {
                    return (
                      <SelectItem
                        value={sel?.[item.select_comp_value as string]}
                        key={sel?.[item.select_comp_value as string]}
                      >
                        {sel?.[item.select_comp_label as string]}
                      </SelectItem>
                    );
                  })}
                {/* */}
              </SelectComp>
            );
        }
        return componentToRender;
      })}
    </>
  );
};

export interface DynamicFormFieldType {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  disable?: boolean;
  input_type: "input" | "select";
  select_comp_data?: any[];
  select_comp_value?: string;
  select_comp_label?: string;
}

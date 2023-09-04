export interface IModel {
    name: string;
    app_label: string;
    icon: string;
}

export interface WidgetAtts {
    maxlength: string
  }

export interface IFormField  {
  field: string
  label: string
  value: string | number | null
  widget_atts: WidgetAtts
  required: boolean
  widget: "NumberInput" | "DateInput" | "Select" | "TextInput" | "TinyMCE"
  css_class: string
  type: string
  errors: any
  choices: null | [number|string, string][]
}

export interface IFieldError {
    message: string
    code: string
}

export interface IFormAttrs {
    string: string
}

export interface IForm {
    fields: {string: IFormField}
    errors: {string: IFieldError[]}
    attrs: IFormAttrs
}

export interface IModelField {
    fname: string;
    flabel: string;
    ftype: string;
    rel: null | {
      model_name: string;
      app_label: string;
    }
  }

export interface IListResponseData <T> {
    count: number;
    page: T[];
}

export interface IAddEditResponseData {
    id?: number;
    form?: IForm;
    model?: IModel
}

export interface IDetailResponseData <T>{
    instance: T;
    model: IModel;
    fields: IModelField[]
}
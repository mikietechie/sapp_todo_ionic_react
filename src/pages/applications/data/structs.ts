export interface IProject {
    id: number;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
    name: string
    fee: number
    invoice_purpose: string
    application_document: string
    about: string
    active: boolean
}

export interface IProgram {
    id: number;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
    name: string
    fee: number
    invoice_purpose: string
    project: number
    application_document: string
    about: string
    scores_minimum: number
    start: string
    deadline: string
    end: string
    final_stage: number
    scores_required: number[]
}

export interface IScore {
    id: number;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
    name: string
    fee: number
    invoice_purpose: string
    program: number
    application_document: string
    about: string
    weight: number
    max_value: number
    pass_value: number
}

export interface IStage {
    id: number;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
    name: string
    program: number
    number: number
    about: string
    next_stage: number
    scores_minimum: number
    scores_required: number[]
}

export interface IApplicant {
    id: number;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
    user: number
    full_name: string
    image: string
    about: string
    email: string
    phone: string
    gender: string
    DOB: string
}

export interface IApplication {
    id: number;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
    applicant: number
    program: number
    stage: number | null
    application_document: string | null
    about: string | null
    score: number | null
}

export interface IApplicationScore {
    id: number;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
    application: number
    score: number
}

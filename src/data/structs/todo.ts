export interface IList {
    id: number;
    name: string;
    desc?: string;
    icon?: string;
    default: boolean;
}

export interface IItem {
    id: number;
    subject: string;
    done: boolean;
    important: boolean;
    date: string | null;
    remind_at: string | null;
    priority: "Highest" | "High" | "Medium" | "Low" | "Lowest";
    creation_timestamp: string;
    edit_timestamp: string;
    details: string | null;
}

export interface IStep {
    id: number;
    title: string;
    done: boolean;
    item: number;
}
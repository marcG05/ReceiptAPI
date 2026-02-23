export interface IProject {
    project_id: string;
    project_name: string;
    description: string;
    start_date: Date;
    end_date?: Date;
    status: number;
    parent_project?: IProject;
    sub_project?: IProject[];
};
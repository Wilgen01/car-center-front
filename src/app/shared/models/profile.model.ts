export interface Profile {
    name:     string;
    email:    string;
    roles:    Role[];
}

export interface Role {
    id:   number;
    name: string;
}
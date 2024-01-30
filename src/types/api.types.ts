export interface User {
    name: string;   
    email: string;
    role: Role;
    created_at: string;
    updated_at: string;
    events?: Event[];
    event_id?: number;
    id?: number;
}

export enum Role {
    ADMIN = "ADMIN",
    UNVERIFIED = "UNVERIFIED",
    MEMBER = "MEMBER",
    GUEST = "GUEST",
    PARTICIPANT = "PARTICIPANT",
}

export const Roles = {
    ADMIN: "ADMIN",
    UNVERIFIED: "UNVERIFIED",
    MEMBER: "MEMBER",
    GUEST: "GUEST",
    PARTICIPANT: "PARTICIPANT",
};

export interface Event {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    users?: User[];
    expected_users?: User[];
    startDateDay?: string;
    startDateMonth?: string;
    startDateYear?: string;
    endDateDay?: string;
    endDateMonth?: string;
    endDateYear?: string;
}
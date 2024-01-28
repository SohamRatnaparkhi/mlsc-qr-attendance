export interface User {
    email: string;
    role: Role;
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

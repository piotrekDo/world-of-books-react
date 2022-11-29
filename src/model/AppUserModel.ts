export interface AppUserModel{
    id: number,
    username: string,
    userEmail: string,
    userRoles: string[],
    adult: boolean
}
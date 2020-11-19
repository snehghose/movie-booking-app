export interface Theatre {
    id?: string;
    name: string;
    city: City;
    address: string;
    totalSeats: number;
}

export enum City {
    DELHI = 'DELHI', 
    MUMBAI = 'MUMBAI', 
    KOLKATA = 'KOLKATA', 
    CHENNAI = 'CHENNAI', 
    BANGALORE = 'BANGALORE'
}
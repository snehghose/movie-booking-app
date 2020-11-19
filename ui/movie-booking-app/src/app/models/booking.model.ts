export interface Booking {
    id?: string;
    userId: string;
    noOfSeats: number;
    theatreName: string;
    movieName: string;
    bookingDate?: Date;
    showId: string;
    total?: number;
    seat?: number;
}

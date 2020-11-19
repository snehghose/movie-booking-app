export interface Show {
    id?: string;
    movieId: string;
    theatreId: string;
    date: string;
    startTime: string;
    endTime?: string;
    remainingSeats?: number;
    ticketPrice: number;
}

export interface ShowMap {
    theatreId: string;
    shows: Show[];
}

export interface DisplayShow {
    show: Show;
    movie: string;
    theatre: string;
    time: string;
    sold: number;
}

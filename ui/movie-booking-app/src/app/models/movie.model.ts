export interface Movie {
    id?: string;
    name: string;
    image: string;
    genre: string[];
    language: Language;
    releaseDate: Date;
    duration: number[];
    rating: number;
    plot: string;
}

export enum Genre {
    ACTION = 'ACTION', 
    FANTASY = 'FANTASY', 
    SCIENCE_FICTION = 'SCIENCE_FICTION', 
    DRAMA = 'DRAMA', 
    HORROR = 'HORROR', 
    THRILLER = 'THRILLER'
}

export enum Language {
    ENGLISH = 'ENGLISH', 
    HINDI = 'HINDI'
}

export interface Time {
    hours: number;
    minutes: number;
}
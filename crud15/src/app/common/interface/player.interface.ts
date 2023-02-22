export interface Player {
    alias: string;
    id: string;
    name: string;
    decks: Deck[];
}

interface Deck {
    name: string
    cards: number
}
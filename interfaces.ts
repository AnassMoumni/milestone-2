//Interfaces
export interface Pokemon {
    id: number;
    name: string;
    description: string;
    height: number;
    isCaught: boolean;
    catchDate: string | null;
    imageUrl: string;
    types: string[];
    abilities: Ability[];
}

export interface Ability {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    isHidden: boolean;
}
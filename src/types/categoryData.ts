export type CategoryNames = 'Movies' | 'TV Shows' | 'Countries' | 'Capital Cities' | 'Animals' | 'Sports';

export type CategoryData = {
    categories: {
        [K in CategoryNames]: [
            {
                name: string;
                guessed: boolean;
            }
        ]
    }
}


export interface WordsStoreState {
    words: CategoryData['categories'] | null;
};
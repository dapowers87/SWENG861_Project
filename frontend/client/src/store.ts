import React from "react";
import IMusicSearch from "./types/IMusicSearch";


export interface IInitialState {
    MusicSearch: IMusicSearch;
}

export const initialState = {
    MusicSearch: {} as IMusicSearch
} as IInitialState

export const types = {
    SETMUSICSEARCH: 'SETMUSICSEARCH'
}

export const AppContext = React.createContext(initialState as any);

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case types.SETMUSICSEARCH: {
            return { ...state, MusicSearch: action.MusicSearch };
        }
    }
}
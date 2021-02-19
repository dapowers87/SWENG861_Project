import React from "react";
import { ArtistSearchResult } from "./types/ArtistSearchResult";
import IMusicSearch from "./types/IMusicSearch";
import { SongSearchResult } from "./types/SongSearchResult";


export interface IInitialState {
    MusicSearch: IMusicSearch;
    ArtistSearchResults: ArtistSearchResult|undefined;
    SongSearchResults: SongSearchResult|undefined;
}

export const initialState = {
    MusicSearch: {} as IMusicSearch,
    ArtistSearchResults: undefined,
    SongSearchResults: undefined
} as IInitialState

export const types = {
    SETMUSICSEARCH: 'SETMUSICSEARCH',
    SETARTISTSEARCHRESULTS: 'SETARTISTSEARCHRESULTS',
    SETSONGSEARCHRESULTS: 'SETSONGSEARCHRESULTS'
}

export const AppContext = React.createContext(initialState as any);

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case types.SETMUSICSEARCH: {
            return { ...state, MusicSearch: action.MusicSearch };
        }
        case types.SETARTISTSEARCHRESULTS: {
            return { ...state, ArtistSearchResults: action.ArtistSearchResults, SongSearchResults: undefined };
        }
        case types.SETSONGSEARCHRESULTS: {
            return { ...state, SongSearchResults: action.SongSearchResults, ArtistSearchResults: undefined };
        }
    }
}
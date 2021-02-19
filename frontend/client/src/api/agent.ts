import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ArtistSearchResult } from "../types/ArtistSearchResult";
import { SongSearchResult } from "../types/SongSearchResult";

axios.defaults.baseURL = `http://localhost:5000/api`;

axios.interceptors.response.use(undefined, (error: any) => {
    if(error.response.status === 500) {
        toast.error('Unexpected Backend Error');
    } else if(error.response.status === 404) {
        return Promise.reject(null);
    }
});

const responseBody = async (response: AxiosResponse) =>( await response.data );

const requests = {
    get: async (url: string) =>
        await axios
            .get(url)
            .then(responseBody)
            .catch((e: any) => {
                console.log(e);
            }),
    post: async (url: string, body: {}) =>
        await axios
            .post(url, body)
            .then(responseBody, (value: AxiosResponse) => {
                if (value.data)
                    return value.data;
                else
                    return value;
            })
            .catch((e: any) => {
                console.log(e);
            }),
    put: async (url: string, body: {}) =>
        await axios
            .put(url, body)
            .then(responseBody)
            .catch((e: any) => {
                console.log(e);
            }),
    del: async (url: string) => 
        await axios
            .delete(url)
            .then((value: AxiosResponse) => {
                if (value.data)
                    return value.data;
                else
                    return value.status;
            })
            .catch((e: any) => {
                console.log(e);
            })
};

const Song = {
    search: async (artistName: string, songName: string) => await requests.get(`/MusicSearch/GetSongInformation?artistName=${artistName}&songName=${songName}`) as SongSearchResult
}

const Artist = {
    search: async (artistName: string) => await requests.get(`/MusicSearch/GetArtistInformation?artistName=${artistName}`) as ArtistSearchResult
}

export default { Song, Artist };

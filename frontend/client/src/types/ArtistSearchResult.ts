export interface ArtistSearchResult {
    artistName: string,
    formationYear: string,
    disbandYear: string|null,
    numberOfMembers: string,
    genre: string,
    biography: string,
    logoUrl: string,
    thumbnailUrl: string,
    bandWebsiteUrl: string,
    brainzId: string,
    albums: ArtistAlbumSearchResult[]
}

export interface ArtistAlbumSearchResult {
    albumName: string,
    albumType: string,
    yearReleased: string,
    thumbnailUrl: string,
    description: string,
    brainzId: string
}
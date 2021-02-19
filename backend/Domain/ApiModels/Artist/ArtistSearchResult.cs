using System.Collections.Generic;

namespace Domain.ApiModels.Artist
{
    public class ArtistSearchResult
    {
        public string ArtistName { get; set; }
        public string FormationYear { get; set; }
        public string DisbandYear { get; set; }
        public string NumberOfMembers { get; set; }
        public string Genre { get; set; }
        public string Biography { get; set; }
        public string LogoUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public string BandWebsiteUrl { get; set; }
        public string BrainzId { get; set; }

        public List<ArtistAlbumSearchResult> Albums { get; set; }
    }

    public class ArtistAlbumSearchResult
    {
        public string AlbumName { get; set; }
        public string AlbumType { get; set; }
        public string YearReleased { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Description { get; set; }
        public string BrainzId { get; set; }
    }
}
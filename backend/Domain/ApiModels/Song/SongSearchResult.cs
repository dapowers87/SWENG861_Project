//This is the model that is returned to the frontend when searching for a song

namespace Domain.ApiModels.Song
{
    public class SongSearchResult
    {
        public string ArtistName { get; set; }
        public string SongName { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public string MusicVideoUrl { get; set; }
        public string Score { get; set; }
        public string ThumbnailUrl { get; set; }
        public string TotalPlays { get; set; }
        public string BrainzId { get; set; }
    }
}
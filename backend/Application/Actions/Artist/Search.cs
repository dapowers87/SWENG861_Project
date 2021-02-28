using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using RestSharp;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Dynamic;
using Domain.ApiModels.Artist;
using System.Collections;
using Newtonsoft.Json.Linq;

//This is the logic behind a search for artist information

namespace Application.Actions.Artist
{
    public class Search
    {
        public class Query : IRequest<ArtistSearchResult>
        {
            public string ArtistName { get; set; }
        }

        public class Handler : IRequestHandler<Query, ArtistSearchResult>
        {
            private readonly ILogger<Search> logger;
            private readonly IRestClient restClient;

            public Handler(ILogger<Search> logger, IRestClient restClient)
            {
                this.restClient = restClient;
                this.logger = logger;
            }

            public async Task<ArtistSearchResult> Handle(Query request, CancellationToken cancellationToken)
            {
                //Get the artist information from the AudioDB API
                restClient.BaseUrl = new Uri($"http://theaudiodb.com/api/v1/json/523532/search.php?s={request.ArtistName}");

                logger.LogInformation($"Connecting to {restClient.BaseUrl}");

                var restRequest = new RestRequest(Method.GET);
                restRequest.AddHeader("Content-Type", "application/json");
                IRestResponse<string> response = await restClient.ExecuteAsync<string>(restRequest, cancellationToken);

                ArtistSearchResult result;
                if (response.Content != null)
                {
                    dynamic artistObject = JsonConvert.DeserializeObject(response.Content);

                    if(artistObject.artists == null)
                    {
                        return null;
                    }

                    artistObject = artistObject.artists[0];

                    result = new ArtistSearchResult
                    {
                        ArtistName = artistObject.strArtist,
                        Biography = artistObject.strBiographyEN,
                        FormationYear = artistObject.intFormedYear,
                        DisbandYear = artistObject.intDiedYear,
                        Genre = artistObject.strGenre,
                        BandWebsiteUrl = artistObject.strWebsite,
                        NumberOfMembers = artistObject.intMembers,
                        BrainzId = artistObject.strMusicBrainzID,
                        LogoUrl = artistObject.strArtistLogo,
                        ThumbnailUrl = artistObject.strArtistThumb,
                        Albums = new List<ArtistAlbumSearchResult>()
                    };
                }
                else
                {
                    logger.LogError($"Did not receive content back from the external API for artist information. Error Message: {response.ErrorMessage}");
                    return null;
                }

                //Get the album information for an artist from the AudioDB API
                restClient.BaseUrl = new Uri($"http://theaudiodb.com/api/v1/json/523532/searchalbum.php?s={request.ArtistName}");

                logger.LogInformation($"Connecting to {restClient.BaseUrl}");

                restRequest = new RestRequest(Method.GET);
                restRequest.AddHeader("Content-Type", "application/json");
                response = await restClient.ExecuteAsync<string>(restRequest, cancellationToken);

                if (response.Content != null)
                {
                    JObject rawObject = JObject.Parse(response.Content);
                    var albumObject = rawObject["album"].Value<JArray>();

                    result.Albums.AddRange((albumObject.Select(album => 
                    {
                        return new ArtistAlbumSearchResult
                        {
                            AlbumName = album["strAlbum"] != null ? album["strAlbum"].Value<string>() : "",
                            AlbumType = album["strReleaseFormat"] != null ? album["strReleaseFormat"].Value<string>() : "",
                            Description = album["strDescriptionEN"] != null ? album["strDescriptionEN"].Value<string>() : "",
                            YearReleased = album["intYearReleased"] != null ? album["intYearReleased"].Value<string>() : "",
                            ThumbnailUrl = album["strAlbumThumb"] != null ? album["strAlbumThumb"].Value<string>() : "",
                            BrainzId = album["strMusicBrainzID"] != null ? album["strMusicBrainzID"].Value<string>() : ""
                        };
                    }
                    )));
                }
                else
                {
                    logger.LogError($"Did not receive content back from the external API for album data. Error Message: {response.ErrorMessage}");
                }

                return result;
            }
        }
    }
}
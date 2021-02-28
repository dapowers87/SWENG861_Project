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
using System.Collections;
using Newtonsoft.Json.Linq;
using Domain.ApiModels.Song;

//This is the logic behind a search for song information

namespace Application.Actions.Song
{
    public class Search
    {
        public class Query : IRequest<SongSearchResult>
        {
            public string ArtistName { get; set; }
            public string SongName { get; set; }
        }

        public class Handler : IRequestHandler<Query, SongSearchResult>
        {
            private readonly ILogger<Search> logger;
            private readonly IRestClient restClient;

            public Handler(ILogger<Search> logger, IRestClient restClient)
            {
                this.restClient = restClient;
                this.logger = logger;
            }

            public async Task<SongSearchResult> Handle(Query request, CancellationToken cancellationToken)
            {
                //This retreives the song information from the AudioDB API
                restClient.BaseUrl = new Uri($"http://theaudiodb.com/api/v1/json/523532/searchtrack.php?s={request.ArtistName}&t={request.SongName}");

                logger.LogInformation($"Connecting to {restClient.BaseUrl}");

                var restRequest = new RestRequest(Method.GET);
                restRequest.AddHeader("Content-Type", "application/json");
                IRestResponse<string> response = await restClient.ExecuteAsync<string>(restRequest, cancellationToken);

                SongSearchResult result;
                if (response.Content != null)
                {
                    dynamic songObject = JsonConvert.DeserializeObject(response.Content);

                    if(songObject.track == null)
                    {
                        return null;
                    }

                    songObject = songObject.track[0];

                    result = new SongSearchResult
                    {
                        ArtistName = songObject.strArtist,
                        SongName = songObject.strTrack,
                        Genre = songObject.strGenre,
                        Description = songObject.strDescriptionEN,
                        MusicVideoUrl = songObject.strMusicVid,
                        Score = songObject.intScore,
                        TotalPlays = songObject.intTotalPlays,
                        ThumbnailUrl = songObject.strTrackThumb,
                        BrainzId = songObject.strMusicBrainzID
                    };
                }
                else
                {
                    logger.LogError($"Did not receive content back from the external API for song information. Error Message: {response.ErrorMessage}");
                    return null;
                }

                return result;
            }
        }
    }
}
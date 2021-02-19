using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Domain.ApiModels.Artist;
using Application.Actions.Artist;
using MediatR;
using Domain.ApiModels.Song;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[Action]")]
    public class MusicSearchController : ControllerBase
    {

        private readonly ILogger<MusicSearchController> logger;
        private readonly IMediator mediator;

        public MusicSearchController(ILogger<MusicSearchController> logger, IMediator mediator)
        {
            this.logger = logger;
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<ArtistSearchResult>> GetArtistInformation(string artistName)
        {
            var result = await mediator.Send(new Application.Actions.Artist.Search.Query { ArtistName = artistName });

            if(result != null)
            {
                logger.LogInformation("Found results for artist {artistName}", artistName);
                return Ok(result);
            }

            logger.LogWarning("Found no results for artist {artistName}", artistName);
            return NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<SongSearchResult>> GetSongInformation(string artistName, string songName)
        {
            var result = await mediator.Send(new Application.Actions.Song.Search.Query { ArtistName = artistName, SongName = songName });

            if(result != null)
            {
                logger.LogInformation("Found results for artist/song combo {artistName}/{songName}", artistName, songName);
                return Ok(result);
            }

            logger.LogWarning("Found no results for artist/song combo {artistName}/{songName}", artistName, songName);
            return NotFound();
        }
    }
}

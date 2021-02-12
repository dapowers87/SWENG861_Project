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


namespace Application.Actions.Placeholder
{
    public class Placeholder
    {
        public class Command : IRequest<string>
        {
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly ILogger<Placeholder> logger;
            private readonly IRestClient restClient;

            public Handler(ILogger<Placeholder> logger, IRestClient restClient)
            {
                this.restClient = restClient;
                this.logger = logger;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                restClient.BaseUrl = new Uri($"aUrl");

                logger.LogInformation($"Connecting to {restClient.BaseUrl}");

                var restRequest = new RestRequest(Method.POST);
                restRequest.AddHeader("Content-Type", "application/json");
                IRestResponse<string> response = await restClient.ExecuteAsync<string>(restRequest, cancellationToken).ConfigureAwait(false);

                // UserModel result = null;
                if (response.Content != null)
                {
                    // result = JsonConvert.DeserializeObject<UserModel>(response.Content);
                }
                else
                {
                    logger.LogError($"Did not receive content back from the external API. Error Message: {response.ErrorMessage}");
                }

                return "result";
            }
        }
    }
}
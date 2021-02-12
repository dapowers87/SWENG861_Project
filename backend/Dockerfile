# FROM mcr.microsoft.com/dotnet/core/sdk:5.0 AS tester
#     WORKDIR /src
#     COPY . .
#     CMD ["dotnet", "test"]

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
    WORKDIR /app
    ENV ASPNETCORE_URLS https://+:443
    ENV ASPNETCORE_HTTPS_PORT=443
    EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder
    WORKDIR /src
    COPY API ./API
    COPY Domain ./Domain
    COPY Application ./Application
    RUN dotnet publish API/API.csproj -c Release -o /app

FROM base AS final
    WORKDIR /app
    COPY --from=builder /app .
    ENTRYPOINT ["dotnet", "API.dll"]
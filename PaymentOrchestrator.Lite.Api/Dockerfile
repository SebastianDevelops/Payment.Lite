FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Payment.Orchestrator.Lite.Api/Payment.Orchestrator.Lite.Api.csproj", "Payment.Orchestrator.Lite.Api/"]
RUN dotnet restore "Payment.Orchestrator.Lite.Api/Payment.Orchestrator.Lite.Api.csproj"
COPY . .
WORKDIR "/src/Payment.Orchestrator.Lite.Api"
RUN dotnet build "./Payment.Orchestrator.Lite.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Payment.Orchestrator.Lite.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Payment.Orchestrator.Lite.Api.dll"]
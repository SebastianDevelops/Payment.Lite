FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
RUN mkdir -p /app/Data && chown -R $APP_UID /app/Data
USER $APP_UID
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["PaymentOrchestrator.Lite.Api/PaymentOrchestrator.Lite.Api.csproj", "PaymentOrchestrator.Lite.Api/"]
RUN dotnet restore "PaymentOrchestrator.Lite.Api/PaymentOrchestrator.Lite.Api.csproj"
COPY . .
WORKDIR "/src/PaymentOrchestrator.Lite.Api"
RUN dotnet build "PaymentOrchestrator.Lite.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "PaymentOrchestrator.Lite.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:80
ENTRYPOINT ["dotnet", "PaymentOrchestrator.Lite.Api.dll"]

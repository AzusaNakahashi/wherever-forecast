export type DataSets = {};

export type ParentCity = {
  Key: string;
  LocalizedName: string;
  EnglishName: string;
};

export type City = {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  Country: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
  };
  TimeZone: {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: string;
  };
  GeoPosition: {
    Latitude: number;
    Longitude: number;
    Elevation: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
  };
  IsAlias: boolean;
  ParentCity?: ParentCity | string;
  SupplementalAdminAreas: {
    Level: number;
    LocalizedName: string;
    EnglishName: string;
  };
  DataSets:
    | Array<string>
    | {
        Key: string;
        StationCode: string;
        StationGmtOffset: number;
        BandMap: string;
        Climo: string;
        LocalRadar: string;
        MediaRegion: string;
        Metar: string;
        NXMetro: string;
        NXState: string;
        Population: number;
        PrimaryWarningCountyCode: string;
        PrimaryWarningZoneCode: string;
        Satellite: string;
        Synoptic: string;
        MarineStation: string;
        MarineStationGMTOffset: number;
        VideoCode: string;
        PartnerID: number;
        DMA: {
          ID: string;
          EnglishName: string;
        };
        Sources: {
          DataType: string;
          Source: string;
          SourceId: number;
        };
        CanonicalPostalCode: string;
        CanonicalLocationKey: string;
        LocationStem: string;
      };
};

export type HourlyWeather = {
  DateTime: string;
  EpochDateTime: number;
  WeatherIcon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  IsDaylight: boolean;
  Temperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  RealFeelTemperature: {
    Value: number;
    Unit: string;
    UnitType: number;
    Phrase: string;
  };
  RealFeelTemperatureShade: {
    Value: number;
    Unit: string;
    UnitType: number;
    Phrase: string;
  };
  WetBulbTemperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  DewPoint: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Wind: {
    Speed: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Direction: {
      Degrees: number;
      Localized: string;
      English: string;
    };
  };
  WindGust: {
    Speed: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  Visibility: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Ceiling: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  UVIndex: number;
  UVIndexText: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  TotalLiquid: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Rain: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Snow: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Ice: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  CloudCover: number;
  Evapotranspiration: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  SolarIrradiance: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  MobileLink: string;
  Link: string;
};

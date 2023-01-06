export type CurrentWeather = {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
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
  RealFeelTemperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
      Phrase: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
      Phrase: string;
    };
  };
  RealFeelTemperatureShade: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
      Phrase: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
      Phrase: string;
    };
  };
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  DewPoint: {
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
  Wind: {
    Direction: {
      Degrees: number;
      Localized: string;
      English: string;
    };
    Speed: {
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
  WindGust: {
    Speed: {
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
  UVIndex: number;
  UVIndexText: string;
  Visibility: {
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
  ObstructionsToVisibility: string;
  CloudCover: number;
  Ceiling: {
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
  Pressure: {
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
  PressureTendency: {
    LocalizedText: string;
    Code: string;
  };
  Past24HourTemperatureDeparture: {
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
  ApparentTemperature: {
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
  WindChillTemperature: {
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
  WetBulbTemperature: {
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
  Precip1hr: {
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
  PrecipitationSummary: {
    Precipitation: {
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
    PastHour: {
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
    Past3Hours: {
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
    Past6Hours: {
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
    Past9Hours: {
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
    Past12Hours: {
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
    Past18Hours: {
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
    Past24Hours: {
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
  TemperatureSummary: {
    Past6HourRange: {
      Minimum: {
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
      Maximum: {
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
    Past12HourRange: {
      Minimum: {
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
      Maximum: {
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
    Past24HourRange: {
      Minimum: {
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
      Maximum: {
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
  };
  MobileLink: string;
  Link: string;
};

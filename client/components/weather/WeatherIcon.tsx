import Image from "next/image";
import SunnyIcon from "../../public/weather-icons/sunny.svg";
import partlySunnyIcon from "../../public/weather-icons/partlySunny.svg";
import mostlySunnyIcon from "../../public/weather-icons/mostlySunny.svg";
import mostlyCloudyIcon from "../../public/weather-icons/mostlyCloudy.svg";
import CloudyIcon from "../../public/weather-icons/cloudy.svg";
import RainIcon from "../../public/weather-icons/rain.svg";
import TStormIcon from "../../public/weather-icons/tStorm.svg";
import SnowIcon from "../../public/weather-icons/snow.svg";
import WindyIcon from "../../public/weather-icons/windy.svg";
import HotIcon from "../../public/weather-icons/hot.svg";
import HazyIcon from "../../public/weather-icons/hazy.svg";
import FogIcon from "../../public/weather-icons/fog.svg";
import ClearIcon from "../../public/weather-icons/clear.svg";
import PartlyCloudyIcon from "../../public/weather-icons/partlyCloudy.svg";
import nightShowersIcon from "../../public/weather-icons/nightShowers.svg";

const WeatherIcon = ({
  iconPhrase,
  iconHeight,
}: {
  iconPhrase: string;
  iconHeight: number;
}) => {
  switch (iconPhrase) {
    case "sunny":
      return <Image src={SunnyIcon} height={iconHeight} alt="sunny icon" />;
    case "mostlySunny":
      return (
        <Image
          src={mostlySunnyIcon}
          height={iconHeight}
          alt="mostly sunny icon"
        />
      );
    case "partlySunny":
      return (
        <Image
          src={partlySunnyIcon}
          height={iconHeight}
          alt="partly sunny icon"
        />
      );
    case "intermittentClouds":
      return (
        <Image
          src={partlySunnyIcon}
          height={iconHeight}
          alt="intermittent clouds icon"
        />
      );
    case "hazy":
      return <Image src={HazyIcon} height={iconHeight} alt="hazy icon" />;
    case "mostlyCloudy":
      return (
        <Image
          src={mostlyCloudyIcon}
          height={iconHeight}
          alt="mostly cloudy icon"
        />
      );
    case "cloudy":
      return <Image src={CloudyIcon} height={iconHeight} alt="cloudy icon" />;
    case "overcast":
      return <Image src={CloudyIcon} height={iconHeight} alt="overcast icon" />;
    case "rain":
      return <Image src={RainIcon} height={iconHeight} alt="rain icon" />;
    case "tStorms":
      return (
        <Image src={TStormIcon} height={iconHeight} alt="thunder storm icon" />
      );
    case "snow":
      return <Image src={SnowIcon} height={iconHeight} alt="snow icon" />;
    case "hot":
      return <Image src={HotIcon} height={iconHeight} alt="hot icon" />;
    case "cold":
      return <Image src={SnowIcon} height={iconHeight} alt="cold icon" />;
    case "windy":
      return <Image src={WindyIcon} height={iconHeight} alt="windy icon" />;
    case "fog":
      return <Image src={FogIcon} height={iconHeight} alt="fog icon" />;
    case "clear":
      return <Image src={ClearIcon} height={iconHeight} alt="clear icon" />;
    case "partlyCloudy":
      return (
        <Image
          src={PartlyCloudyIcon}
          height={iconHeight}
          alt="partly cloudy icon"
        />
      );
    case "nightShowers":
      return (
        <Image
          src={nightShowersIcon}
          height={iconHeight}
          alt="night showers icon"
        />
      );
    case "nightTStorms":
      return (
        <Image
          src={TStormIcon}
          height={iconHeight}
          alt="night thunder storms icon"
        />
      );
    case "nightFlurries":
      return (
        <Image
          src={nightShowersIcon}
          height={iconHeight}
          alt="night flurries icon"
        />
      );
    default:
      return <Image src={SunnyIcon} height={iconHeight} alt="sunny icon" />;
  }
};

export default WeatherIcon;

export default function sortImageCategory(iconNumber: number): string {
  switch (iconNumber) {
    case 1:
      return "sunny";
    case 2:
      return "mostlySunny";
    case 3:
      return "partlySunny";
    case 4:
      return "intermittentClouds";
    case 5:
      return "hazy";
    case 6:
      return "mostlyCloudy";
    case 7:
      return "cloudy";
    case 8:
      return "overcast";
    case 11:
      return "fog";
    case 12:
      return "rain";
    case 13:
      return "rain";
    case 14:
      return "rain";
    case 15:
      return "tStorms";
    case 16:
      return "tStorms";
    case 17:
      return "tStorms";
    case 18:
      return "rain";
    case 19:
      return "snow";
    case 20:
      return "snow";
    case 21:
      return "snow";
    case 22:
      return "snow";
    case 23:
      return "snow";
    case 24:
      return "snow";
    case 25:
      return "snow";
    case 26:
      return "rain";
    case 27:
      return "snow";
    case 29:
      return "snow";
    case 30:
      return "hot";
    case 31:
      return "cold";
    case 32:
      return "windy";
    case 33:
      return "clear";
    case 34:
      return "partlyCloudy";
    case 35:
      return "partlyCloudy";
    case 36:
      return "partlyCloudy";
    case 37:
      return "partlyCloudy";
    case 38:
      return "partlyCloudy";
    case 39:
      return "nightShowers";
    case 40:
      return "nightShowers";
    case 41:
      return "nightTStorms";
    case 42:
      return "nightTStorms";
    case 43:
      return "nightFlurries";
    case 44:
      return "nightFlurries";
    default:
      return "category undifined";
  }
}

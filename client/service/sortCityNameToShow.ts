import type { City } from "../types/city";

const isLetter = (str: string) => {
  if (str) {
    return (
      (str.length === 2 && str.match(/[A-Z]+[A-Z]/g)) ||
      (str.length === 3 && str.match(/[A-Z]+[A-Z]+[A-Z]/g))
    );
  }
};

export default function sortCityNameToShow(city: City): string {
  const areaShortName = isLetter(city.AdministrativeArea?.ID);
  const areaLongName = city.AdministrativeArea?.EnglishName;
  const parentCityName = city.ParentCity?.EnglishName;
  const townName = city.EnglishName;

  if (parentCityName) {
    // if city ID is two/three capital letters (e.g. BC, NSW), show shortened name
    if (areaShortName) {
      return `${parentCityName}, ${areaShortName}`;
    }
    return `${parentCityName}, ${areaLongName}`;
  } else {
    if (areaShortName) {
      return `${townName}, ${areaShortName}`;
    }
    return `${townName}, ${areaLongName}`;
  }
}

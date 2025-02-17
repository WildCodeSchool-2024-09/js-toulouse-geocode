import sha256 from "crypto-js/sha256";
import type React from "react";
import { type FormEvent, useState } from "react";
import { useGeoPositionContext } from "../contexts/GeoPositionContextProvider";

interface CityProps {
  key: string;
  name: string;
  department: string;
  departmentCode: string;
  Latitude: number;
  Longitude: number;
}

interface CityPropsFromAPI {
  nom: string;
  departement: {
    nom: string;
    code: string;
  };
  centre: {
    coordinates: [number, number];
  };
}

const urlEncodedCharacters = {
  " ": "%20",
  "'": "%27",
  ",": "%2C",
  ".": "%2E",
  "/": "%2F",
  ":": "%3A",
  ";": "%3B",
  "=": "%3D",
  "?": "%3F",
  "@": "%40",
  "&": "%26",
  "+": "%2B",
  $: "%24",
  "#": "%23",
  "<": "%3C",
  ">": "%3E",
  '"': "%22",
  "{": "%7B",
  "}": "%7D",
  "|": "%7C",
  "\\": "%5C",
  "^": "%5E",
};

function QueryCity() {
  const [inputContent, setInputContent] = useState<string | null>(null);
  const geoPositionContext = useGeoPositionContext();
  const citiesOrigin = Array<CityProps>(0);

  const [cities, setCities] = useState(citiesOrigin);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setInputContent(event?.currentTarget?.value);

    const start = event?.currentTarget?.selectionStart;
    const end = event?.currentTarget?.selectionEnd;

    if (event?.currentTarget?.value) {
      let city = event?.currentTarget?.value;

      for (const [key, value] of Object.entries(urlEncodedCharacters)) {
        city = city.replace(key, value);
      }

      fetch(
        `https://geo.api.gouv.fr/communes?nom=${event?.currentTarget?.value}&fields=nom,departement,centre&limit=200`,
      )
        .then((response) => response.json())
        .then((cityNamesList) => {
          setCities(
            cityNamesList.map((cityName: CityPropsFromAPI) => {
              return {
                name: cityName.nom,
                key: sha256(
                  `${cityName.nom}|${cityName.departement.nom}|${cityName.centre.coordinates[0].toFixed(6)}-${cityName.centre.coordinates[1].toFixed(6)}`,
                )
                  .words.map((x) => x.toString(16).padStart(2, "0"))
                  .join(""),
                department: cityName.departement.nom,
                departmentCode: cityName.departement.code,
                Longitude: cityName.centre.coordinates[0],
                Latitude: cityName.centre.coordinates[1],
              };
            }),
          );
        });
    } else {
      setCities(citiesOrigin);
    }

    if (start !== undefined && end !== undefined) {
      setTimeout(() => {
        event?.currentTarget?.setSelectionRange(start, end);
      }, 0);
    }
  };

  const handleLiClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    if (event == null) {
      return;
    }
    if (event.currentTarget == null) {
      return;
    }

    const cityString = event.currentTarget.getAttribute("city-prop");
    if (cityString == null) {
      return;
    }

    const cityProps = JSON.parse(cityString as string) as CityProps;
    event.currentTarget.textContent = cityProps.name;
    geoPositionContext.setPosition({
      Latitude: cityProps.Latitude,
      Longitude: cityProps.Longitude,
    });
    window.sessionStorage.setItem(
      "position",
      JSON.stringify({
        Latitude: cityProps.Latitude,
        Longitude: cityProps.Longitude,
      }),
    );
    geoPositionContext.setDisplayQuery(false);
    geoPositionContext.setZoomLevel(16);
    setCities(Array<CityProps>(0));
    setInputContent("" as string);
  };

  const handleLiKeyDown = () => {};

  return geoPositionContext.displayQuery ? (
    <div className="query-city-container">
      <div className="query-city">
        <h2>Recherche par ville</h2>
        <div className="main">
          <p>Ville à rechercher:</p>
          <input
            type="text"
            value={inputContent ?? ""}
            onChange={handleChange}
            placeholder="Nom de ville..."
          />
          <ul>
            {cities.map((item) => {
              return (
                <li
                  key={item.key}
                  city-prop={JSON.stringify(item)}
                  onClick={handleLiClick}
                  onKeyDown={handleLiKeyDown}
                >
                  {`${item.name} (${item.department})`}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
}

export default QueryCity;

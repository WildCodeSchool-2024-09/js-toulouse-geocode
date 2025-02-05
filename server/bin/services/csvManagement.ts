import e from "express";
import Papa from "papaparse";
import type { CsvDataType } from "../../types/csvDataType";

type ElementFromCsv =
  | undefined
  | {
      code: string;
      codePostal: string;
      ville: string;
      departement: string;
      region: string;
      latitude: string;
      longitude: string;
    };

type cityInfo = {
  code: string;
  nom: string;
  departement: { nom: string };
  region: { nom: string };
  codesPostaux: Array<string>;
  code_postal: string | undefined;
};

type ExtendedCsvDataType = CsvDataType & {
  code_postal: string;
};

const convertCsvToJson = (csvFile: string) => {
  return new Promise((resolve) => {
    Papa.parse<CsvDataType>(csvFile, {
      header: true,
      complete: (results) => resolve(results.data),
    });
  });
};

const fetchData = async (lat: string, lng: string): Promise<ElementFromCsv> => {
  const [response, response2] = await Promise.all([
    fetch(
      `https://geo.api.gouv.fr/communes?lat=${lat}&lon=${lng}&fields=nom,code,departement,region,codesPostaux`,
    ),
    fetch(
      `https://geo.api.gouv.fr/communes?lat=${lng}&lon=${lat}&fields=nom,code,departement,region,codesPostaux`,
    ),
  ]);

  const [data, data2] = await Promise.all([response.json(), response2.json()]);

  let correctData = null;
  let latitude = null;
  let longitude = null;

  if (data.length === 0) {
    correctData = data2;
    latitude = lng;
    longitude = lat;
  } else {
    correctData = data;
    latitude = lat;
    longitude = lng;
  }

  if (correctData.length === 0) return undefined;

  const city = correctData[0].nom;
  const region = correctData[0].region.nom;
  const departement = correctData[0].departement.nom;
  const codePostal = correctData[0].codesPostaux[0];

  return {
    code: correctData[0].code,
    codePostal,
    ville: city,
    departement,
    region,
    latitude,
    longitude,
  };
};

const correctionData = async (
  elem: CsvDataType,
): Promise<ExtendedCsvDataType> => {
  let codePostal = "";
  try {
    const codeInseeRegex = /^\d{5}$|^2[AaBb]\d{3}$/;
    if (!elem.code_insee_commune.match(codeInseeRegex)) {
      if (elem.code_insee.match(codeInseeRegex)) {
        elem.code_insee_commune = elem.code_insee;
      } else {
        const index = indexOfFiveDigits(elem.ad_station);
        if (index !== -1) {
          codePostal = elem.ad_station.slice(index, index + 5);
          const response = await fetch(
            `https://geo.api.gouv.fr/communes?codePostal=${codePostal}&fields=code,nom,departement,region,codesPostaux`,
          );
          const data = await response.json();
          if (data.length !== 0) {
            elem.code_insee_commune = data[0].code;
            elem.code_insee = data[0].code;
            elem.ville = data[0].nom;
            elem.region = data[0].region.nom;
            elem.departement = data[0].departement.nom;
            codePostal = data[0].codesPostaux[0];
          }
        }
      }
    }
    if (!elem.code_insee_commune.match(codeInseeRegex)) {
      let correction: ElementFromCsv = undefined;

      if (elem.geo_point_borne !== "") {
        const lat = elem.geo_point_borne.split(",")[0];
        const lng = elem.geo_point_borne.split(",")[1];
        correction = await fetchData(lat, lng);
      } else if (elem.xlongitude !== "" && elem.ylatitude !== "") {
        correction = await fetchData(elem.ylatitude, elem.xlongitude);
      }

      if (correction !== undefined) {
        const geoCode = `${correction.latitude},${correction.longitude}`;
        elem.region = correction.region;
        elem.departement = correction.departement;
        elem.code_insee_commune = correction.code;
        elem.code_insee = correction.code;
        codePostal = correction.codePostal;
        elem.geo_point_borne = geoCode;
        elem.ylatitude = correction.latitude;
        elem.xlongitude = correction.longitude;
        elem.code_insee = correction.code;
        elem.ville = correction.ville;
      }
    }

    if (
      elem.ville === "" ||
      elem.ville === undefined ||
      elem.region === "" ||
      elem.region === undefined ||
      elem.departement === "" ||
      elem.departement === undefined ||
      codePostal === ""
    ) {
      const data = await queryCityData(elem.code_insee_commune);
      if (data.length !== 0) {
        elem.code_insee_commune = data[0].code;
        elem.code_insee = data[0].code;
        elem.ville = data[0].nom;
        elem.region = data[0].region.nom;
        elem.departement = data[0].departement.nom;
        codePostal =
          data[0].code_postal !== undefined
            ? data[0].code_postal
            : data[0].codesPostaux[0];
      }
    }

    if (elem.puiss_max === "") elem.puiss_max = "22.0";
    if (elem.nbre_pdc === "") elem.nbre_pdc = "1";

    return { ...elem, code_postal: codePostal };
  } catch (error) {}

  return { ...elem, code_postal: codePostal };
};

function indexOfFiveDigits(element: string): number {
  const regex = /^\d{5}$|^2[AaBb]\d{3}$/;
  const match = element.match(regex);
  return match ? element.indexOf(match[0]) : -1;
}
async function queryCityData(
  code_insee_commune: string,
): Promise<Array<cityInfo>> {
  let response = await fetch(
    `https://geo.api.gouv.fr/communes?code=${code_insee_commune}&fields=code,nom,departement,region,codesPostaux`,
  );
  let data = await response.json();
  if (data.length !== 0) {
    return data as Array<cityInfo>;
  }

  response = await fetch(
    `https://geo.api.gouv.fr/communes?codePostal=${code_insee_commune}&fields=code,nom,departement,region,codesPostaux`,
  );
  data = await response.json();
  data.code_postal = code_insee_commune;
  return data as Array<cityInfo>;
}

export { type ExtendedCsvDataType, convertCsvToJson, correctionData };

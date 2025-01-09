import Papa from "papaparse";
import type { CsvDataType } from "../../types/csvDataType";

const convertCsvToJson = (csvFile: File) => {
  return new Promise((resolve) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (results) => resolve(results.data),
      error: (error) => {
        console.error("Erreur :", error);
      },
    });
  });
};

const fetchData = async (lat: string, lng: string) => {
  const [response, response2] = await Promise.all([
    fetch(`https://geo.api.gouv.fr/communes?lat=${lat}&lon=${lng}`),
    fetch(`https://geo.api.gouv.fr/communes?lat=${lng}&lon=${lat}`),
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

  if (correctData.length === 0) return false;

  const codeRegion = correctData[0].codeRegion;

  const codeDepartement = correctData[0].codeDepartement;

  const [departementResponse, regionResponse] = await Promise.all([
    fetch(
      `https://geo.api.gouv.fr/departements?code=${codeDepartement}&fields=nom,code,codeRegion`,
    ),
    fetch(`https://geo.api.gouv.fr/regions/${codeRegion}`),
  ]);

  const [dataDepartement, dataRegion] = await Promise.all([
    departementResponse.json(),
    regionResponse.json(),
  ]);

  return {
    code: correctData[0].code,
    ville: correctData[0].nom,
    departement: dataDepartement[0].nom,
    region: dataRegion.nom,
    latitude,
    longitude,
  };
};

const correctionData = async (elem: CsvDataType) => {
  if (
    elem.region === "" ||
    elem.departement === "" ||
    elem.code_insee_commune === ""
  ) {
    if (elem.geo_point_borne !== "") {
      const lat = elem.geo_point_borne.split(",")[0];
      const lng = elem.geo_point_borne.split(",")[1];
      const correction = await fetchData(lat, lng);

      if (correction !== false) {
        const geoCode = `${correction.latitude},${correction.longitude}`;
        elem.region = correction.region;
        elem.departement = correction.departement;
        elem.code_insee_commune = correction.code;
        elem.geo_point_borne = geoCode;
        elem.ylatitude = correction.latitude;
        elem.xlongitude = correction.longitude;
        elem.code_insee = correction.code;
      }
    } else if (elem.xlongitude !== "" && elem.ylatitude !== "") {
      const correction = await fetchData(elem.ylatitude, elem.xlongitude);

      if (correction !== false) {
        const geoCode = `${correction.latitude},${correction.longitude}`;
        elem.region = correction.region;
        elem.departement = correction.departement;
        elem.code_insee_commune = correction.code;
        elem.geo_point_borne = geoCode;
        elem.ylatitude = correction.latitude;
        elem.xlongitude = correction.longitude;
        elem.code_insee = correction.code;
      }
    }
  }
  if (elem.puiss_max === "") elem.puiss_max = "22.0";
  if (elem.nbre_pdc === "") elem.nbre_pdc = "1";
  if (elem.code_insee === "" && elem.code_insee_commune === "") return elem;
  if (elem.code_insee.length !== 5) {
    elem.code_insee = elem.code_insee_commune;
  } else if (elem.code_insee_commune !== elem.code_insee) {
    elem.code_insee_commune = elem.code_insee;
  }
  return elem;
};

export { convertCsvToJson, correctionData };

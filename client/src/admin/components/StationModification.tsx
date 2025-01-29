import { useEffect, useRef, useState } from "react";
import { useModal } from "../contexts/ShowModalProvider";
import type { cityType } from "../types/itemType";

interface StationModificationProps {
  stationId: number | null;
}

function StationModification({ stationId }: StationModificationProps) {
  const { setDisplayStationModification } = useModal();
  const cityInputElement = useRef<HTMLInputElement>(null);
  const [operatorName, setOperatorName] = useState("");
  const [signName, setSignName] = useState("");
  const [providerName, setProviderName] = useState("");
  const [stationName, setStationName] = useState("");
  const [stationIdentifier, setStationIdentifier] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cities, setCities] = useState<cityType[]>([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [numberOfPdcs, setNumberOfPdcs] = useState(0);
  const [pdcName, setPdcName] = useState("");
  const [pdcPowerMax, setPdcPowerMax] = useState(0);
  const [pdcType, setPdcType] = useState("");
  const [accessCharging, setAccessCharging] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setDisplayStationModification(false);
  };

  const handleChangeOperator = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperatorName(event.target.value);
  };
  const handleChangeSign = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignName(event.target.value);
  };

  const handleChangeProvider = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProviderName(event.target.value);
  };
  const handleChangeStation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStationName(event.target.value);
  };

  const handleChangestationIdentifier = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStationIdentifier(event.target.value);
  };

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const isPostalCode = (value: string) => {
    return /^\d{5}$|^2[AaBb]\d{3}$/.test(value);
  };

  const handleChangePostalCode = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPostalCode(event.target.value);
    if (isPostalCode(event.target.value)) {
      fetch(
        `https://geo.api.gouv.fr/communes?codePostal=${event.target.value}&fields=nom,code,codeDepartement,codeRegion`,
      )
        .then((response) => response.json())
        .then((cityResponses: cityType[]) => {
          if (cityResponses.length !== 0) {
            setCities(cityResponses);
            if (cityInputElement.current) {
              cityInputElement.current.value = "";
            }
          }
        });
    }
  };

  const handleChangeLatitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(Number.parseFloat(event.target.value));
  };

  const handleChangeLongitude = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLongitude(Number.parseFloat(event.target.value));
  };

  const handleChangeNumberOfPdcs = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNumberOfPdcs(Number.parseInt(event.target.value, 10));
  };

  const handleChangePdcName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPdcName(event.target.value);
  };

  const handleChangePdcPowerMax = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPdcPowerMax(Number.parseFloat(event.target.value));
  };

  const handleChangePdcType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPdcType(event.target.value);
  };

  const handleChangeAccessCharging = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAccessCharging(event.target.value);
  };

  const handleChangeaccessibility = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAccessibility(event.target.value);
  };

  const handleChangeSource = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  const fetchUserInfos = () => {
    // Fetch user infos
    if (stationId == null) {
      return;
    }
  };

  useEffect(fetchUserInfos, []);
  return (
    <div className="station-modification-container">
      <article className="station-modification-dialog_box">
        <caption>
          <h2>Modification des données de la borne</h2>
          <button type="button" onClick={handleClose}>
            <img src="/images/close.svg" alt="close" />
          </button>
        </caption>
        <section>
          <form
            action={`${import.meta.env.VITE_API_URL}/api/users/${stationId}`}
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="group">
              <label htmlFor="operator-name">Nom</label>
              <input
                type="text"
                id="operator-name"
                name="operator_name"
                value={operatorName}
                onChange={handleChangeOperator}
              />
            </div>
            <div className="group">
              <label htmlFor="sign-name">Enseigne</label>
              <input
                type="text"
                id="sign-name"
                name="sign_name"
                value={signName}
                onChange={handleChangeSign}
              />
            </div>
            <div className="group">
              <label htmlFor="provider-name">Aménageur</label>
              <input
                type="text"
                id="provider-name"
                name="provider_name"
                value={providerName}
                onChange={handleChangeProvider}
              />
            </div>
            <div className="group">
              <label htmlFor="station-name">Nom de la borne</label>
              <input
                type="text"
                id="station-name"
                name="station_name"
                value={stationName}
                onChange={handleChangeStation}
              />
            </div>
            <div className="group">
              <label htmlFor="station-identifier">
                Indentifiant de la borne
              </label>
              <input
                type="text"
                id="station-identifier"
                name="station_identifier"
                value={stationIdentifier}
                onChange={handleChangestationIdentifier}
              />
            </div>
            <div className="group">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleChangeAddress}
              />
            </div>
            <div className="group">
              <label htmlFor="postal-code">Code postal</label>
              <input
                type="text"
                id="postal-code"
                name="postal_code"
                value={postalCode}
                onChange={handleChangePostalCode}
              />
            </div>
            <div className="group">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                name="city"
                list="cities"
                ref={cityInputElement}
                value={city}
                onChange={handleChangeCity}
              />
              <datalist id="cities">
                {cities.map((city) => (
                  <option key={city.code} value={city.nom} />
                ))}
              </datalist>
            </div>
            <div className="group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={latitude}
                onChange={handleChangeLatitude}
              />
            </div>
            <div className="group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={longitude}
                onChange={handleChangeLongitude}
              />
            </div>
            <div className="group">
              <label htmlFor="number-of-pdcs">Nombre de prises</label>
              <input
                type="text"
                id="number-of-pdcs"
                name="number_of_pdcs"
                value={numberOfPdcs}
                onChange={handleChangeNumberOfPdcs}
              />
            </div>
            <div className="group">
              <label htmlFor="pcd-name">Nom de la prise</label>
              <input
                type="text"
                id="pcd-name"
                name="pdc_name"
                value={pdcName}
                onChange={handleChangePdcName}
              />
            </div>
            <div className="group">
              <label htmlFor="pcd-power-max">Puissance maximale</label>
              <input
                type="text"
                id="pcd-power-max"
                name="pdc_power_max"
                value={pdcPowerMax}
                onChange={handleChangePdcPowerMax}
              />
            </div>
            <div className="group">
              <label htmlFor="pdc-type">Type de prise</label>
              <input
                type="text"
                id="pdc-type"
                name="pdc_type"
                value={pdcType}
                onChange={handleChangePdcType}
              />
            </div>
            <div className="group">
              <label htmlFor="access-charging">Accès à la recharge</label>
              <input
                type="text"
                id="access-charging"
                name="access_charging"
                value={accessCharging}
                onChange={handleChangeAccessCharging}
              />
            </div>
            <div className="group">
              <label htmlFor="accessibility">Accessibilité</label>
              <input
                type="text"
                id="accessibility"
                name="accessibility"
                value={accessibility}
                onChange={handleChangeaccessibility}
              />
            </div>
            <div className="group">
              <label htmlFor="source">Source</label>
              <input
                type="text"
                id="source"
                name="source"
                value={source}
                onChange={handleChangeSource}
              />
            </div>
          </form>
        </section>
      </article>
    </div>
  );
}

export default StationModification;

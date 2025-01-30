import { useEffect, useRef, useState } from "react";
import type { StationProps } from "../../../../server/common/types/StationProps";
import { useModal } from "../contexts/ShowModalProvider";
import type { cityType } from "../types/itemType";

interface StationModificationProps {
  stationId: number | null;
}

function StationModification({ stationId }: StationModificationProps) {
  const { setDisplayModification } = useModal();
  const cityInputElement = useRef<HTMLInputElement>(null);
  const operatorInputElement = useRef<HTMLInputElement>(null);
  const signInputElement = useRef<HTMLInputElement>(null);
  const providerInputElement = useRef<HTMLInputElement>(null);
  const stationNameInputElement = useRef<HTMLInputElement>(null);
  const stationIdentifierInputElement = useRef<HTMLInputElement>(null);
  const addressInputElement = useRef<HTMLInputElement>(null);
  const postalCodeInputElement = useRef<HTMLInputElement>(null);
  const latitudeInputElement = useRef<HTMLInputElement>(null);
  const longitudeInputElement = useRef<HTMLInputElement>(null);
  const numberOfPdcsInputElement = useRef<HTMLInputElement>(null);
  const pdcPowerMaxInputElement = useRef<HTMLInputElement>(null);
  const pdcTypeInputElement = useRef<HTMLInputElement>(null);
  const accessChargingInputElement = useRef<HTMLInputElement>(null);
  const accessibilityInputElement = useRef<HTMLInputElement>(null);
  const sourceInputElement = useRef<HTMLInputElement>(null);

  const [cities, setCities] = useState<cityType[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event?.currentTarget;

    event.preventDefault();

    let response = await fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${form.postal_code.value}&nom=${form.city.value}&fields=nom,code,departement,region`,
    );
    if (!response.ok) {
      setErrorMessage(
        "Veuillez entrer une ville valide en fonction du code postal.",
      );
      return;
    }

    const dataReceived = await response.json();
    if (dataReceived.length === 0) {
      setErrorMessage(
        "Veuillez entrer une ville valide en fonction du code postal.",
      );
      return;
    }

    const formData = new FormData(form);

    response = await fetch(form.action, {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      setDisplayModification(false);
    } else {
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  const handleClose = () => {
    setDisplayModification(false);
  };

  const isPostalCode = (value: string) => {
    return /^\d{5}$|^2[AaBb]\d{3}$/.test(value);
  };

  const handleChangePostalCode = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

  const fetchUserInfos = () => {
    // Fetch user infos
    if (stationId == null) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/stations/${stationId}`)
      .then((response) => response.json())
      .then((data) => {
        const datareceived: StationProps = data as StationProps;
        if (operatorInputElement.current) {
          operatorInputElement.current.value = datareceived.operator_name;
        }
        if (signInputElement.current) {
          signInputElement.current.value = datareceived.sign_name;
        }
        if (providerInputElement.current) {
          providerInputElement.current.value = datareceived.provider_name;
        }
        if (stationNameInputElement.current) {
          stationNameInputElement.current.value = datareceived.name;
        }
        if (stationIdentifierInputElement.current) {
          stationIdentifierInputElement.current.value = datareceived.pdc.name;
        }
        if (addressInputElement.current) {
          addressInputElement.current.value = datareceived.address;
        }
        if (postalCodeInputElement.current) {
          postalCodeInputElement.current.value = datareceived.area.postalcode;
        }
        if (cityInputElement.current) {
          cityInputElement.current.value = datareceived.area.city_name;
        }
        if (latitudeInputElement.current) {
          latitudeInputElement.current.value =
            datareceived.geo_coords.latitude.toString();
        }
        if (longitudeInputElement.current) {
          longitudeInputElement.current.value =
            datareceived.geo_coords.longitude.toString();
        }
        if (numberOfPdcsInputElement.current) {
          numberOfPdcsInputElement.current.value =
            datareceived.number_pdc.toString();
        }
        if (pdcPowerMaxInputElement.current) {
          pdcPowerMaxInputElement.current.value =
            datareceived.pdc.power_max.toString();
        }
        if (pdcTypeInputElement.current) {
          pdcTypeInputElement.current.value = datareceived.pdc.type;
        }
        if (accessChargingInputElement.current) {
          accessChargingInputElement.current.value =
            datareceived.access_charging;
        }
        if (accessibilityInputElement.current) {
          accessibilityInputElement.current.value = datareceived.accessibility;
        }
        if (sourceInputElement.current) {
          sourceInputElement.current.value = datareceived.source;
        }
      });
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
            action={`${import.meta.env.VITE_API_URL}/api/stations/${stationId}`}
            method="put"
            onSubmit={handleSubmit}
          >
            <div className="group">
              <label htmlFor="operator-name">Opérateur</label>
              <input
                type="text"
                id="operator-name"
                name="operator_name"
                ref={operatorInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="sign-name">Enseigne</label>
              <input
                type="text"
                id="sign-name"
                name="sign_name"
                ref={signInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="provider-name">Aménageur</label>
              <input
                type="text"
                id="provider-name"
                name="provider_name"
                ref={providerInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="station-name">Nom de la borne</label>
              <input
                type="text"
                id="station-name"
                name="station_name"
                ref={stationNameInputElement}
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
                ref={stationIdentifierInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                ref={addressInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="postal-code">Code postal</label>
              <input
                type="text"
                id="postal-code"
                name="postal_code"
                onChange={handleChangePostalCode}
                ref={postalCodeInputElement}
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
                ref={latitudeInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                ref={longitudeInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="number-of-pdcs">Nombre de prises</label>
              <input
                type="text"
                id="number-of-pdcs"
                name="number_of_pdcs"
                ref={numberOfPdcsInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="pcd-power-max">Puissance maximale</label>
              <input
                type="text"
                id="pcd-power-max"
                name="pdc_power_max"
                ref={pdcPowerMaxInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="pdc-type">Type de prise</label>
              <input
                type="text"
                id="pdc-type"
                name="pdc_type"
                ref={pdcTypeInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="access-charging">Accès à la recharge</label>
              <input
                type="text"
                id="access-charging"
                name="access_charging"
                ref={accessChargingInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="accessibility">Accessibilité</label>
              <input
                type="text"
                id="accessibility"
                name="accessibility"
                ref={accessibilityInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="source">Source</label>
              <input
                type="text"
                id="source"
                name="source"
                ref={sourceInputElement}
              />
            </div>
            <div className="submit">
              <button type="submit">Sauvegarder</button>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </form>
        </section>
      </article>
    </div>
  );
}

export default StationModification;

export class GeoLocationProps {
  latitude: number;
  longitude: number;

  constructor(latitude = -1, longitude = -1) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export class AdminstrativeAreaProps {
  postalcode: string;
  city_name: string;
  department_name: string;
  region_name: string;

  constructor(
    postalcode = "",
    city_name = "",
    department_name = "",
    region_name = "",
  ) {
    this.postalcode = postalcode;
    this.city_name = city_name;
    this.department_name = department_name;
    this.region_name = region_name;
  }
}

export class PdcProps {
  name: string;
  power_max: number;
  type: string;

  constructor(name = "", power_max = -1, type = "") {
    this.name = name;
    this.power_max = power_max;
    this.type = type;
  }
}

export class StationPropsWithLocation {
  id: number;
  name: string;
  address: string;
  area: AdminstrativeAreaProps;
  geo_coords: GeoLocationProps;

  constructor(
    id = -1,
    name = "",
    address = "",
    area = new AdminstrativeAreaProps(),
    geo_coords = new GeoLocationProps(),
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.area = area;
    this.geo_coords = geo_coords;
  }
}

export class StationProps {
  id: number;
  name: string;
  address: string;
  sign_name: string;
  operator_name: string;
  provider_name: string;
  area: AdminstrativeAreaProps;
  geo_coords: GeoLocationProps;
  pdc: PdcProps;
  access_charging: string;
  accessibility: string;
  update_date_time: string;
  source: string;

  constructor(
    id = -1,
    name = "",
    address = "",
    sign_name = "",
    operator_name = "",
    provider_name = "",
    area = new AdminstrativeAreaProps(),
    geo_coords = new GeoLocationProps(),
    pdc = new PdcProps(),
    access_charging = "",
    accessibility = "",
    update_date_time = "",
    source = "",
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.sign_name = sign_name;
    this.operator_name = operator_name;
    this.provider_name = provider_name;
    this.area = area;
    this.geo_coords = geo_coords;
    this.pdc = pdc;
    this.access_charging = access_charging;
    this.accessibility = accessibility;
    this.update_date_time = update_date_time;
    this.source = source;
  }
}

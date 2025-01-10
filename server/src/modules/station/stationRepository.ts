import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

import {
  AdminstrativeAreaProps,
  GeoLocationProps,
  StationPropsWithLocation,
} from "../../../common/types/StationProps";

class StationRepository {
  // The Rs of CRUD - Read operations

  async readWithGeoLocation(
    northwestLatitude: string,
    southeastLatitude: string,
    northwestLongitude: string,
    southeastLongitude: string,
  ) {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      `select 
         st.id as id, st.name as name, st.address as address,
         pc.code as postalcode, ci.name as city_name, 
         de.name as department_name, re.name as region_name,
         gc.latitude as latitude, gc.longitude as longitude
         from station st
         inner join postalcode pc on st.postalcode_id = pc.id
         inner join city ci on pc.city_id = ci.id
         inner join department de on ci.department_id = de.id
         inner join region re on de.region_id = re.id
         inner join geo_coords gc on st.geo_coords_id = gc.id
         where gc.latitude between ? and ? and gc.longitude between ? and ?LIMIT 200`,
      [
        Math.min(
          Number.parseFloat(southeastLatitude),
          Number.parseFloat(northwestLatitude),
        ).toFixed(6),
        Math.max(
          Number.parseFloat(southeastLatitude),
          Number.parseFloat(northwestLatitude),
        ).toFixed(6),
        Math.min(
          Number.parseFloat(southeastLongitude),
          Number.parseFloat(northwestLongitude),
        ).toFixed(6),
        Math.max(
          Number.parseFloat(southeastLongitude),
          Number.parseFloat(northwestLongitude),
        ).toFixed(6),
      ],
    );

    // Return the array of items
    return rows.map((item) => {
      return new StationPropsWithLocation(
        item.id,
        item.name,
        item.address,
        new AdminstrativeAreaProps(
          item.postalcode,
          item.city_name,
          item.department_name,
          item.region_name,
        ),
        new GeoLocationProps(item.latitude, item.longitude),
      );
    });
  }
}

export default new StationRepository();

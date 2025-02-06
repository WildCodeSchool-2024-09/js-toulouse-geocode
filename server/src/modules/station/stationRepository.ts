import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

import {
  AdminstrativeAreaProps,
  GeoLocationProps,
  StationProps,
} from "../../../common/types/StationProps";
import insertDataRepository from "../insertData/insertDataRepository";

const selectStatement = `select 
        st.id as id, st.name as name, st.address as address,
        st.identifier,
        si.name as sign_name, op.name as operator_name,
        pr.name as provider_name,
        pc.code as postalcode, ci.name as city_name, 
        de.name as department_name, re.name as region_name,
        gc.latitude as latitude, gc.longitude as longitude,
        st.number_pdc as number_pdc,
        st.access_charging as access_charging, st.accessibility as accessibility,
        st.update_date_time as update_date_time,
        st.source as source
        from station st
        inner join sign si on st.sign_id = si.id
        inner join operator op on st.operator_id = op.id
        inner join provider pr on st.provider_id = pr.id
        inner join postalcode pc on st.postalcode_id = pc.id
        inner join insee_code ic on st.insee_code_id = ic.id
        inner join city ci on ic.city_id = ci.id
        inner join department de on ci.department_id = de.id
        inner join region re on de.region_id = re.id
        inner join geo_coords gc on st.geo_coords_id = gc.id`;

const whereStatementLocation =
  "where gc.latitude between ? and ? and gc.longitude between ? and ?";
const whereStatementId = "where st.id = ?";
const limitStatement = "LIMIT 200";

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
      `${selectStatement} ${whereStatementLocation} ${limitStatement}`,
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
    return rows.map(transform);
  }

  async readAll(limit: number, offset: number, search: string) {
    let query = "select * from station";
    const params: (string | number)[] = [];

    if (search) {
      query += " where name like concat('%', ?, '%')";
      params.push(search);
    }

    if (!Number.isNaN(limit)) {
      if (!Number.isNaN(offset)) {
        query += " limit ?, ?";
        params.push(offset, limit);
      } else {
        query += " limit ?";
        params.push(limit);
      }
    }
    const [rows] = await databaseClient.query<Rows>(query, params);

    return rows;
  }

  async read(itemId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `${selectStatement} ${whereStatementId}`,
      [itemId],
    );

    // Return the array of items
    return rows.map(transform)[0];
  }

  // The Us of CRUD - Update operations
  async updateStationInfos(station: StationProps, insee_code: string) {
    const operatorId = await insertDataRepository.insertOperatorUsingName(
      station.operator_name,
    );
    const providerId = await insertDataRepository.insertProviderUsingName(
      station.provider_name,
    );
    const signId = await insertDataRepository.insertSignUsingName(
      station.sign_name,
    );
    const postalcodeId = await insertDataRepository.insertPostalCodeUsingName(
      station.area.postalcode,
    );
    const regionId = await insertDataRepository.insertRegionUsingName(
      station.area.region_name,
    );
    const departmentId = await insertDataRepository.insertDepartementUsingName(
      station.area.department_name,
      regionId,
    );
    const cityId = await insertDataRepository.insertCityUsingName(
      station.area.city_name,
      departmentId,
    );
    const inseeCodeId = await insertDataRepository.insertInseeCodeUsingName(
      insee_code,
      cityId,
    );
    const geoCoordsId = await insertDataRepository.insertGeoCoordsUsingCoords(
      station.geo_coords.latitude.toString(),
      station.geo_coords.longitude.toString(),
    );

    const [result] = await databaseClient.query<Result>(
      "update station set name = ?, address = ?, identifier = ?, sign_id = ?, operator_id = ?, provider_id = ?, postalcode_id = ?, insee_code_id = ?, geo_coords_id = ?, number_pdc = ?, access_charging = ?, accessibility = ?, update_date_time = ?, source = ?where id = ?",
      [
        station.name,
        station.address,
        station.identifier,
        signId,
        operatorId,
        providerId,
        postalcodeId,
        inseeCodeId,
        geoCoordsId,
        station.number_pdc.toString(10),
        station.access_charging,
        station.accessibility,
        station.update_date_time,
        station.source,
        station.id,
      ],
    );

    return result;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from station where id = ?",
      [id],
    );

    return result;
  }
}

function transform(item: RowDataPacket): StationProps {
  return new StationProps(
    item.id,
    item.name,
    item.address,
    item.identifier,
    item.sign_name,
    item.operator_name,
    item.provider_name,
    new AdminstrativeAreaProps(
      item.postalcode,
      item.city_name,
      item.department_name,
      item.region_name,
    ),
    new GeoLocationProps(item.latitude, item.longitude),
    item.number_pdc,
    item.access_charging,
    item.accessibility,
    item.update_date_time,
    item.source,
  );
}

export default new StationRepository();

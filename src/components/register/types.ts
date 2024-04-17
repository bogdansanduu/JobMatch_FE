import Geonames from "geonames.js";

export enum FIELD_NAMES {
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  password = "password",
  retypedPassword = "retypedPassword",
}

export enum LOCATION_NAMES {
  country = "country",
  state = "state",
  city = "city",
}

//sandubogdan2001
export const geonames = Geonames({
  username: "thalesandrade",
  lan: "en",
  encoding: "JSON",
});

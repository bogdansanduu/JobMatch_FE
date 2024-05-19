import Geonames from "geonames.js";

export enum FIELD_NAMES {
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  resume = "resume",
  password = "password",
  retypedPassword = "retypedPassword",
}

export enum LOCATION_NAMES {
  country = "country",
  state = "state",
  city = "city",
}

export const geonames = Geonames({
  username: "sandubogdan2001",
  lan: "en",
  encoding: "JSON",
});

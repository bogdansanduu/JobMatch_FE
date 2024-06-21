import Geonames from "geonames.js";

export enum FIELD_NAMES {
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  currentPosition = "currentPosition",
  resume = "resume",
  password = "password",
  retypedPassword = "retypedPassword",
}

export enum FIELD_NAMES_JOB {
  title = "title",
  description = "description",
  category = "category",
  country = "country",
  state = "state",
  city = "city",
  responsibilities = "responsibilities",
  minimumQualifications = "minimumQualifications",
  preferredQualifications = "preferredQualifications",
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

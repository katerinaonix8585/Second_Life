export interface LoginFormValues {
  email: string,
  password: string,
  repeatpassword: string, 
  name: string,
  surname: string,
  location: LocationType, 
}

export enum LOGIN_FIELD_NAMES {
  EMAIL = 'email',
  PASSWORD = 'password',
  REPEATPASSWORD = 'repeatpassword',
  NAME = 'name',
  SURNAME = 'surname',
  LOCATION = 'location'
}

export enum LocationType {
  Location1 = 'Location 1',
  Location2 = 'Location 2',
  Location3 = 'Location 3',
  Location4 = 'Location 4',
  Location5 = 'Location 5',
  Location6 = 'Location 6',
  Default = '', 
}
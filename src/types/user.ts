export interface IUserInfo {
  contact: {
      userPreferences: {
          timeZone: string,
          unitsOfMeasurement: string,
          dateFormat: string,
          language: string,
      },
      firstName: string,
      middleName: string,
      lastName: string,
      title: string,
      gender: string,
      birthday: null,
      emailAddress: string,
      homePhone: string,
      businessPhone: string,
      mobilePhone: string,
  };
  homeAddress: {
      street: string | null,
      city: string,
      zipCode: string,
      stateProvince: string,
      country: string,
      addressLine1: string,
      addressLine2: string,
  };
  homeMarket: string;
  userId: string;
  loginName: string;
  userType: string;
  nextOfKin: string;
  pin: string;
  secureQuestion1: string;
  secureQuestion2: string;
  secureQuestion3: string;
  secureAnswer1: string;
  secureAnswer2: string;
  secureAnswer3: string;
  authCredentials: string;
}

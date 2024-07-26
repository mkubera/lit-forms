const notBlank = (value) =>
  value
    ? { isValid: true, errMsg: "" }
    : { isValid: false, errMsg: "Cannot be blank" };

const fullname = (value) =>
  value.length < 3
    ? { isValid: false, errMsg: "Too short. At least 3 characters" }
    : { isValid: true, errMsg: "" };

// TODO: fill validators
const email = notBlank;
const phone = notBlank;
const address = notBlank;
const city = notBlank;
const state = notBlank;
const zip = notBlank;
const card = notBlank;
const mmyy = notBlank;
const cvc = notBlank;

const FormValidator = {
  notBlank,
  fullname,
  email,
  phone,
  address,
  city,
  state,
  zip,
  card,
  mmyy,
  cvc,
};

const get = (id) => FormValidator[id];

FormValidator.get = get;

export default FormValidator;

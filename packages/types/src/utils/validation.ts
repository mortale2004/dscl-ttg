import * as yup from "yup";
export const REGEX = {
  ONE_TO_HUNDRED: /\b([1-9]|[1-9][0-9]|100)\b/,
  GREATER_THAN_ZERO: /^[1-9][0-9]*$/,
  POSITIVE_NUMBER: /^\d+$/,
};

export const validate = Object.freeze({
  required: (message?: string) =>
    yup.string().required(`Please enter ${message}.`),

  percentage: () =>
    yup
      .string()
      .matches(/^100$|^\d{0,2}(\.\d{1,2})? *%?$/, "Enter valid Percentage.")
      .required("Please enter Percentage."),
  requiredBoolean: (message?: string) =>
    yup
      .boolean()
      .transform((value) => String(value) === "true")
      .required(`Please select ${message}.`),
  requiredNumber: (message?: string) =>
    yup
      .number()
      .required(`Please enter ${message}.`)
      .typeError(`Enter valid ${message}.`),

  requiredNumberGreaterThanZero: (message?: string) =>
    yup
      .string()
      .matches(REGEX.GREATER_THAN_ZERO, `Enter valid ${message}.`)
      .required(`Please enter ${message}.`)
      .typeError(`Enter valid ${message}.`),

  numberGreaterThanZero: (message?: string) =>
    yup.string().matches(REGEX.GREATER_THAN_ZERO, `Enter valid ${message}.`),

  positiveNumber: (message?: string) =>
    yup.string().matches(REGEX.GREATER_THAN_ZERO, `Enter valid ${message}.`),

  price: (message?: string) =>
    yup.string().matches(/^[.]?[0-9]+[.]?[0-9]*$/, `Enter valid ${message}.`),

  reqPrice: (message?: string) =>
    yup
      .string()
      .matches(/^[.]?[0-9]+[.]?[0-9]*$/, `Enter valid ${message}.`)
      .required(`Please enter ${message}.`),

  number: (message?: string) =>
    yup.string().matches(/^[0-9]*$/, `Enter valid ${message}.`),

  decimal: (message?: string) =>
    yup
      .string()
      .matches(
        /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
        `Enter valid ${message}.`
      ),

  requiredDecimal: (message?: string, hasFullMessage?: string) =>
    yup
      .string()
      .matches(
        /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
        hasFullMessage ? message : `Enter valid ${message}.`
      )
      .required(hasFullMessage ? message : `Please enter ${message}.`),

  digits: (digit?: number, message?: string) =>
    yup
      .string()
      .matches(new RegExp(`^[0-9]{${digit}}$`), `Enter valid ${message}.`)
      .required(`Please enter ${message}.`),

  requiredAlphabet: (message?: string) =>
    yup
      .string()
      .matches(/^[a-zA-Z ]*$/, `Enter valid ${message}.`)
      .required(`Please enter ${message}.`),

  alphabet: (message?: string) =>
    yup.string().matches(/^[a-zA-Z ]*$/, `Enter valid ${message}.`),

  requiredAlphabetNumber: (message?: string) =>
    yup
      .string()
      .matches(/[a-zA-Z]/, `Enter valid ${message}.`)
      .required(`Please enter ${message}.`),

  alphabetNumber: (message?: string) =>
    yup.string().matches(/[a-zA-Z]/, `Enter valid ${message}.`),

  aadhar: () =>
    yup.string().test("aadhar", "Enter valid Aadhar Number.", function (value) {
      if (value) {
        return /^[1-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(value);
      }
      return true;
    }),

  requiredIfscCode: () =>
    yup
      .string()
      .matches(/[A-Z]{4}[0][A-Z0-9]{6}$/, "Enter valid IFSC Code.")
      .required("Please enter IFSC Code."),

  ifscCode: () =>
    yup.string().matches(/[A-Z]{4}[0][A-Z0-9]{6}$/, "Enter valid IFSC Code."),

  requiredAadhar: () =>
    yup
      .string()
      .matches(
        /^[1-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
        "Enter valid Aadhar Number."
      )
      .required("Please enter Aadhar Number."),

  pincode: () =>
    yup
      .string()
      .matches(/^[0-9]{6}$/, "Enter valid Pincode.")
      .required("Please enter Pincode."),

  requiredMobile: () =>
    yup
      .string()
      .matches(/^([9876]{1})(\d{1})(\d{8})/, "Enter valid Mobile Number.")
      .required("Please enter Mobile Number."),

  mobile: () =>
    yup.string().test("mobile", "Enter valid Mobile Number.", function (value) {
      if (value) {
        return /^([9876]{1})(\d{1})(\d{8})/.test(value);
      }
      return true;
    }),

  requiredEmail: () =>
    yup
      .string()
      .email("Please enter valid Email.")
      .required("Please enter email."),

  email: () => yup.string().email("Please enter valid Email."),

  requiredText: (message?: string) =>
    yup.string().required(`Please enter ${message}.`),

  requiredBankAccountNumber: () =>
    yup
      .string()
      .matches(/^\d{9,18}$/, "Enter valid Account Number.")
      .required("Please enter Account Number."),

  bankAccountNumber: () =>
    yup.string().matches(/^\d{9,18}$/, "Enter valid Account Number."),

  requiredPanNumber: () =>
    yup
      .string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Enter valid Pan Number.")
      .required("Please enter Pan Number."),

  panNumber: () =>
    yup.string().matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Enter valid Pan Number."),

  text: (message?: string) => yup.string().nullable().optional(),
  select: (message?: string) => yup.string().nullable().optional(),
  requiredSelect: (message?: string) =>
    yup.string().required(`Please select ${message}.`),
  date: (message?: string) => yup.date().typeError(`Enter valid ${message}.`),
  requiredDate: (
    message?: string,
    min = null,
    minDateMessage = "",
    max = null,
    maxDateMessage = ""
  ) => {
    if (min && max) {
      return yup
        .date()
        .transform((value, originalValue) => {
          return isNaN(value) ? new Date(originalValue) : new Date(value);
        })
        .min(min, minDateMessage)
        .max(max, maxDateMessage)
        .required(`Please enter ${message}.`)
        .typeError(`Enter valid ${message}.`);
    } else if (min) {
      return yup
        .date()
        .transform((value, originalValue) => {
          return value
            ? isNaN(value)
              ? new Date(originalValue)
              : new Date(value)
            : null;
        })
        .min(min, minDateMessage)
        .required(`Please enter ${message}.`)
        .typeError(`Enter valid ${message}.`);
    } else if (max) {
      return yup
        .date()
        .transform((value, originalValue) => {
          return value
            ? isNaN(value)
              ? new Date(originalValue)
              : new Date(value)
            : null;
        })
        .min(max, maxDateMessage)
        .required(`Please enter ${message}.`)
        .typeError(`Enter valid ${message}.`);
    } else {
      return yup
        .date()
        .transform((value, originalValue) => {
          return value
            ? isNaN(value)
              ? new Date(originalValue)
              : new Date(value)
            : null;
        })
        .required(`Please enter ${message}.`)
        .typeError(`Enter valid ${message}.`);
    }
  },
});
export const schemaMetaData = (
  addedByMetaData?: boolean,
  modifiedByMetaData?: boolean,
  hasIsActive?: boolean
) => ({
  _id: validate.requiredText("Id"),
  ...(addedByMetaData
    ? {
        added_by: validate.requiredText("Added By"),
        added_on: validate.requiredDate("Added On"),
      }
    : {}),
  ...(modifiedByMetaData
    ? {
        modified_by: validate.text("Modified By"),
        modified_on: validate.date("Modified On"),
      }
    : {}),
  ...(hasIsActive ? { is_active: validate.requiredBoolean("Active") } : {}),
});

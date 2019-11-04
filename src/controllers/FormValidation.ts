import { string, bool } from "prop-types";
import { CodeGenerator } from "@babel/generator";

/**
 * Validation function that holds standard error messages for each field
 * @param key Form field to be validated
 */

export default function FormValidation(key: string): string {
  const errorMessages = new Map();
  errorMessages.set(
    "companyName",
    "Ettevõtte nimetus peab sisaldama vähemalt 2 sümbolit"
  );
  errorMessages.set(
    "companyRegistryCode",
    "Ettevõtte registrikood peab sisaldama 8 numbrit"
  );
  errorMessages.set("age", "Palun vali oma vanus");
  errorMessages.set("name", "Nimi peab sisaldama vähemalt 2 sümbolit");
  errorMessages.set("email", "Kontrolli e-maili formaat");
  errorMessages.set("password", "Salasõna peab sisaldama vähemalt 6 sümbolit");
  return errorMessages.get(key);
}

FormValidation.checkValid = (element: string, input: string): boolean => {
  switch (element) {
    case "companyName":
      return input.trim().length > 2;
    case "companyRegistryCode":
      return new RegExp("^[0-9]{8}$").test(input);
    case "name":
      return input.trim().length > 2;
    case "age":
      return parseInt(input)>=18 && parseInt(input)<=120
    case "email":
      return /\S+@\S+\.\S+/.test(input.trim());
    case "password":
      return input.length > 5;
  }
};

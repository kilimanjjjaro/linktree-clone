import { INPUT_TYPES } from "@/lib/constants/globals";

export const createInputAttributes = (inputType: number) => {
  let attributes = {};

  if (inputType === INPUT_TYPES.TEXT) {
    attributes = {
      type: "text",
      minLength: 5,
      maxLength: 80,
    };
  }

  if (inputType === INPUT_TYPES.NUMBER) {
    attributes = {
      type: "number",
      minLength: 10,
      maxLength: 80,
    };
  }

  if (inputType === INPUT_TYPES.EMAIL) {
    attributes = {
      type: "email",
    };
  }

  return attributes;
};

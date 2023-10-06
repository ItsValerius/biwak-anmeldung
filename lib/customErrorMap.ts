import z from "zod";

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === "undefined") {
      return { message: "Dieses Feld ist Erforderlich." };
    }
  }
  return { message: ctx.defaultError };
};

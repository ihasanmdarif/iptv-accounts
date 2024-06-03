import { is } from "drizzle-orm";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const CreateResumeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should be atleast 2 characters" })
    .max(50),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(phoneRegex, "Invalid Phone Number"),
  address: z.string().min(1, {
    message: "Please enter a valid address.",
  }),
  city: z.string().min(1, {
    message: "Please enter a valid city.",
  }),
  province: z.string().min(1, {
    message: "Please enter a valid province.",
  }),
  postal: z.string().min(1, {
    message: "Please enter a valid postal code.",
  }),
  country: z.string().min(1, {
    message: "Please enter a valid country.",
  }),
  summary: z.string().min(1, {
    message: "Please enter a valid summary.",
  }),
  experience: z.array(
    z.object({
      title: z.string().min(1, {
        message: "Please enter a valid title.",
      }),
      company: z.string().min(1, {
        message: "Please enter a valid company.",
      }),
      location: z.string().min(1, {
        message: "Please enter a valid location.",
      }),
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
      description: z.string().min(1, {
        message: "Please enter a valid description.",
      }),
      isCurrent: z.boolean(),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string(),
      currentlyStudying: z.boolean(),
    })
  ),
  skills: z.array(z.string()),
  languages: z.array(z.string()),
  certifications: z.array(
    z.object({
      title: z.string(),
      date: z.string(),
      description: z.string(),
    })
  ),
  hobbies: z.array(z.string()),
});

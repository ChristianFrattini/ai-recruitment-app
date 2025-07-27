import z from "zod";

export const orgSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Organization name is required"),
  isUpdated: z.boolean().default(true),
  userLimit: z.coerce.number().optional(),
  subscriptionPlan: z.string().optional(),
});

export const profileSchema = z.object({
  profileId: z.string(),
  specialization: z.string(),
  title: z.string(),
});

export const candidateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^[+0-9\s\-()]*$/, "Invalid phone number"),
  status: z.enum(["actively_seeking", "employed", "not_looking"]),
  level: z.enum(["entry", "junior", "mid", "senior"]),
  salaryExpectation: z.string().min(1, "Select salary expectation"),
  file: z.instanceof(File).refine((file) => file.size > 0, {
    message: "CV file is required",
  }),
});

export const editCandidateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^[+0-9\s\-()]*$/, "Invalid phone number"),
  status: z.enum(["actively_seeking", "employed", "not_looking"]),
  level: z.enum(["entry", "junior", "mid", "senior"]),
  salaryExpectation: z.string().min(1, "Select salary expectation"),
});

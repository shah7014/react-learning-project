import {z} from "zod";

export const BasicUserSchema = z.object({
    name: z.string().trim().min(2, "Name must be 2 or more characters long"),
    username: z.string().trim().toLowerCase().min(4, "Username must be 4 or more chars long"),
    email: z.string().trim().toLowerCase().email("Email must be in valid format"),
    phone: z.string().trim()
        .min(10, "Phone numbers must be 10 or more chars long"),
        // .regex(/^[0-9]+/, "Only numbers are allowed")
        // .length(10, "Phone number is 10 char long"),
    // .transform(val => `${val.slice(0,3)}-${val.slice(3,6)}-${val.slice(6)}`),
    website: z.string().trim().toLowerCase()
        .min(5, "Url must be atleast 5 chars long")
        .refine(val => val.indexOf(".") !== -1, "Website URL must contain a .")
        .optional(),
});

const CompanySchema = z.object({
    name: z.string()
        .trim()
        .min(5, "Company Name must be 5 characters long"),
    catchPhrase: z.string(),
})

const AddressSchema = z.object({
    street: z.string()
        .trim()
        .min(5, "Street address must be 5 or more chars long"),
    suits: z.string().trim().optional(),
    city: z.string()
        .trim()
        .min(2, "City name must be 2 or more chars long"),
    geo: z.object({
        lat: z.string(),
        lng: z.string()
    })
})

const UserIdSchema = z.object({
    id: z.number().int().positive()
});

// TODO: this schema has id also. SO API response will conatin id bu we will have issue
// if we use the same schema for a new user input form
// so the best way is to create a schema with id and one without id
export const UserSchema = BasicUserSchema.extend({
    address: AddressSchema
}).extend({
    company: CompanySchema
}).merge(UserIdSchema);



export type User = z.infer<typeof UserSchema>;

export const UserApiResultsSchema = z.array(UserSchema);

export type UserResponse = z.infer<typeof UserApiResultsSchema>;


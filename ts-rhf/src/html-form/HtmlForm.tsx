import React from "react";
import "./HtmlForm.scss";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {z, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

interface IFormData {
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    password: string,
    confirmPassword: string
}

const userFormSchema: ZodType<IFormData> = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    age: z.number().min(18),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})


const HtmlForm: React.FC = () => {

    const {
        register, handleSubmit, formState: {errors},
        control
    } = useForm<IFormData>({
        resolver: zodResolver(userFormSchema),
        mode: "onBlur"
    });

    const onValid: SubmitHandler<IFormData> = (data) => {
        console.log("USER DATA:- ", data);
    }

    const onInvalid: SubmitErrorHandler<IFormData> = (errors) => {
        console.log("ERRORS:- ", errors)
    }

    return <div className={"container"}>
        <DevTool control={control}/>
        <h1>Sample HTML form</h1>

        <form className={"user-form"} onSubmit={handleSubmit(onValid, onInvalid)}>
            <div className={"form-control"}>
                <label htmlFor={"firstName"}>First Name:</label>
                <input {...register("firstName")} id={"firstName"}/>
                <span>{errors.firstName?.message}</span>
            </div>

            <div className={"form-control"}>
                <label htmlFor={"lastName"}>Last Name:</label>
                <input {...register("lastName")} id={"lastName"}/>
                <span>{errors.lastName?.message}</span>
            </div>

            <div className={"form-control"}>
                <label htmlFor={"email"}>Email:</label>
                <input {...register("email")} id={"email"}/>
                <span>{errors.email?.message}</span>
            </div>

            <div className={"form-control"}>
                <label htmlFor={"age"}>Age:</label>
                <input {...register("age", {valueAsNumber: true})} type={"number"} id={"age"}/>
                <span>{errors.age?.message}</span>
            </div>

            <div className={"form-control"}>
                <label htmlFor={"password"}>Password:</label>
                <input {...register("password")} type={"password"} id={"password"}/>
                <span>{errors.password?.message}</span>
            </div>

            <div className={"form-control"}>
                <label htmlFor={"cnfPassword"}>Confirm Password:</label>
                <input {...register("confirmPassword")} type={"password"} id={"cnfPassword"}/>
                <span>{errors.confirmPassword?.message}</span>
            </div>

            <button type={"submit"}>Submit</button>
        </form>
    </div>
}

export default HtmlForm;


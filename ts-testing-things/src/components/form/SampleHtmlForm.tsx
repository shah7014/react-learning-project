import React from "react";
import {Button, Container, CssBaseline, Stack, styled, ThemeProvider, Typography} from "@mui/material";
import {FieldErrors, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";

const Input = styled("input")(({theme}) => ({
    width: "100%",
    padding: "1rem",
    backgroundColor: "#fff",
    color: "#000",
    outline: "none"
}))

const FormControl = styled(Stack)(({theme}) => ({
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem"
}))

interface IFormInput {
    firstName: string,
    lastName: string
}


const SampleHtmlForm = () => {

    const {
        register,
        formState: {errors},
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues
    } = useForm<IFormInput>({
        defaultValues: {
            firstName: "",
            lastName: ""
        }, mode: "onBlur"
    });

    const handleSubmitSuccess: SubmitHandler<IFormInput> = (formData: IFormInput) => {
        console.log(formData);
    }
    const handleSubmitFailure: SubmitErrorHandler<IFormInput> = (err: FieldErrors<IFormInput>) => {
        console.log(err);
    }


    return <>
        <Typography variant={"h3"} component={"h1"}
                    sx={{textAlign: "center", margin: "2rem 0", color: "hotpink"}}>React Hook Form</Typography>
        <form onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitFailure)}>

            <FormControl>
                <Input
                    placeholder={"First Name"}
                    {...register("firstName", {
                        required: {
                            value: true,
                            message: "First name is a required field"
                        },
                        minLength: {
                            value: 4,
                            message: "First Name should be atleast 4 characters long"
                        }
                    })} />
                {errors.firstName &&
                    <Typography color={"red"} variant={"subtitle2"}>{errors.firstName.message}</Typography>}
            </FormControl>

            <FormControl>
                <Input
                    placeholder={"Last Name"}
                    {...register("lastName", {
                        required: {
                            value: true,
                            message: "Last Name is a required field"
                        },
                        maxLength: {
                            value: 5,
                            message: "Last name can't b more than 5 characters"
                        }
                    })} />
                {errors.lastName &&
                    <Typography color={"red"} variant={"subtitle2"}>{errors.lastName.message}</Typography>}
            </FormControl>
            <Button type={"submit"}>Submit</Button>
        </form>
    </>
    {/*<DevTool control={control} /> /!* set up the dev tool *!/*/
    }


}


export default SampleHtmlForm;

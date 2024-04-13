import React, {useState} from "react";
import {v4 as uuidv4} from "uuid"
import {
    useAddContactMutation,
    useContactsQuery,
    useDeleteContactMutation,
    useSingleContactQuery, useUpdateContactMutation
} from "../../services/contactsApi";
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {Contact} from "../../models/Conatct";

const SingleContact = ({id}: { id: string }) => {
    const {data} = useSingleContactQuery(id)
    return <>
        {data && <Card>
            <CardContent>
                <Typography variant={"h3"}>{data.id}) {data.name}</Typography>
                <Typography variant={"h6"}>{data.email}</Typography>
            </CardContent>
        </Card>}
    </>
}

const CreateContact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [addContact] = useAddContactMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email && name) {
            console.log({name, email});
            await addContact({id: uuidv4(), name, email});
        }
    }

    return <Paper sx={{padding: "1rem"}}>
        <Stack
            flexDirection={"column"}
            gap={"1.5rem"}
            component={"form"}
            onSubmit={handleSubmit}
        >
            <Typography variant={"h4"}>Create Contact</Typography>
            <TextField value={name} onChange={e => setName(e.target.value)} label={"Name"} placeholder={"Enter New Contact Name"} />
            <TextField value={email} onChange={e => setEmail(e.target.value)} label={"Email"} placeholder={"Enter New Contact Email"} />
            <Button variant={"contained"} type={"submit"} sx={{alignSelf: "flex-start"}}>Create</Button>
        </Stack>
    </Paper>
}

const ContactsList = () => {

    const {isLoading, error, data} = useContactsQuery();

    const [deleteContact] = useDeleteContactMutation();

    const [updateContact] = useUpdateContactMutation();

    const handleDelete = (id: string) => async () => {
        await deleteContact(id);
    }

    const handleUpdate = (contact: Contact) => async () => {
        const {name, ...rest} = contact;
        await updateContact({...rest, name: name.toUpperCase()});
    }

    return <Box>
        <CreateContact />
        {isLoading && <Typography variant={"h3"} color={"yellow"}>Loading...</Typography>}
        {error && <Typography variant={"h3"} color={"error"}>Error</Typography>}
        {data && <Box sx={{margin: "2rem 0"}}>
            <Typography variant={"h4"} sx={{margin: "1rem 0"}}>Contacts List</Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">EmailId</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((d) => (
                            <TableRow
                                key={d.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {d.id}
                                </TableCell>
                                <TableCell align="right">{d.name}</TableCell>
                                <TableCell align="right">{d.email}</TableCell>
                                <TableCell align="right">
                                    <IconButton color={"primary"} onClick={handleUpdate(d)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color={"error"} onClick={handleDelete(d.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>}
    </Box>
}

export default ContactsList;

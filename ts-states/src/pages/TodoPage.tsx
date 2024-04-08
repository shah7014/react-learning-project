import React, {useState} from "react";
import {Box, Checkbox, Container, MenuItem, Paper, Stack, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../state/store";
import {addTodo, deleteTodo, setColor, toggleTodo} from "../state/actions/todoActions";
import {filteredTodosSelector} from "../state/reducers/todoReducer";
import {Color, Status, Todo} from "../types"
import {Close} from "@mui/icons-material";

const colors = [
    {
        value: Color.BLUE,
        label: 'Blue',
    },
    {
        value: Color.PURPLE,
        label: 'Purple',
    },
    {
        value: Color.GREEN,
        label: 'Green',
    },
    {
        value: Color.ORANGE,
        label: 'Orange',
    },
    {
        value: Color.RED,
        label: 'Red',
    },
];

const NewTodo = () => {
    const [todoText, setTodoText] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    }

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (todoText.trim().length > 0 && e.key.toLowerCase() === "enter") {
            dispatch(addTodo(todoText));
            setTodoText("");
        }
    }

    return <TextField
        fullWidth
        placeholder={"What needs to be done?"}
        value={todoText}
        onChange={handleChange}
        onKeyDown={handleSubmit}
    />
}

const SingleTodo = ({todo}: { todo: Todo }) => {

    const dispatch = useDispatch<AppDispatch>();

    const handleCompletionStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleTodo(todo.id));
    }

    const handleTodoColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color: Color = e.target.value as Color;
        dispatch(setColor(todo.id, color));
    }

    const handleTodoDelete = () => {
        dispatch(deleteTodo(todo.id))
    }

    return <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{padding: "0.75rem", borderTop: "1px solid #e1e1e1"}}
    >
        <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={"1rem"}
        >
            <Checkbox
                value={todo.isCompleted === Status.COMPLETED}
                onChange={handleCompletionStatusChange}
            />
            <Typography variant={"h5"}>{todo.text}</Typography>
        </Stack>

        <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={"1rem"}
        >
            <TextField
                select
                value={todo.color}
                onChange={handleTodoColorChange}
            >
                {colors.map(op => <MenuItem value={op.value}>{op.label}</MenuItem>)}
            </TextField>
            <Close color={"error"} cursor={"pointer"} onClick={handleTodoDelete}/>
        </Stack>
    </Stack>
}

const TodoPage = () => {

    const filteredTodos = useSelector(filteredTodosSelector);

    return <Container maxWidth={"md"} sx={{marginTop: "2rem"}}>
        <Typography variant={"h3"} color={"error"} textAlign={"center"} mb={2}>Todos</Typography>

        <Paper sx={{padding: "2rem"}}>
            <NewTodo/>

            <Box sx={{height: "75%"}}>
                {filteredTodos.map(t => <SingleTodo todo={t}/>)}
            </Box>

            <Box>

            </Box>
        </Paper>
    </Container>
}

export default TodoPage;


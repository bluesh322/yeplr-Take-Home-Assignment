import React, { useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { Typography, Container, Box, FormControl, TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch'
    },
    btn: {
        width: 100,
        marin: theme.spacing(2),
    },
    text: {
        display: 'flex',
    }
}))

const LoginForm = ({login}) => {
    const classes = useStyles();
    const INITIAL_STATE = {
        username: "",
        password: "",
        isAdmin: true,
    }
    const history = useHistory();
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {username, password} = formData;
        login({username, password});
        setFormData(INITIAL_STATE);
        history.push("/");
    }

    return (
        <Container justifycontent="center" maxWidth="md" fixed>
        <Box className={classes.root} my={2}>
        <Typography className={classes.text} variant="h3">Enter your username and password</Typography>
        <form onSubmit={handleSubmit}>
            <FormControl>
                <TextField id="username" className={clsx(classes.margin, classes.withoutLabel, classes.textField)} variant="outlined" label="username" name="username" value={formData.username} onChange={handleChange}></TextField>
                <TextField id="password" className={clsx(classes.margin, classes.withoutLabel, classes.textField)} variant="outlined" label="password" name="password" value={formData.password} onChange={handleChange}></TextField>
                <Button data-testid="submit" className={classes.btn} variant="contained" color="primary" type="submit">Login</Button>
            </FormControl>
        </form>      
        </Box>
    </Container>
    );
}

export default LoginForm;
import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Footer, Header } from "components";
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import * as Yup from 'yup';

const styles = {
    floatingLabelFocusStyle: {
        color: "#6699cc",

    },
    underlineStyle: {
        fontFamily: "Comfortaa",
        color: "#6699cc",

    },
    floatingLabelStyle: {
        color: "#6699cc",
        fontFamily: "Comfortaa",

    },
};
const Landing: React.FC = () => {
    return (
        <>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    maxWidth: '30rem',
                    margin: '0 auto',
                    fontFamily: 'Comfortaa',
                    color: '#d1dce6',
                    fontSize: '16px',
                }}>
                <Header />
                <div>HandleFinder is a powerful tool
                    that can be used to find usernames across many <a style={{ textDecoration: 'none', color: '#6699cc' }} href="https://github.com/sherlock-project/sherlock/blob/master/sites.md">social networks</a>.
                    This project is a wrapper around the <a style={{ textDecoration: 'none', color: '#6699cc' }} href="https://github.com/sherlock-project">Sherlock Project.</a>
                </div>
                <Formik
                    initialValues={{
                        username: '',
                    }}
                    validationSchema={
                        Yup.object().shape({
                            username: Yup.string().required('Username is required'),
                        })
                    }
                    onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="username"
                                name="username"
                                label="Search Username"
                                variant="outlined"
                                value={values.username}
                                onChange={handleChange}
                                InputLabelProps={{
                                    style: styles.floatingLabelStyle,
                                }}
                                InputProps={{
                                    style: styles.underlineStyle,
                                }}
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    margin: '1rem 0',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#6699cc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#6699cc',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#6699cc',
                                        },
                                    },
                                }}
                            />
                            <Button
                                fullWidth
                                size="large"
                                type="submit"
                                variant="outlined"
                                sx={{
                                    borderColor: '#6699cc',
                                    backgroundColor: '#6699cc',
                                    color: '#d1dce6',
                                    '&:hover': {
                                        borderColor: '#ea6068',
                                        backgroundColor: '#ea6068',
                                        color: '#d1dce6',
                                    },
                                }}
                            >
                                <SearchIcon />
                            </Button>
                        </form>
                    )}
                </Formik>
            </Box>
            <Footer />

        </>
    );
}


export default Landing
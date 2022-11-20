import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Footer, Header } from "components";
import { TextField, Link } from '@mui/material';
import { Formik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import { fontFamily, fontSize } from '@mui/system';

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

const Startbrackets = (
    <a style={{
        color: "#d1dce6",
        fontFamily: "Comfortaa",
        fontSize: "16px",
    }}>[ <a style={{
        color: "#fcb103",
    }}>!</a> ]</a>)


const Endbrackets = (
    <a style={{
        color: "#d1dce6",
        fontFamily: "Comfortaa",
        fontSize: "16px",
    }}>[ <a style={{
        color: "#ec5f67",
    }}>X</a> ]</a>)



const brackets = (
    <a style={{
        color: "#d1dce6",
        fontFamily: "Comfortaa",
        fontSize: "16px",
    }}>[ <a style={{
        color: "#99c794",
    }}>+</a> ]</a>)

interface Website {
    site: string;
    url: string;
}

const Landing: React.FC = () => {
    const [websites, setWebsites] = React.useState<Website[]>([]);
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const onSubmit = (values) => {
        setWebsites([])
        setDisabled(true);
        const url = new WebSocket(`ws://handlefinder-backend:10000/api/v1/handles/${values.username}`);
        url.onopen = () => {

            console.log("connected");
            url.send(values.username);

        };
        url.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data) {
                setWebsites(websites => [...websites, data]);
            }
        };
        url.onclose = () => {
            console.log("disconnected");
            setDisabled(false);

        }
    }
    console.log(websites);

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
                    onSubmit={onSubmit}
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
                            <LoadingButton
                                fullWidth
                                loading={disabled}
                                loadingPosition="start"
                                startIcon={<SearchIcon />}

                                // isLoading={disabled}
                                size="large"
                                type="submit"


                                variant="outlined"

                                sx={{
                                    borderColor: '#6699cc',
                                    backgroundColor: '#6699cc',
                                    color: '#d1dce6',
                                    '&:hover': {
                                        backgroundColor: '#6699cc',
                                        borderColor: '#6699cc',
                                        boxShadow: 'none',
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: '#ea6068',
                                        borderColor: '#ea6068',
                                        color: '#d1dce6',
                                    },
                                }}
                            >
                                {disabled ? "Loading" : "Search"}
                            </LoadingButton>
                            {websites.length > 0 &&
                                <div style={{
                                    color: '#99c794',
                                    paddingTop: '2rem',
                                }}>
                                    {Startbrackets} Checking username <a style={{ color: '#d1dce6' }}>{values.username}</a> on:
                                </div>
                            }
                            <Box>
                                <ul>
                                    {websites.map((website) => (
                                        <Typography style={{
                                            color: '#99c794',
                                            textAlign: 'left',
                                            position: 'relative',
                                        }}>
                                            {brackets} {website.site}: <a style={{ color: '#d1dce6' }} href={website.url
                                            }>{website.site}</a>
                                        </Typography>
                                    ))}
                                </ul>
                                <ul
                                >
                                    {websites.length > 0 && disabled === false &&
                                        <Typography style={{
                                            color: '#99c794',
                                            textAlign: 'left',
                                        }}>
                                            {Endbrackets} End Results: <a style={{ color: '#d1dce6' }}>{websites.length}</a>
                                        </Typography>
                                    }
                                </ul>
                            </Box>
                        </form>
                    )}
                </Formik>

            </Box>
            <Footer />


        </>
    );
}


export default Landing
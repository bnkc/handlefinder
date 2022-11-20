import React from "react";
import Box from '@mui/material/Box';
import { style } from "@mui/system";




const Footer = () => {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
                position: 'relative',
                marginTop: '1rem',
                width: '100%',
                color: '#d1dce6',
                fontSize: '16px',
                fontFamily: 'Comfortaa',
                img: {
                    transform: 'translateY(5px)',
                },
            }}
        >


            <div
                style={{
                    padding: '10px',
                }}
            >
                Made with {' '}
                <img src={'https://img.icons8.com/material/20/ec5f67/hearts.png'} alt="heart" />
                {' '} by <a style={{ textDecoration: 'none', color: '#6699cc' }} href="https://github.com/bnkc">bnkc</a>
            </div>

            <a href="https://www.buymeacoffee.com/bnkc"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=bnkc&button_colour=FF5F5F&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00" height={'40px'} /></a>

        </Box>

    );
}

export default Footer
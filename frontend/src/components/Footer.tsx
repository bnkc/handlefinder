import React from "react";
import Box from '@mui/material/Box';




const Footer = () => {
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
                position: 'fixed',
                bottom: 1,
                width: '100%',
                height: '55px',
                color: '#d1dce6',
                fontSize: '16px',
                fontFamily: 'Comfortaa',
                img: {
                    transform: 'translateY(5px)',
                },
            }}
        >
            <div>
                Made with {' '}
                <img src={'https://img.icons8.com/material/20/ec5f67/hearts.png'} alt="heart" />
                {' '} by <a style={{ textDecoration: 'none', color: '#6699cc' }} href="https://github.com/bnkc">bnkc</a>
            </div>
        </Box>
    );
}

export default Footer
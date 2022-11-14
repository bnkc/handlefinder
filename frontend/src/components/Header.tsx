import React from "react";
import Box from '@mui/material/Box';




const Header = () => {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            padding={6}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <img src="https://avoidcheaters.fra1.digitaloceanspaces.com/Screenshot%202022-11-13%20at%208.20.04%20PM.png" alt="logo"
                style={{ width: '40%', maxWidth: '600px', height: 'auto' }}
            />
            <br />
            <img src="https://avoidcheaters.fra1.digitaloceanspaces.com/Screenshot%202022-11-13%20at%208.20.21%20PM.png" alt="logo"
                style={{ width: '120%', maxWidth: '600px', height: 'auto' }}
            />
        </Box >
    );
}

export default Header
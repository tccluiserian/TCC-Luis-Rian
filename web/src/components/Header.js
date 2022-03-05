import React from 'react';
import { Typography, IconButton, AppBar, Toolbar } from "@material-ui/core";
import { useIsLarge } from '../hooks/useIsLarge';
import { IoIosMenu } from "react-icons/io";

export default function Header(props) {

    const large = useIsLarge()

    return (
        <AppBar
            position="static"
            elevation={0}
            style={{background: "#032b50"}}
        >
            <Toolbar>
                {!large && <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => props.setOpen()}
                >
                    <IoIosMenu color="#ffffff" size={25} />
                </IconButton>}
                <div style={{ flexGrow: 1 }}>

                </div>
                <Typography variant="subtitle2" noWrap>
                    Painel Administrativo
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
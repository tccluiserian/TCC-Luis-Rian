import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IoIosContacts } from "react-icons/io";
import { IoChevronDown, IoChevronForward, IoListCircleOutline, IoImage, IoPhonePortraitOutline, IoBusinessOutline, IoAlbumsOutline, IoHomeOutline, IoBarcodeOutline, IoLink } from "react-icons/io5";
import { BsFileRichtext } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { Collapse, makeStyles } from '@material-ui/core';
import { BiDetail } from 'react-icons/bi';
import { TiContacts } from 'react-icons/ti';
import logoapenas from '../assets/logo-branca.png'
import { ReactImageTint } from 'react-image-tint';
import { FaDoorClosed } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    selected: {
        backgroundColor: 'rgba(255,255,255,0.2)'
    }
}));

export default function DrawerOptionsList(props) {

    const classes = useStyles()
    const [current, setCurrent] = useState('inicial')
    const history = useHistory()
    const [openConfiguracoes, setOpenConfiguracoes] = useState(false)
    const [openProjetos, setOpenAmbientes] = useState(false)
    const [openCodigos, setOpenCodigos] = useState(false)

    useEffect(() => {


        let pathname1 = history.location.pathname

        if (pathname1.includes('codigos-cadastro')) {
            setOpenCodigos(true)
            setOpenAmbientes(false)

            if (pathname1.includes("gerar-novo")) {
                setCurrent('novo-codigo')
            } else {
                setCurrent("codigos-cadastro")
            }
        } else if (pathname1.includes('usuarios-conectados')) {
            setOpenCodigos(false)
            setOpenAmbientes(false)

            setCurrent('usuarios-conectados')
        } else if (pathname1.includes('usuarios')) {
            setOpenCodigos(false)
            setOpenAmbientes(false)
            setCurrent("usuarios")

        } else if (pathname1.includes('ambientes')) {
            setOpenCodigos(false)
            setOpenAmbientes(true)

            if (pathname1.includes("cadastrar-novo")) {
                setCurrent('novo-ambiente')
            } else {
                setCurrent('ambientes')
            }
        } else {
            setCurrent('inicial')
        }


        let historyListener = history.listen((listener) => {

            let pathname = listener.pathname

            if (pathname.includes('codigos-cadastro')) {
                setOpenCodigos(true)
                setOpenAmbientes(false)

                if (pathname.includes("gerar-novo")) {
                    setCurrent('novo-codigo-cadastro')
                } else {
                    setCurrent("codigos-cadastro")
                }
            } else if (pathname.includes('usuarios-conectados')) {
                setOpenCodigos(false)
                setOpenAmbientes(false)
    
                setCurrent('usuarios-conectados')
            } else if (pathname.includes('usuarios')) {
                setOpenCodigos(false)
                setOpenAmbientes(false)
                setCurrent("usuarios")

            } else if (pathname.includes('ambientes')) {
                setOpenCodigos(false)
                setOpenAmbientes(true)

                if (pathname.includes("cadastrar-novo")) {
                    setCurrent('novo-ambiente')
                } else {
                    setCurrent('ambientes')
                }
            } else {
                setCurrent('inicial')
            }

        })

        return () => {
            historyListener()
        };

    }, []);


    const clicaLink = (event, url) => {

        if (url.includes("dados")) {
            setOpenCodigos(true)
        } else {
            setOpenCodigos(false)
        }

        event.preventDefault()
        props.handleDrawerClose()
        history.push(url)
    }

    return (
        <List component={'nav'}>
            <div style={{ height: 25, overflowX: 'hidden' }}>

            </div>
            <div style={{ display: 'flex', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', paddingLeft: 17, paddingRight: 17 }}>
                <img style={{ height: 'auto', width: 215 }} src={logoapenas} />
            </div>
            <div style={{ height: 25, overflowX: 'hidden' }}>

            </div>
            <ListItem onClick={(event) => clicaLink(event, '/')} selected={current === 'inicial'} button>
                <Tooltip title="Início" arrow placement='bottom-start'>
                    <ListItemIcon style={{ paddingLeft: 10 }}><IoHomeOutline size={20} color="#ffffff" /></ListItemIcon>
                </Tooltip>
                <ListItemText primary={'Início'} style={{ paddingTop: 3 }} primaryTypographyProps={{ style: { color: '#ffffff', fontSize: 14 } }} />
            </ListItem>
            <ListItem onClick={(event) => clicaLink(event, '/ambientes')} selected={current === 'ambientes'} button>
                <Tooltip title="Ambientes" arrow placement='bottom-start'>
                    <ListItemIcon style={{ paddingLeft: 10 }}><FaDoorClosed size={20} color="#ffffff" /></ListItemIcon>
                </Tooltip>
                <ListItemText primary={'Ambientes'} style={{ paddingTop: 3 }} primaryTypographyProps={{ style: { color: '#ffffff', fontSize: 14 } }} />
            </ListItem>
            <ListItem onClick={(event) => clicaLink(event, '/usuarios')} selected={current === 'usuarios'} button>
                <Tooltip title="Usuários" arrow placement='bottom-start'>
                    <ListItemIcon style={{ paddingLeft: 10 }}><IoIosContacts size={22} color="#ffffff" /></ListItemIcon>
                </Tooltip>
                <ListItemText primary={'Usuários'} style={{ paddingTop: 3 }} primaryTypographyProps={{ style: { color: '#ffffff', fontSize: 14 } }} />
            </ListItem>
            <ListItem button onClick={(event) => clicaLink(event, '/codigos-cadastro')} selected={current === 'codigos-cadastro'}>
                <Tooltip title="Códigos de cadastro" arrow placement='bottom-start'>
                    <ListItemIcon>
                        <ListItemIcon style={{ paddingLeft: 10 }}><IoBarcodeOutline size={22} color="#ffffff" /></ListItemIcon>
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary={'Códigos de cadastro'} style={{ paddingTop: 3 }} primaryTypographyProps={{ style: { color: '#ffffff', fontSize: 14 } }} />
            </ListItem>
            <ListItem button onClick={(event) => clicaLink(event, '/usuarios-conectados')} selected={current === 'usuarios-conectados'}>
                <Tooltip title="Usuários conectados" arrow placement='bottom-start'>
                    <ListItemIcon>
                        <ListItemIcon style={{ paddingLeft: 10 }}><IoLink size={22} color="#ffffff" /></ListItemIcon>
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary={'Usuários conectados'} style={{ paddingTop: 3 }} primaryTypographyProps={{ style: { color: '#ffffff', fontSize: 14 } }} />
            </ListItem>
        </List>
    )
}
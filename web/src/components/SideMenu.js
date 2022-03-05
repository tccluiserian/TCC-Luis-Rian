import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Grid, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { FaPlus, FaClipboardList, FaUser, FaLandmark, FaChartLine, FaUserFriends, FaMotorcycle, FaUserPlus, FaDoorClosed, FaBarcode, FaSignOutAlt } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import { useSelector, useDispatch } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import { IoMdCheckmarkCircleOutline, IoIosWarning } from "react-icons/io";
import logo from '../assets/logo.png'
import { deslogar } from '../store/actions/user';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -10,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        color: '#ffffff'
    },
}))(Badge);

export default function SideMenu(props) {

    const history = useHistory()
    const solicitacoes = useSelector((state) => state.solicitacoes)
    const [mouseHover, setMouseHover] = useState(null)
    const [openAmbientes, setOpenAmbientes] = useState(false)
    const [openSolicitacao, setOpenSolicitacao] = useState(false)
    const [openCodigos, setOpenCodigos] = useState(false)
    const dispatch = useDispatch()

    const [current, setCurrent] = useState("inicial")

    useEffect(() => {

        let pathname1 = history.location.pathname

        if (pathname1.includes('ambientes')) {
            setOpenCodigos(false)
            setOpenAmbientes(true)

            if (pathname1.includes("cadastrar-novo")) {
                setCurrent('novo-ambiente')
            } else {
                setCurrent('ambientes')
            }
        } else if (pathname1.includes('codigos-cadastro')) {
            setOpenCodigos(true)
            setOpenAmbientes(false)

            if (pathname1.includes("gerar-novo")) {
                setCurrent('novo-codigo')
            } else {
                setCurrent("codigos-cadastro")
            }
        } else if (pathname1.includes('usuarios')) {
            setOpenCodigos(false)
            setOpenAmbientes(false)
            setCurrent("usuarios")

        } else {
            setCurrent('inicial')
        }


        let historyListener = history.listen((listener) => {

            let pathname = listener.pathname

            if (pathname.includes('ambientes')) {
                setOpenCodigos(false)
                setOpenAmbientes(true)

                if (pathname.includes("cadastrar-novo")) {
                    setCurrent('novo-ambiente')
                } else {
                    setCurrent('ambientes')
                }
            } else if (pathname.includes('codigos-cadastro')) {
                setOpenCodigos(true)
                setOpenAmbientes(false)

                if (pathname.includes("gerar-novo")) {
                    setCurrent('novo-codigo-cadastro')
                } else {
                    setCurrent("codigos-cadastro")
                }
            } else if (pathname.includes('usuarios')) {
                setOpenCodigos(false)
                setOpenAmbientes(false)
                setCurrent("usuarios")

            } else {
                setCurrent('inicial')
            }

        })

        return () => {
            historyListener()
        };

    }, []);

    const clickSolicitacao = () => {
        setOpenSolicitacao(!openSolicitacao)
    }

    const clickLink = (event, url) => {

        if (url.includes("codigos-cadastro")) {
            setOpenCodigos(true)
        } else {
            setOpenCodigos(false)
        }

        if (url.includes("ambientes")) {
            setOpenAmbientes(true)
        } else {
            setOpenAmbientes(false)
        }

        event.preventDefault()
        history.push(url)
    }

    const setOver = (name) => {
        if (name !== mouseHover) {
            setMouseHover(name)
        }
    }

    return (
        <Grid container direction={'column'} style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}>
            <Grid item container justify='center' alignItems='center' style={{ marginBottom: 40 }}>
                <div style={{padding: 12, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 20}}>
                    <img src={logo} style={{ width: 170, height: 90 }} />
                </div>
            </Grid>
            <Grid item container direction={'column'} style={{ marginBottom: 20, minWidth: 190 }}>
                <Grid item>
                    <div onClick={(event) => clickLink(event, '/')} onMouseEnter={() => setOver('inicial')} onMouseLeave={() => setMouseHover(null)} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingBottom: 10, paddingLeft: 10, borderBottom: '1px solid rgba(255,255,255,0.8)', borderColor: current === "inicial" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', cursor: 'pointer', opacity: (mouseHover === 'inicial') ? 0.7 : 1 }}>
                        <FaChartLine style={{ marginRight: 10 }} size={19} color={current === "inicial" ? '#f5f5f5' : 'rgba(255,255,255,0.8)'} />
                        <Typography style={{ fontSize: 14, color: current === "inicial" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', fontWeight: current === 'inicial' ? 700 : 500 }}>Início</Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid item container direction={'column'} style={{ marginBottom: 20, minWidth: 190 }}>
                <Grid item>
                    <div onClick={(event) => clickLink(event, '/usuarios')} onMouseEnter={() => setOver('usuarios')} onMouseLeave={() => setMouseHover(null)} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingBottom: 10, paddingLeft: 10, borderBottom: '1px solid rgba(255,255,255,0.8)', borderColor: current === "usuarios" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', cursor: 'pointer', opacity: (mouseHover === 'usuarios') ? 0.7 : 1 }}>
                        <FaUserFriends style={{ marginRight: 10 }} size={19} color={current === "usuarios" ? '#f5f5f5' : 'rgba(255,255,255,0.8)'} />
                        <Typography style={{ fontSize: 14, color: current === "usuarios" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', fontWeight: current === 'usuarios' ? 700 : 500 }}>Usuários</Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid item container direction={'column'} style={{ marginBottom: 20, minWidth: 190 }}>
                <Grid item>
                    <div onClick={(event) => clickLink(event, '/codigos-cadastro')} onMouseEnter={() => setOver('codigos-cadastro')} onMouseLeave={() => setMouseHover(null)} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingBottom: 10, paddingLeft: 10, borderBottom: '1px solid rgba(255,255,255,0.8)', borderColor: current === "codigos-cadastro" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', cursor: 'pointer', opacity: (mouseHover === 'codigos-cadastro') ? 0.7 : 1 }}>
                        <FaBarcode style={{ marginRight: 10 }} size={19} color={current === "codigos-cadastro" ? '#f5f5f5' : 'rgba(255,255,255,0.8)'} />
                        <Typography style={{ fontSize: 14, color: current === "codigos-cadastro" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', fontWeight: current === "codigos-cadastro" ? 700 : 500 }}>Códigos de cadastro</Typography>
                    </div>
                </Grid>                
            </Grid>
            <Grid item container direction={'column'} style={{ marginBottom: 20, minWidth: 190 }}>
                <Grid item>
                    <div onClick={(event) => clickLink(event, '/ambientes')} onMouseEnter={() => setOver('ambientes')} onMouseLeave={() => setMouseHover(null)} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingBottom: 10, paddingLeft: 10, borderBottom: '1px solid rgba(255,255,255,0.8)', borderColor: current === "ambientes" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', cursor: 'pointer', opacity: (mouseHover === 'ambientes') ? 0.7 : 1 }}>
                        <FaDoorClosed style={{ marginRight: 10 }} size={19} color={current === "ambientes" ? '#f5f5f5' : 'rgba(255,255,255,0.8)'} />
                        <Typography style={{ fontSize: 14, color: current === "ambientes" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', fontWeight: current === "ambientes" ? 700 : 500 }}>Ambientes</Typography>
                    </div>
                </Grid>
                <Grid item>
                    <Collapse in={openAmbientes}>
                        <Grid container direction={'column'} >
                            <Grid item style={{ marginTop: 15 }}>
                                <div onClick={(event) => clickLink(event, '/ambientes/cadastrar-novo')} onMouseEnter={() => setOver('novo-ambiente')} onMouseLeave={() => setMouseHover(null)} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingBottom: 10, paddingLeft: 5, marginLeft: 15, borderBottom: '1px solid rgba(255,255,255,0.8)', borderColor: current === "novo-ambiente" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', cursor: 'pointer', opacity: mouseHover === 'novo-ambiente' ? 0.7 : 1 }}>
                                    <FaPlus style={{ marginRight: 10 }} size={18} color={current === "novo-ambiente" ? '#f5f5f5' : 'rgba(255,255,255,0.8)'} />
                                    <Typography style={{ fontSize: 13, color: current === "novo-ambiente" ? '#f5f5f5' : 'rgba(255,255,255,0.8)', fontWeight: current === "novo-ambiente" ? 700 : 500 }}>Cadastrar novo</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
            </Grid>
            <Grid item container direction={'column'} style={{ marginBottom: 20, minWidth: 190, marginTop: 30 }}>
                <Grid item>
                    <div onClick={(event) => dispatch(deslogar())} onMouseEnter={() => setOver('deslogar')} onMouseLeave={() => setMouseHover(null)} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingBottom: 10, paddingLeft: 10, borderBottom: '1px solid rgba(255,255,255,0.8)', borderColor: 'red', cursor: 'pointer', opacity: (mouseHover === 'deslogar') ? 0.7 : 1 }}>
                        <FaSignOutAlt style={{ marginRight: 10 }} size={19} color={'red'} />
                        <Typography style={{ fontSize: 14, color: 'red', fontWeight: 500 }}>Desconectar</Typography>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
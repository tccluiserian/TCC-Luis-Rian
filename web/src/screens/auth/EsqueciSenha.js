import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { InputAdornment, IconButton, Grid, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { lembrarSenha, limpaErrorRedefinicao } from '../../store/actions/user';
import { useIsLarge } from '../../hooks/useIsLarge';
import { useHistory } from 'react-router-dom';
import Copyright from '../../components/CopyrightLogin'
import Loading from '../../components/Loading'
import { motion } from "framer-motion"
import logoBranca from '../../assets/logo.png'
import DisplayMessage from '../../components/DisplayMessage';
import { FaWhatsapp, FaGlobe } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#142d4d',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '100%',
        backgroundColor: '#FB7E39'
    },
    text: {
        textTransform: 'none',
        textAlign: 'center',
        fontSize: 13
    }
}));

export default function EsqueciSenha() {

    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const large = useIsLarge()
    const mainRef = useRef(null)
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')

    const mounted = useRef(false)

    useEffect(() => {
        scrollToRef()
        mounted.current = true

        return () => {
            mounted.current = false
        }
    }, [])

    const scrollToRef = () => {
        setTimeout(() => {
            if (mainRef.current !== null) {
                mainRef.current.scrollIntoView({ behavior: 'smooth' })
            }
        })
    }

    const handleClose = () => {
        dispatch(limpaErrorRedefinicao())
    }

    const onSubmit = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setErrorEmail('')
            dispatch(lembrarSenha(email))
        } else {
            setErrorEmail('Digite um email válido')
            setTimeout(() => {
                if (mounted.current) {
                    setErrorEmail('')
                }
            }, 3000)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}>
            <Box style={{ backgroundImage: 'linear-gradient(0deg, #ffffff 27%, #f7f7f7 73%)', overflow: 'hidden' }}>
                <Box minHeight={'100vh'} style={{ overflowX: 'hidden' }}>
                    <Grid container direction={'column'} alignItems={'center'} style={{ marginTop: 50, marginBottom: 10 }}>
                        <Grid item container justify={'center'} alignItems={'center'} style={{ height: 200 }} innerRef={mainRef}>
                            <Grid item>
                                <img src={logoBranca} style={{ width: 350, height: 150 }} />
                            </Grid>
                        </Grid>
                        <Grid item container justify={'center'}>
                            <div style={{ width: 360 }}>
                                <Grid item container direction={'column'} alignItems={'center'} spacing={1}>
                                    <Grid item>
                                        <Typography component="h1" variant="subtitle1" color={'primary'} style={{fontWeight: 500}}>
                                            Esqueci a senha
                                        </Typography>
                                    </Grid>
                                    <Grid item container justify='center' style={{ padding: 10, marginTop: 10, marginBottom: 10 }}>
                                        <Typography style={{ fontSize: 12, textAlign: 'center' }}>Um email será enviado com as instruções para alteração da senha</Typography>
                                    </Grid>
                                    <Grid item container spacing={0} direction={'column'} alignItems={'center'} style={{ width: '90%', marginTop: 10 }}>
                                        <Grid item container direction={'column'}>
                                            <Grid item>
                                                <TextField
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth
                                                    id="email"
                                                    name="email"
                                                    autoComplete={'new-password'}
                                                    color={'primary'}
                                                    value={email}
                                                    error={errorEmail.length > 0}
                                                    placeholder='Email'
                                                    onChange={(event) => setEmail(event.target.value)}
                                                    inputProps={{ style: { color: '#000000', fontSize: 13 } }}
                                                />
                                            </Grid>
                                            <Grid item style={{ height: 25, paddingLeft: 15 }}>
                                                {errorEmail && <p style={{ color: 'red', fontSize: 10 }}>{errorEmail}</p>}
                                            </Grid>
                                        </Grid>
                                        <Grid item style={{ marginTop: 15 }}>
                                            <Button
                                                onClick={() => onSubmit()}
                                                variant="contained"
                                                color="primary"
                                                style={{ textTransform: 'none', minWidth: 200 }}
                                            >
                                                Enviar
                                            </Button>
                                        </Grid>
                                        <Grid item container justify="center" alignItems="center" style={{ marginTop: 25 }}>
                                            <Button
                                                onClick={() => history.push('/login')}
                                                color="primary"
                                                style={{ textTransform: 'none', minWidth: 200, fontSize: 11 }}
                                            >
                                                Lembrei minha senha
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item>
                            <Box mt={8} style={{ marginBottom: 20 }}>
                                <Copyright />
                            </Box>
                        </Grid>
                    </Grid>
                    <DisplayMessage open={user.errorRedefinicao ? (user.errorRedefinicao.length > 0) : false} handleClose={handleClose} mensagem={user.errorRedefinicao} tipo={user.sucessoRedefinicao ? 'success' : 'error'} />
                    <Loading open={user.isLoadingRedefinicao} />
                </Box>
            </Box>
        </motion.div>
    );
}
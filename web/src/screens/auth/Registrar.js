import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

import { login, limpaMensagemAuth, registrar } from '../../store/actions/user';
import Loading from '../../components/Loading'
import Copyright from '../../components/CopyrightLogin'
import { useIsLarge } from '../../hooks/useIsLarge'

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DisplayMessage from '../../components/DisplayMessage';
import { motion } from "framer-motion"
import { FaWhatsapp, FaGlobe } from 'react-icons/fa';
import logoBranca from '../../assets/logo.png'
import IconButton from '@material-ui/core/IconButton';


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
        backgroundColor: '#142d4d',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '100%',
        backgroundColor: '#142d4d'
    },
    text: {
        textTransform: 'none',
        textAlign: 'center'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Registrar() {

    const classes = useStyles();
    const history = useHistory()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const large = useIsLarge()

    const mainRef = useRef(null)
    const mounted = useRef(false)

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorEmail, setErrorEmail] = useState('')
    const [errorSenha, setErrorSenha] = useState('')
    const [nome, setNome] = useState("")
    const [rptSenha, setRptSenha] = useState("")
    const [errorNome, setErrorNome] = useState('')
    const [errorRptSenha, setErrorRptSenha] = useState('')

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
        dispatch(limpaMensagemAuth())
    }

    const onSubmit = () => {

        let emailOk = false
        let senhaOk = false
        let rptSenhaOk = (rptSenha === senha) ? true : false
        let nomeOk = nome.trim().length>=2

        if (email.length > 0) {
            emailOk = true
        }

        if (senha.length >= 8) {
            senhaOk = true
        }

        if (emailOk && senhaOk && nomeOk && rptSenhaOk) {

            let data = {
                email,
                password: senha
            }

            let dadosUser = {
                email,
                nome
            } 

            dispatch(registrar(data, dadosUser))

        } else {
            if (!emailOk) {
                setErrorEmail('Digite um email válido')
            }
            if (!senhaOk) {
                setErrorSenha('Senha curta')
            }else{
                if(!rptSenhaOk){
                    setErrorRptSenha('Deve ser identica a senha')
                }
            }
            if(!nomeOk){
                setErrorNome('Deve ser maior que 2 caracteres')
            }
        

            setTimeout(() => {
                if (mounted.current) {
                    setErrorEmail('')
                    setErrorSenha('')
                    setErrorRptSenha('')
                    setErrorNome('')
                }
            }, 3000)
        }
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangeSenha = (event) => {
        setSenha(event.target.value)
    }

    const onChangeRptSenha = (event) => {
        setRptSenha(event.target.value)
    }

    const onChangeNome = (event) => {
        setNome(event.target.value)
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
                                        <Typography component="h1" variant="subtitle1" color={'primary'} style={{ fontWeight: 500 }}>
                                            Cadastro
                                        </Typography>
                                    </Grid>
                                    <Grid item container spacing={0} direction={'column'} alignItems={'center'} style={{ width: '90%', marginTop: 20 }}>
                                        <Grid item container direction={'column'}>
                                            <Grid item>
                                                <TextField
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth
                                                    id="nome"
                                                    name="nome"
                                                    autoComplete={'new-password'}
                                                    color={'primary'}
                                                    value={nome}
                                                    error={errorNome.length > 0}
                                                    placeholder='Nome da organização'
                                                    onChange={onChangeNome}
                                                    inputProps={{ style: { color: '#000000', fontSize: 13 } }}
                                                />
                                            </Grid>
                                            <Grid item style={{ height: 25, paddingLeft: 15 }}>
                                                {errorNome && <p style={{ color: 'red', fontSize: 10 }}>{errorNome}</p>}
                                            </Grid>
                                        </Grid>
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
                                                    placeholder='Email de acesso'
                                                    onChange={onChangeEmail}
                                                    inputProps={{ style: { color: '#000000', fontSize: 13 } }}
                                                />
                                            </Grid>
                                            <Grid item style={{ height: 25, paddingLeft: 15 }}>
                                                {errorEmail && <p style={{ color: 'red', fontSize: 10 }}>{errorEmail}</p>}
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction={'column'}>
                                            <Grid item>
                                                <TextField
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth
                                                    name="password"
                                                    autoComplete={'new-password'}
                                                    placeholder='Senha'
                                                    type="password"
                                                    onChange={onChangeSenha}
                                                    value={senha}
                                                    error={errorSenha.length > 0}
                                                    inputProps={{ style: { color: '#000000', fontSize: 13 } }}
                                                    id="password"
                                                />
                                            </Grid>
                                            <Grid item style={{ height: 25, paddingLeft: 15 }}>
                                                {errorSenha && <p style={{ color: 'red', fontSize: 10 }}>{errorSenha}</p>}
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction={'column'}>
                                            <Grid item>
                                                <TextField
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth
                                                    name="rptpassword"
                                                    autoComplete={'new-password'}
                                                    placeholder='Repita a senha'
                                                    type="password"
                                                    onChange={onChangeRptSenha}
                                                    value={rptSenha}
                                                    error={errorRptSenha.length > 0}
                                                    inputProps={{ style: { color: '#000000', fontSize: 13 } }}
                                                    id="rptpassword"
                                                />
                                            </Grid>
                                            <Grid item style={{ height: 25, paddingLeft: 15 }}>
                                                {errorRptSenha && <p style={{ color: 'red', fontSize: 10 }}>{errorRptSenha}</p>}
                                            </Grid>
                                        </Grid>
                                        <Grid item style={{ marginTop: 25 }}>
                                            <Button
                                                onClick={() => onSubmit()}
                                                variant="contained"
                                                color="primary"
                                                style={{ textTransform: 'none', minWidth: 200 }}
                                            >
                                                Cadastrar
                                            </Button>
                                        </Grid>
                                        <Grid item container justify="center" alignItems="center" style={{ marginTop: 25 }}>
                                            <Button
                                                onClick={() => history.push('/login')}
                                                color="primary"
                                                style={{ textTransform: 'none', minWidth: 200, fontSize: 11 }}
                                            >
                                                Já possui uma conta?
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
                    <DisplayMessage open={user.errorAuth ? (user.errorAuth.length > 0) : false} handleClose={handleClose} mensagem={user.errorAuth} tipo={'error'} />
                    <Loading open={user.isLoading} />
                </Box>
            </Box>
        </motion.div>
    );
}
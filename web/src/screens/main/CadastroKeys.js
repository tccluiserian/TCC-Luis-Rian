import React, { useState, useRef, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, SnackbarContent, IconButton, Snackbar, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useIsLarge } from '../../hooks/useIsLarge';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import { FiChevronsRight } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import DisplayMessage from '../../components/DisplayMessage';
import { fetchChavesCadastro } from '../../store/actions/chaves-cadastro';
import firebase from '../../firebase'
import moment from 'moment';
import uuid from 'react-uuid'
import { FaCopy, FaTrash } from 'react-icons/fa';
import { Pagination } from '@material-ui/lab';

export default function CadastroKeys() {

    const chavesCadastro = useSelector((state) => state.chavesCadastro)
    const user = useSelector((state) => state.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const large = useIsLarge()

    const ref = useRef(null)

    const mounted = useRef(false)

    const [mouseOver, setOver] = useState(null)
    const [keyExcluir, setKeyExcluir] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [mensagemExcluir, setMensagemExcluir] = useState('')
    const [sucessoExcluir, setSucessoExcluir] = useState(false)
    const [tentativaExcluir, setTentativaExcluir] = useState(false)
    const [mensagemGerar, setMensagemGerar] = useState('')
    const [sucessoGerar, setSucessoGerar] = useState(false)
    const [tentativaGerar, setTentativaGerar] = useState(false)

    const [copiadoIndex, setCopiadoIndex] = useState(null)
    const [keys, setKeys] = useState([])
    const [pageAtual, setPageAtual] = useState(1)

    useEffect(() => {
        let valor = pageAtual - 1
        let pgInit = 5 * valor
        let pgEnd = 5 * (valor + 1)
        let fd = Object.assign([], chavesCadastro.chaves)
        let arrayPagina = fd.slice(pgInit, pgEnd)
        setKeys(Object.assign([], arrayPagina))
    }, [chavesCadastro])

    const returnValuePagination = () => {
        let value = 0

        let divisao = chavesCadastro.chaves.length / 5

        if (Number.isInteger(divisao)) {
            value = parseInt(divisao)
        } else {
            value = parseInt(divisao) + 1
        }

        return value
    }

    const handleChangePage = (event, value) => {
        let valor = value - 1
        let pgInit = 5 * valor
        let pgEnd = 5 * (valor + 1)
        let fd = Object.assign([], chavesCadastro.chaves)
        let arrayPagina = fd.slice(pgInit, pgEnd)
        setKeys(Object.assign([], arrayPagina))
        setPageAtual(value);
    }

    const handleClose = () => {
        setMensagemExcluir('')
        setTentativaExcluir(false)
        setSucessoExcluir(false)
        setKeyExcluir(null)
    }
    const handleClose2 = () => {
        setMensagemGerar('')
        setTentativaGerar(false)
        setSucessoGerar(false)
    }

    const clicaFetch = () => {
        dispatch(fetchChavesCadastro())
    }

    const copiaLink = (e, txt) => {
        var textField = document.createElement('textarea')
        textField.innerText = txt
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        setCopiadoIndex(txt)
        setTimeout(() => {
            setCopiadoIndex(null)
        }, 1500)
    }

    const retornaData = (data) => {
        let dat = '21/12/12'

        if (typeof (data.toDate) === 'function') {
            let data2 = data.toDate()

            let dd = data2.getDate() > 9 ? '' + data2.getDate() : '0' + data2.getDate()
            let mm = (data2.getMonth() + 1) > 9 ? '' + (data2.getMonth() + 1) : '0' + (data2.getMonth() + 1)
            let yy = data2.getFullYear()

            dat = `${dd}/${mm}/${yy}`
        }

        return dat
    }

    const returnType = () => {
        let type = ''

        if (chavesCadastro.isLoading) {
            type = 'loading'
        } else {
            if (chavesCadastro.fetched) {
                if (chavesCadastro.chaves.length > 0) {
                    type = 'cadastrado'
                } else {
                    type = 'nao-cadastrado'
                }
            } else {
                type = 'not-fetched'
            }
        }

        return type
    }

    const clicaGerar = () => {
        setLoading(true)
        setTentativaGerar(false)
        setSucessoGerar(false)
        setMensagemGerar('')

        let usert = firebase.auth().currentUser
        let db = firebase.firestore()
        let batch = db.batch()
        let dataExpiracao = moment().add(3, 'day').toDate()
        let key = Math.random().toString(36).substr(2, 9).toUpperCase();
        let keyLog = uuid()

        let logRef = db.collection('usuarios').doc(usert.uid).collection('logs').doc(keyLog)
        let ticketRef = db.collection('chaves-cadastro').doc(key)

        let ticketData = {
            criadorKey: usert.uid,
            dataExpiracao: dataExpiracao,
            criadorNome: user.nome
        }

        batch.set(logRef, { data: new Date(), titulo: 'Código de cadastro gerado', mensagem: `Código de cadastro '${key}' gerado com sucesso` })
        batch.set(ticketRef, ticketData)

        batch.commit()
            .then(() => {
                setLoading(false)
                setTentativaGerar(true)
                setSucessoGerar(true)
                setMensagemGerar('Código gerado com sucesso')
                setTimeout(() => {
                    setTentativaGerar(false)
                    setSucessoGerar(false)
                    setMensagemGerar('')
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                setTentativaGerar(true)
                setSucessoGerar(false)
                setMensagemGerar('Ocorreu um erro ao gerar o código')
                setTimeout(() => {
                    setTentativaGerar(false)
                    setSucessoGerar(false)
                    setMensagemGerar('')
                }, 2000)
            })

    }

    const clicaExcluir = (mod) => {
        setLoading(true)
        setTentativaExcluir(false)
        setSucessoExcluir(false)
        setMensagemExcluir('')

        let usert = firebase.auth().currentUser
        let db = firebase.firestore()
        let batch = db.batch()
        let dataExpiracao = moment().add(1, 'day').toDate()
        let keyLog = uuid()

        let logRef = db.collection('usuarios').doc(usert.uid).collection('logs').doc(keyLog)
        let ticketRef = db.collection('chaves-cadastro').doc(mod)

        let ticketData = {
            criadorKey: usert.uid,
            dataExpiracao: dataExpiracao,
            criadorNome: user.nome
        }

        batch.set(logRef, { data: new Date(), titulo: 'Código de cadastro excluído', mensagem: `Código de cadastro '${mod}' excluído com sucesso` })
        batch.delete(ticketRef)

        batch.commit()
            .then(() => {
                setLoading(false)
                setTentativaExcluir(true)
                setSucessoExcluir(true)
                setMensagemExcluir('Código excluído com sucesso')
                setTimeout(() => {
                    setTentativaExcluir(false)
                    setSucessoExcluir(false)
                    setMensagemExcluir('')
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                setTentativaExcluir(true)
                setSucessoExcluir(false)
                setMensagemExcluir('Ocorreu um erro ao excluir o código')
                setTimeout(() => {
                    setTentativaExcluir(false)
                    setSucessoExcluir(false)
                    setMensagemExcluir('')
                }, 2000)
            })
    }

    const returnLoading = () => {
        let loading = false

        if (isLoading) {
            loading = true
        }
        if (chavesCadastro.isLoading) {
            loading = true
        }

        return loading
    }

    return (
        <Box style={{ overflow: 'hidden', backgroundColor: '#f7f7f7' }} minHeight={'100vh'}>
            <Grid container direction={'column'} alignItems={'center'} spacing={0}>
                <Grid item container direction={'column'} justify={'center'} alignItems='center' style={{ marginTop: 35, marginBottom: 25 }}>
                    <Grid item>
                        <Typography variant='h6' color="primary">Códigos de cadastro</Typography>
                    </Grid>
                    <Grid item style={{ marginTop: 5 }}>
                        <Typography color='primary' noWrap={false} style={{ textAlign: 'center', fontSize: large ? 13 : 12, fontWeight: 500 }}>
                            Gerencie os códigos de cadastro do seu sistema
                        </Typography>
                    </Grid>
                    <Grid item style={{ marginTop: 5 }}>
                        <Typography color='primary' noWrap={false} style={{ textAlign: 'center', fontSize: large ? 11 : 10, color: 'red' }}>
                            * Os códigos são gerados com validade de 3 dias
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container direction='column' alignItems='center' style={{ width: !large ? 360 : 540 }}>
                    {returnType() === 'nao-cadastrado' &&
                        <Grid item container direction='column' alignItems='center' style={{ marginTop: 30 }}>
                            <Grid item>
                                <Typography variant='subtitle2' color="textPrimary" style={{ fontSize: 13 }}>Não há nenhum código de cadastro ativo</Typography>
                            </Grid>
                            <Grid item style={{ marginTop: 25 }}>
                                <Button onClick={() => clicaGerar()} variant='contained' color='primary' style={{ textTransform: 'none', fontSize: 13 }}>
                                    <Typography style={{ fontSize: 13, paddingLeft: 10, paddingRight: 10, fontWeight: 500 }}>
                                        Gerar novo
                                        </Typography>
                                </Button>
                            </Grid>
                        </Grid>}
                    {returnType() === 'not-fetched' && <Grid item container direction='column' alignItems='center' style={{ marginTop: 30 }}>
                        <Grid item>
                            <Typography variant='subtitle2' color="textPrimary">Ocorreu um erro ao sincronizar os códigos ativos</Typography>
                        </Grid>
                        <Grid item style={{ marginTop: 30 }} style={{ fontSize: 13 }}>
                            <Button onClick={() => clicaFetch()} variant='contained' color='primary' style={{ textTransform: 'none', fontSize: 13 }}>
                                <Typography style={{ fontSize: 13, paddingLeft: 10, paddingRight: 10, fontWeight: 500 }}>
                                    Atualizar
                                        </Typography>
                            </Button>
                        </Grid>
                    </Grid>}
                    {returnType() === 'cadastrado' &&
                        <Grid item container direction={'column'}>
                            <Grid item container style={{ marginBottom: 30 }}>
                                <Grid item xs={6}>
                                </Grid>
                                <Grid item container justify='center' alignItems='center' xs={6}>
                                    <Button onClick={() => clicaGerar()} variant='contained' color='primary' style={{ textTransform: 'none', fontSize: 13 }}>
                                        <Typography style={{ fontSize: 13, paddingLeft: 10, paddingRight: 10, fontWeight: 500 }}>
                                            Gerar novo
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            {keys.map((prod) => (
                                <Grid item key={prod.key} container style={{ border: '1px solid grey', borderRadius: 15, minHeight: 50, marginBottom: 15, padding: 10 }}>

                                    <Grid item container direction='column' xs={9} sm={10}>

                                        <Grid item>
                                            <Typography style={{ fontSize: 12, fontWeight: 500 }}>
                                                {'Código: ' + prod.key}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{ fontSize: 11, fontWeight: 400 }}>
                                                {'Válido até: ' + retornaData(prod.dataExpiracao)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container justify='center' alignItems='center' xs={3} sm={2}>
                                        <Tooltip title="Copiar" arrow placement='bottom-start'>
                                            <div style={{ cursor: 'pointer' }} onClick={(e) => copiaLink(e, prod.key)}>
                                                <FaCopy size={18} color={copiadoIndex === prod.key ? 'green' : 'black'} />
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Excluir" arrow placement='bottom-start'>
                                            <div style={{ cursor: 'pointer', marginLeft: 15 }} onClick={() => clicaExcluir(prod.key)}>
                                                <FaTrash size={18} color='red' />
                                            </div>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            ))}
                           {chavesCadastro.chaves.length>5 && <Grid item container justify='center' style={{ marginTop: 40, marginBottom: 40 }}>
                                <Pagination count={returnValuePagination()} page={pageAtual} onChange={handleChangePage} />
                            </Grid>}
                        </Grid>}
                </Grid>
            </Grid>
            {sucessoGerar && <DisplayMessage open={tentativaGerar} handleClose={() => handleClose2()} mensagem={mensagemGerar} tipo={'success'} />}
            {!sucessoGerar && <DisplayMessage open={tentativaGerar} handleClose={() => handleClose2()} mensagem={mensagemGerar} tipo={'error'} />}
            {sucessoExcluir && <DisplayMessage open={tentativaExcluir} handleClose={() => handleClose()} mensagem={mensagemExcluir} tipo={'success'} />}
            {!sucessoExcluir && <DisplayMessage open={tentativaExcluir} handleClose={() => handleClose()} mensagem={mensagemExcluir} tipo={'error'} />}
            <DisplayMessage open={copiadoIndex !== null} handleClose={() => handleClose()} mensagem={`Código '${copiadoIndex}' copiado`} tipo={'success'} />
            <Loading open={returnLoading()} />
        </Box>
    );
}
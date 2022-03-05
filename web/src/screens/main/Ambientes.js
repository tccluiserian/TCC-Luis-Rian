import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Tooltip, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useIsLarge } from '../../hooks/useIsLarge';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import DisplayMessage from '../../components/DisplayMessage';
import { fetchChavesCadastro } from '../../store/actions/chaves-cadastro';
import firebase from '../../firebase'
import uuid from 'react-uuid'
import { FaCopy, FaEdit, FaQrcode, FaTrash, FaUsersCog } from 'react-icons/fa';
import { Pagination } from '@material-ui/lab';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DialogConfirm from '../../components/DialogConfirm';

var QRCode = require('qrcode.react');

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 300,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: theme.spacing(2, 4, 3),
  },
}));

const rawAmb = {
  nome: '',
  key: null,
  codigo: ''
}

export default function Ambientes() {

  const classes = useStyles()
  const ambientes = useSelector((state) => state.ambientes)
  const history = useHistory()
  const dispatch = useDispatch()
  const large = useIsLarge()

  const [keyExcluir, setKeyExcluir] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [mensagemExcluir, setMensagemExcluir] = useState('')
  const [sucessoExcluir, setSucessoExcluir] = useState(false)
  const [tentativaExcluir, setTentativaExcluir] = useState(false)
  const downloadRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [currentAmb, setCurrentAmb] = useState({
    ...rawAmb
  })
  const [ambientesMostrar, setAmbientesMostrar] = useState([])
  const [pageAtual, setPageAtual] = useState(1)
  const [dialogExcluir, setDialogExcluir] = useState(false)
  const [ambExcluir, setAmbExcluir] = useState({ ...rawAmb })

  useEffect(() => {
    let valor = pageAtual - 1
    let pgInit = 5 * valor
    let pgEnd = 5 * (valor + 1)
    let fd = Object.assign([], ambientes.ambientes)
    let arrayPagina = fd.slice(pgInit, pgEnd)
    setAmbientesMostrar(Object.assign([], arrayPagina))
  }, [ambientes])

  const returnValuePagination = () => {
    let value = 0

    let divisao = ambientes.ambientes.length / 5

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
    let fd = Object.assign([], ambientes.ambientes)
    let arrayPagina = fd.slice(pgInit, pgEnd)
    setAmbientesMostrar(Object.assign([], arrayPagina))
    setPageAtual(value);
  }

  const handleClose = () => {
    setMensagemExcluir('')
    setTentativaExcluir(false)
    setSucessoExcluir(false)
    setKeyExcluir(null)
  }

  const clicaFetch = () => {
    dispatch(fetchChavesCadastro())
  }

  const returnType = () => {
    let type = ''

    if (ambientes.isLoading) {
      type = 'loading'
    } else {
      if (ambientes.fetched) {
        if (ambientes.ambientes.length > 0) {
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

  const clicaExcluir = () => {
    setDialogExcluir(false)
    if (ambExcluir.key !== null && ambExcluir.key !== undefined) {
      let mod = ambExcluir.key
      let nome = ambExcluir.nome
      let cod = ambExcluir.codigo
      setLoading(true)
      setTentativaExcluir(false)
      setSucessoExcluir(false)
      setMensagemExcluir('')

      let usert = firebase.auth().currentUser
      let db = firebase.firestore()
      let batch = db.batch()
      let keyLog = uuid()

      let logRef = db.collection('usuarios').doc(usert.uid).collection('logs').doc(keyLog)
      let ticketRef = db.collection('usuarios').doc(usert.uid).collection('ambientes').doc(mod)

      batch.set(logRef, { data: new Date(), titulo: 'Ambiente excluído', mensagem: `Ambiente "${nome}" excluído com sucesso` })
      if (cod !== null && cod !== undefined) {
        let codRef = db.collection('codigos-acesso').doc(cod)
        batch.delete(codRef)
      }

      batch.delete(ticketRef)

      batch.commit()
        .then(() => {
          setLoading(false)
          setTentativaExcluir(true)
          setSucessoExcluir(true)
          setMensagemExcluir('Ambiente excluído com sucesso')
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
          setMensagemExcluir('Ocorreu um erro ao excluir o ambiente')
          setTimeout(() => {
            setTentativaExcluir(false)
            setSucessoExcluir(false)
            setMensagemExcluir('')
          }, 2000)
        })
    }
  }

  const cancelaExcluir = () => {
    setAmbExcluir({ ...rawAmb })
    setDialogExcluir(false)
  }

  const clicaNavegar = (mod) => {

  }

  const copiaLink = (e) => {
    if (currentAmb.codigo.length > 0) {
      var textField = document.createElement('textarea')
      textField.innerText = currentAmb.codigo
      document.body.appendChild(textField)
      textField.select()
      document.execCommand('copy')
      textField.remove()
      setCopiado(true)
      setTimeout(() => {
        setCopiado(false)
      }, 1500)
    }
  }

  const downloadQr = () => {
    if (downloadRef.current !== null) {
      const canvas = document.querySelector('.HpQrcode > canvas')
      downloadRef.current.href = canvas.toDataURL()
      downloadRef.current.download = currentAmb.nome + "-QR.png"
    }
  }

  const returnLoading = () => {
    let loading = false

    if (isLoading) {
      loading = true
    }
    if (ambientes.isLoading) {
      loading = true
    }

    return loading
  }

  return (
    <Box style={{ overflow: 'hidden' }}>
      <Box style={{ backgroundColor: '#f7f7f7' }} minHeight='100vh'>
        <Grid container direction={'column'} alignItems={'center'} spacing={0}>
          <Grid item container direction={'column'} justifyContent={'center'} alignItems='center' style={{ marginTop: 35, marginBottom: 15 }}>
            <Grid item>
              <Typography variant='h6' color="primary">Ambientes</Typography>
            </Grid>
            <Grid item style={{ marginTop: 5 }}>
              <Typography color='primary' noWrap={false} style={{ textAlign: 'center', fontSize: large ? 13 : 12, fontWeight: 500 }}>
                Gerencie os ambientes que os usuários cadastrados podem acessar
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction='column' alignItems='center' style={{ width: !large ? 360 : 540, marginTop: 10 }}>
            {returnType() === 'nao-cadastrado' &&
              <Grid item container direction='column' alignItems='center' style={{ marginTop: 30 }}>
                <Grid item>
                  <Typography variant='subtitle2' color="textPrimary" style={{ fontSize: 13 }}>Não há nenhum ambiente criado</Typography>
                </Grid>
                <Grid item style={{ marginTop: 25 }}>
                  <Button onClick={() => history.push('/ambientes/novo-ambiente')} variant='contained' color='primary' style={{ textTransform: 'none', fontSize: 13 }}>
                    <Typography style={{ fontSize: 13, paddingLeft: 10, paddingRight: 10, fontWeight: 500 }}>
                      Novo ambiente
                    </Typography>
                  </Button>
                </Grid>
              </Grid>}
            {returnType() === 'not-fetched' && <Grid item container direction='column' alignItems='center' style={{ marginTop: 30 }}>
              <Grid item>
                <Typography variant='subtitle2' color="textPrimary">Ocorreu um erro ao sincronizar os ambientes</Typography>
              </Grid>
              <Grid item style={{ marginTop: 30 }}>
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
                  <Grid item container justifyContent='center' alignItems='center' xs={6}>
                    <Button onClick={() => history.push('/ambientes/novo-ambiente')} variant='contained' color='primary' style={{ textTransform: 'none', fontSize: 13 }}>
                      <Typography style={{ fontSize: 13, paddingLeft: 10, paddingRight: 10, fontWeight: 500 }}>
                        Novo ambiente
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                {ambientesMostrar.map((prod, index) => (
                  <Grid item key={prod.key} container style={{ border: '1px solid grey', display: index === 0 ? 'none' : 'flex',  borderRadius: 15, minHeight: 50, marginBottom: 15, padding: 10 }}>
                    <Grid item container direction='column' justifyContent='center' xs={7} sm={8} style={{paddingLeft: 10}}>
                      <Grid item>
                        <Typography style={{ fontSize: 13, fontWeight: 500 }}>
                          {'' + prod.nome}
                        </Typography>
                      </Grid>
                      <Grid item container alignItems='center'>
                        <Typography style={{ fontSize: 10, fontWeight: 400 }}>
                          {'Código acesso: ' + prod.codigo}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container justifyContent='center' alignItems='center' xs={5} sm={4}>
                      <Tooltip title="QRCode de acesso" arrow placement='bottom-start'>
                        <div style={{ cursor: 'pointer' }} onClick={() => { setCurrentAmb({ ...currentAmb, ...prod }); setOpen(true); }}>
                          <FaQrcode size={16} color='black' />
                        </div>
                      </Tooltip>                      
                      <Tooltip title="Excluir" arrow placement='bottom-start'>
                        <div style={{ cursor: 'pointer', marginLeft: 15 }} onClick={() => { setAmbExcluir({ ...rawAmb, ...prod }); setDialogExcluir(true) }}>
                          <FaTrash size={16} color='red' />
                        </div>
                      </Tooltip>
                    </Grid>
                  </Grid>
                ))}
                {ambientes.ambientes.length>5 && <Grid item container justifyContent='center' style={{ marginTop: 40, marginBottom: 40 }}>
                  <Pagination count={returnValuePagination()} page={pageAtual} onChange={handleChangePage} />
                </Grid>}
              </Grid>}
          </Grid>
        </Grid>
      </Box>
      <DialogConfirm open={dialogExcluir} handleConfirmar={() => clicaExcluir()} handleCancelar={() => cancelaExcluir()} titulo={'Atenção'} mensagem={'Deseja mesmo excluir esse ambiente?'} />
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => { setOpen(false); setCurrentAmb({ ...rawAmb }) }}
        closeAfterTransition
        disableAutoFocus={true}
        disableEnforceFocus={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <Grid container justifyContent='center'>
            <Grid item container justifyContent='center'>
              <Typography style={{ fontWeight: 700 }}>Compartilhe o ambiente</Typography>
            </Grid>
            <Grid item container justifyContent='center' style={{ marginTop: 20, marginBottom: 0 }}>
              <div className="HpQrcode">
                <QRCode
                  size={230}
                  value={`${currentAmb.codigo}`}
                  level={"H"}
                  includeMargin={true}
                />
              </div>
            </Grid>
            <Grid item container justifyContent='center' style={{ marginTop: 3 }}>
              <a onClick={() => downloadQr()} ref={downloadRef} style={{ width: 130, fontSize: 13, cursor: 'pointer', textAlign: 'center' }}>Baixar QRCode</a>
            </Grid>
            <Grid item container direction={'column'} style={{ marginTop: 20 }}>
              <Grid item container justifyContent='center' alignItems='center'>
                <Typography style={{ fontSize: 13 }}>{`Código de acesso: ${currentAmb.codigo}`}</Typography>
                <div style={{ paddingLeft: 15 }}>
                  <Tooltip title="Copiar" arrow placement='bottom-start'>
                    <div style={{ cursor: 'pointer' }} onClick={(e) => copiaLink(e)}>
                      <FaCopy size={15} color={copiado ? 'green' : 'black'} />
                    </div>
                  </Tooltip>
                </div>
              </Grid>
              <Grid item container justifyContent='center' alignItems='center' style={{ height: 30 }}>
                {copiado && <Typography style={{ color: 'green', fontSize: 11 }}>Código de acesso copiado</Typography>}
              </Grid>
            </Grid>
            <Grid item container justifyContent='center' style={{ marginTop: 8 }}>
              <Button onClick={() => { setOpen(false); setCurrentAmb({ ...rawAmb }) }} variant='contained' style={{ width: 130, fontSize: 13 }} disableElevation>Fechar</Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
      <DisplayMessage open={tentativaExcluir} handleClose={() => handleClose()} mensagem={mensagemExcluir} tipo={sucessoExcluir ? 'success' : 'error'} />
      <Loading open={returnLoading()} />
    </Box>

  );
}
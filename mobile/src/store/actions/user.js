import {
    SET_AMBIENTE_CONECTADO,
    LIMPA_AMBIENTE_CONECTADO  
} from './actionTypes'

export const setAmbienteConectado = (amb) => {
    return {
        type: SET_AMBIENTE_CONECTADO,
        payload: amb
    }
}

export const limpaAmbienteConectado = () => {
    return {
        type: LIMPA_AMBIENTE_CONECTADO
    }
}
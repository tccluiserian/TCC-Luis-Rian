import {
    SET_AMBIENTE_CONECTADO,
    LIMPA_AMBIENTE_CONECTADO  
} from '../actions/actionTypes'

const initialState = {
    conectado: false,
    key: null,
    ambienteKey: null,
    ambienteNome: '',
    horarioConexao: new Date(),
    organizacaoKey: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {           
        case SET_AMBIENTE_CONECTADO: {
            return {
                ...state,
                ...action.payload,
                conectado: true
            }
        }
        case LIMPA_AMBIENTE_CONECTADO: {
            return {
                ...initialState
            }
        }        
        default: {
            return state
        }
    }

}

export default reducer
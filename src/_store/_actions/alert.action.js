import { alertConstant } from '../_constants';

const success = (message) => {
    return {
        type: alertConstant.SUCCESS,
        message
    }
};

const error = (message) => {
    return {
        type: alertConstant.ERROR,
        message
    }
}

const clear = () => {
    return {
        type: alertConstant.CLEAR
    }
}

export const alertActions = {
    success,
    error,
    clear
}
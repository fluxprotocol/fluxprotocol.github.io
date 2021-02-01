import Big from 'big.js';
import { PoolToken } from '../../../models/PoolToken';
import trans from '../../../translation/trans';
import { ExitPoolFormValues } from './createDefaultExitPoolFormValues';

interface ExitPoolFormErrors {
    amountIn: string;
    canSubmit: boolean;
}

export default function validateExitPool(formValues: ExitPoolFormValues, poolToken: PoolToken) {
    const errors: ExitPoolFormErrors = {
        canSubmit: true,
        amountIn: '',
    }

    if (formValues.amountIn !== '') {
        if (new Big(poolToken.balance).lt(formValues.amountIn)) {
            errors.amountIn = trans('exitPool.validation.amountIn.tooHigh');
            errors.canSubmit = false;
        }

        if (new Big(formValues.amountIn).lte(0)) {
            errors.amountIn = trans('exitPool.validation.amountIn.negative');
            errors.canSubmit = false;
        }
    } else {
        errors.canSubmit = false;
    }

    return errors;
}

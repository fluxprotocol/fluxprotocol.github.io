import Big from "big.js";
import { TokenViewModel } from "../../../models/TokenViewModel";
import { toCollateralToken } from "../../../services/CollateralTokenService";
import trans from "../../../translation/trans";

interface LiquidityProviderErrors {
    liquidityAmountIn: string;
    canAddLiquidity: boolean;
}

export function validateLiquidityProviderFormValues(formValues: string, collateralToken: TokenViewModel): LiquidityProviderErrors {
    const errors: LiquidityProviderErrors = {
        canAddLiquidity: true,
        liquidityAmountIn: '',
    };

    if (formValues) {
        const inputAmount = toCollateralToken(formValues);

        if (new Big(inputAmount).lte(0)) {
            errors.canAddLiquidity = false;
        }

        if (new Big(inputAmount).gt(collateralToken.balance)) {
            errors.liquidityAmountIn = trans('liquidityProvider.errors.notEnoughBalance');
            errors.canAddLiquidity = false;
        }
    } else {
        errors.canAddLiquidity = false;
    }

    return errors;
}

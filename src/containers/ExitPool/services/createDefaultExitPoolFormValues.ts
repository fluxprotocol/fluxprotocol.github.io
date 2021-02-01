export interface ExitPoolFormValues {
    amountIn: string;
    amountInFormatted: string;
}

export default function createDefaultExitPoolFormValues(): ExitPoolFormValues {
    return {
        amountIn: '',
        amountInFormatted: '',
    };
}

interface Response {
    status: boolean;
    message: string;
    data: any;
    errors: any;
}

export const buildResponse = (
    message: string, 
    data: any
): Response => {
    let res: Response = {
        status: true,
        message: message,
        data: data,
        errors: null,
    };
    return res;
}

export const buildErrorResponse = (
    message: string,
    err: any, 
): Response => {
    let res: Response = {
        status: false,
        message: message,
        data: null,
        errors: err,
    };
    return res;
}
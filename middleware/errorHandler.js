import constants from './../constant.js';

export const errorHandler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
    let title = 'Error';

    switch (status) {
        case constants.VALIDATION_ERROR:
            title = 'validation Failed!';
            break;
        case constants.NOT_FOUND:
            title = 'Not Found';
            break;
        case constants.FORBIDDEN:
            title = 'Forbidden';
            break;
        case constants.UNAUTHORIZED:
            title = 'UnAuthorized';
            break;
        case constants.SERVER_ERROR:
            title = 'Server Error';
            break;
        default:
            console.log(err);
    }
    res.json({title:title, 'message': err.message })
}
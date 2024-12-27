class RESPONSE {
    success (req, res, message, status) {
        const statusCode = status || 200;
        const statusMessage = message || '';
        res.status(statusCode).send({
            error: false,
            status: status,
            body: message
        });
    };
    
    error (req, res, message, status) {
        const statusCode = status || 500;
        const statusMessage = message || 'Internal Server Error';
        res.status(statusCode).send({
            error: true,
            status: status,
            body: message
        });
    };
}

export default new RESPONSE();
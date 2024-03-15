const errorHandler = (err, request, response, next) => {
    const statusCode = response.status ? response.status : 500;
    response.status(statusCode);
    response.json({ message: err.message })

    next();
}

module.exports = errorHandler;
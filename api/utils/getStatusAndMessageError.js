const getStatusAndMessageError = (err) => {
    return {
      status: err.status || 500,
      message: err.message || 'Internal Server Error!',
    }
}

module.exports = getStatusAndMessageError;
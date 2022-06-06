const dbError = (error, res) => {
    switch (error.code) {
        case 'P1000':
            res.status(500).json({
                error: 'Database authentication error.',
                code: error.code,
            });
            break;

        case 'P1010':
            res.status(500).json({
                error: `Access denied for the user ${error.database_user} on the database ${error.database_name}.`,
                code: error.code,
            });
            break;

        case undefined:
            res.status(500).json({
                error: 'Database connection error.'
            });
            break;
            
        default:
            res.status(500).json({
                error: {...error, message: 'Unhandled error. See https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes for more info.'}
            })
    }
}
module.exports = dbError

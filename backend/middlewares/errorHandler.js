exports.notFound = (req, res, next) => {
const err = new Error(`Not Found - ${req.originalUrl}`);
err.status = 404;
next(err);
};


exports.errorHandler = (err, req, res, next) => {
const status = err.status || 500;
res.status(status).json({
error: {
message: err.message || 'Server Error',
status,
},
});
};
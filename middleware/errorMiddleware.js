const errorHandler = (err, req, res, next) => {
    // console.log("error starts from here!", err);
    // console.dir('Load properly Now', err)
    // console.log("Error Handler Running");
    res.json({ message: err.message });
}

module.exports = errorHandler;


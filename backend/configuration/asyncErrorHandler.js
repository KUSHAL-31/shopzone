module.exports = (myFunction) => (req, res, next) => {
    Promise.resolve(myFunction(req, res, next)).catch(next);
}
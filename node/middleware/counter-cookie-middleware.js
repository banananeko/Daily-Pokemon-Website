/**
 * Maintains a cookie called "callCount". every time this middleware is invoked, it will increment
 * the integer value stored in that cookie by 1. If the cookie doesn't exist, it will be created with
 * the initial value of 1.
 */
function incrementCallCountCookie(req, res, next) {

    let callCount = 1;
    if (req.cookies.callCount) {
        callCount = parseInt(req.cookies.callCount) + 1;
    }

    res.cookie("callCount", callCount);
    res.locals.callCount = callCount;

    next();
}

module.exports = {
    incrementCallCountCookie
};
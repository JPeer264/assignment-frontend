'use strict';

const check = module.exports = {}

check.isPushStateAvailable = function () {
    return !!(
        typeof window !== 'undefined' &&
            window.history &&
            window.history.pushState
    );
}
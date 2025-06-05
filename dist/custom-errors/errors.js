"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataError = exports.NetworkError = void 0;
// Custom errors to use in apiSimulator
class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}
exports.NetworkError = NetworkError;
class DataError extends Error {
    constructor(message) {
        super(message);
        this.name = "DataError";
    }
}
exports.DataError = DataError;

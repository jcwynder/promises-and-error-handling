"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProductCatalog = fetchProductCatalog;
exports.fetchProductReviews = fetchProductReviews;
exports.fetchSalesReport = fetchSalesReport;
// Import to utilize custom error handling
const errors_1 = require("../custom-errors/errors");
function simulateDelay(data, delay, shouldReject) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                reject(new errors_1.DataError("missing data field."));
            }
            else {
                resolve(data);
            }
        }, delay);
    });
}
// Simulate fetching product catalog
function fetchProductCatalog() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = [
            { id: 1, name: "Laptop", price: 1200 },
            { id: 2, name: "Smartphone", price: 800 },
            { id: 3, name: "Headphones", price: 200 },
        ];
        // Force DataError to simulate an error
        const shouldReject = true; // Always reject
        return simulateDelay(products, 1000, shouldReject);
    });
}
// Simulate fetching product reviews (this one will succeed for demonstration)
function fetchProductReviews(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviews = [
            { reviewer: "Alice", rating: 5, comment: "Excellent!" },
            { reviewer: "Bob", rating: 4, comment: "Very good" },
            { reviewer: "Charlie", rating: 3, comment: "Satisfactory" },
        ];
        const shouldReject = false; // Always succeed
        return simulateDelay(reviews, 1500, shouldReject);
    });
}
// Simulate fetching sales report (this one will simulate a NetworkError)
function fetchSalesReport() {
    return __awaiter(this, void 0, void 0, function* () {
        const report = {
            totalSales: 50000,
            unitsSold: 250,
            averagePrice: 200,
        };
        // Force NetworkError to simulate a failure
        const shouldReject = true; // Always reject
        if (shouldReject) {
            throw new errors_1.NetworkError("Failed to fetch sales report due to network issue");
        }
        return simulateDelay(report, 1000, false);
    });
}

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
// Imports to utilize methods for simulations and errors
const apiSimulator_1 = require("./api-simulation-functions/apiSimulator");
const errors_1 = require("./custom-errors/errors");
// Function for simulation
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Track all errors and successes
        let products = [];
        let salesReport = null;
        // Fetch product catalog and handle potential errors
        try {
            products = yield (0, apiSimulator_1.fetchProductCatalog)();
            console.log("Product Catalog:");
            products.forEach((product) => {
                console.log(`- ID: ${product.id}, Name: ${product.name}, Price: $${product.price}`);
            });
        }
        catch (error) {
            handleError(error, "product catalog");
            products = [
                { id: 1, name: "Laptop", price: 1200 },
                { id: 2, name: "Smartphone", price: 800 },
                { id: 3, name: "Headphones", price: 200 },
            ];
        }
        // Fetch reviews for each product, handle potential errors
        const reviewPromises = products.map((product) => (0, apiSimulator_1.fetchProductReviews)(product.id)
            .then((reviews) => {
            // Display reviews for each product after fetching successfully
            console.log(`Reviews for "${product.name}":`);
            reviews.forEach((review) => {
                console.log(`  - ${review.reviewer} (${review.rating}/5): ${review.comment}`);
            });
        })
            .catch((error) => handleError(error, `reviews for product ID ${product.id}`)));
        // Wait for all review fetches to complete
        yield Promise.all(reviewPromises);
        // Fetch sales report and handle potential errors
        try {
            salesReport = yield (0, apiSimulator_1.fetchSalesReport)();
            console.log("Sales Report:");
            console.log(`- Total Sales: $${salesReport.totalSales}`);
            console.log(`- Units Sold: ${salesReport.unitsSold}`);
            console.log(`- Average Price: $${salesReport.averagePrice}`);
        }
        catch (error) {
            handleError(error, "sales report");
        }
        console.log("All API calls have been attempted.");
    });
}
// Generic error handler that distinguishes error types
function handleError(error, context) {
    if (error instanceof errors_1.NetworkError) {
        console.error(`Network error while fetching ${context}:`, error.message);
    }
    else if (error instanceof errors_1.DataError) {
        console.error(`Data error while fetching ${context}:`, error.message);
    }
    else {
        console.error(`Unknown error while fetching ${context}:`, error);
    }
}
// Call the main function to start the simulation and catch an potential errors
main().catch((error) => {
    console.error("An unexpected error occurred in main:", error);
});

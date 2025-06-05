// Imports to utilize methods for simulations and errors
import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
} from "./api-simulation-functions/apiSimulator";

import { NetworkError, DataError } from "./custom-errors/errors";

// Function for simulation
async function main() {
  // Track all errors and successes
  let products: any[] = [];
  let salesReport: any = null;

  // Fetch product catalog and handle potential errors
  try {
    products = await fetchProductCatalog();
    console.log("Product Catalog:");
    products.forEach((product) => {
      console.log(
        `- ID: ${product.id}, Name: ${product.name}, Price: $${product.price}`
      );
    });
  } catch (error) {
    handleError(error, "product catalog");
    products = [
      { id: 1, name: "Laptop", price: 1200 },
      { id: 2, name: "Smartphone", price: 800 },
      { id: 3, name: "Headphones", price: 200 },
    ];
  }

  // Fetch reviews for each product, handle potential errors
  const reviewPromises = products.map((product) =>
    fetchProductReviews(product.id)
      .then((reviews) => {
        // Display reviews for each product after fetching successfully
        console.log(`Reviews for "${product.name}":`);
        reviews.forEach((review) => {
          console.log(
            `  - ${review.reviewer} (${review.rating}/5): ${review.comment}`
          );
        });
      })
      .catch((error) =>
        handleError(error, `reviews for product ID ${product.id}`)
      )
  );

  // Wait for all review fetches to complete
  await Promise.all(reviewPromises);

  // Fetch sales report and handle potential errors
  try {
    salesReport = await fetchSalesReport();
    console.log("Sales Report:");
    console.log(`- Total Sales: $${salesReport.totalSales}`);
    console.log(`- Units Sold: ${salesReport.unitsSold}`);
    console.log(`- Average Price: $${salesReport.averagePrice}`);
  } catch (error) {
    handleError(error, "sales report");
  }

  console.log("All API calls have been attempted.");
}

// Generic error handler that distinguishes error types
function handleError(error: unknown, context: string) {
  if (error instanceof NetworkError) {
    console.error(`Network error while fetching ${context}:`, error.message);
  } else if (error instanceof DataError) {
    console.error(`Data error while fetching ${context}:`, error.message);
  } else {
    console.error(`Unknown error while fetching ${context}:`, error);
  }
}

// Call the main function to start the simulation and catch an potential errors
main().catch((error) => {
  console.error("An unexpected error occurred in main:", error);
});

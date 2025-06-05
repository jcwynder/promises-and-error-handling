// Import to utilize custom error handling
import { NetworkError, DataError } from "../custom-errors/errors";

// Interfaces for Product, Review, and SalesReport information
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface SalesReport {
  totalSales: number;
  unitsSold: number;
  averagePrice: number;
}

function simulateDelay<T>(
  data: T,
  delay: number,
  shouldReject: boolean
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new DataError("missing data field."));
      } else {
        resolve(data);
      }
    }, delay);
  });
}

// Simulate fetching product catalog
export async function fetchProductCatalog(): Promise<Product[]> {
  const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Smartphone", price: 800 },
    { id: 3, name: "Headphones", price: 200 },
  ];

  // Force DataError to simulate an error
  const shouldReject = true; // Always reject

  return simulateDelay(products, 1000, shouldReject);
}

// Simulate fetching product reviews (this one will succeed for demonstration)
export async function fetchProductReviews(
  productId: number
): Promise<Review[]> {
  const reviews: Review[] = [
    { reviewer: "Alice", rating: 5, comment: "Excellent!" },
    { reviewer: "Bob", rating: 4, comment: "Very good" },
    { reviewer: "Charlie", rating: 3, comment: "Satisfactory" },
  ];

  const shouldReject = false; // Always succeed

  return simulateDelay(reviews, 1500, shouldReject);
}

// Simulate fetching sales report (this one will simulate a NetworkError)
export async function fetchSalesReport(): Promise<SalesReport> {
  const report: SalesReport = {
    totalSales: 50000,
    unitsSold: 250,
    averagePrice: 200,
  };

  // Force NetworkError to simulate a failure
  const shouldReject = true; // Always reject

  if (shouldReject) {
    throw new NetworkError("Failed to fetch sales report due to network issue");
  }

  return simulateDelay(report, 1000, false);
}

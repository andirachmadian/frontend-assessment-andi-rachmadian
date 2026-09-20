import { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import ProductFilters from "./components/ProductFilters";
import { getProducts } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold text-indigo-600">
              Product Management
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Product Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage and monitor your product catalog.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
          >
            + Add Product
          </button>
        </header>

        <ProductFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {isLoading && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            Loading products...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <ProductTable products={filteredProducts} />
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="font-medium text-gray-900">
              No products found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
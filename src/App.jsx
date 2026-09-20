import { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
import ProductFilters from "./components/ProductFilters";
import ProductForm from "./components/ProductForm";
import ProductDetailsModal from "./components/ProductDetailsModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState("");

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

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  function handleOpenCreateForm() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  function handleOpenEditForm(product) {
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingProduct(null);
  }

  async function handleProductSubmit(productData) {
    setIsSubmitting(true);
    setActionError("");

    if (editingProduct) {
      const originalProduct = editingProduct;

      const optimisticProduct = {
        ...editingProduct,
        ...productData,
      };

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProduct.id ? optimisticProduct : product,
        ),
      );

      try {
        const updatedProduct = await updateProduct(
          editingProduct.id,
          productData,
        );

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingProduct.id
              ? {
                  ...optimisticProduct,
                  ...updatedProduct,
                }
              : product,
          ),
        );

        handleCloseForm();
      } catch (err) {
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === originalProduct.id ? originalProduct : product,
          ),
        );

        setActionError(err.message);
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    const temporaryId = Date.now();

    const optimisticProduct = {
      ...productData,
      id: temporaryId,
      createdAt: new Date().toISOString(),
    };

    setProducts((currentProducts) => [...currentProducts, optimisticProduct]);

    try {
      const createdProduct = await createProduct({
        ...productData,
        createdAt: optimisticProduct.createdAt,
      });

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === temporaryId
            ? {
                ...optimisticProduct,
                ...createdProduct,
              }
            : product,
        ),
      );

      handleCloseForm();
    } catch (err) {
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== temporaryId),
      );

      setActionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDelete() {
    if (!productToDelete) return;

    const deletedProduct = productToDelete;

    setIsDeleting(true);
    setActionError("");

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== deletedProduct.id),
    );

    setProductToDelete(null);

    try {
      await deleteProduct(deletedProduct.id);
    } catch (err) {
      setProducts((currentProducts) => [...currentProducts, deletedProduct]);

      setActionError(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

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
            onClick={handleOpenCreateForm}
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
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-gray-200 bg-white">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

              <p className="text-sm text-gray-500">Loading products...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-medium text-red-700">Unable to load products</p>

            <p className="mt-1 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchProducts}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <ProductTable
            products={filteredProducts}
            onView={setSelectedProduct}
            onEdit={handleOpenEditForm}
            onDelete={setProductToDelete}
          />
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="font-medium text-gray-900">No products found</p>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      {actionError && (
        <div className="fixed right-5 top-5 z-[60] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg">
          {actionError}
        </div>
      )}

      {isFormOpen && (
        <ProductForm
          initialProduct={editingProduct}
          isSubmitting={isSubmitting}
          onClose={handleCloseForm}
          onSubmit={handleProductSubmit}
        />
      )}

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {productToDelete && (
        <DeleteConfirmModal
          product={productToDelete}
          isDeleting={isDeleting}
          onCancel={() => setProductToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
}

export default App;

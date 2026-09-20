const BASE_URL =
    "https://my-json-server.typicode.com/andirachmadian/frontend-assessment-andi-rachmadian";

export async function getProducts() {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}

export async function createProduct(product) {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("Failed to create product");
    }

    return response.json();
}

export async function updateProduct(id, product) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
});

    if (!response.ok) {
        throw new Error("Failed to update product");
    }

    return response.json();
}

export async function deleteProduct(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }

    return response.json();
}
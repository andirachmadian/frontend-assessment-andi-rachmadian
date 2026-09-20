const Base_URL = "https://my-json-server.typicode.com/AndiRachmadian/frontend-assessment-andi-rachmadian";

export async function getProducts() {
    const response = await fetch(`${Base_URL}/products`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}
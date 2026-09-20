
function ProductTable({ products }) {
    console.log(products);
    const formatCurrencty = (price) => 
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(price);

    const formatDate = (date) => {
        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Invalid date";
    }

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(parsedDate);
    };
        
    const getStatusClass = (status) => {
        return status === "In Stock"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-red-100 text-red-700"
    };

    const getCategoryClass = (category) => {
        switch (category) {
            case "Electronics":
                return "bg-blue-100 text-blue-700";

            case "Home & Kitchen":
                return "bg-amber-100 text-amber-700";

            case "Apparel":
                return "bg-purple-100 text-purple-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-200 bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                Name
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                Category
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                Price
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                Status
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                Created
                            </th>
                        </tr>
                    </thead>

                <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                        <tr key={product.id}
                            className="transition hover:bg-gray-50"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {product.name}
                            </td>

                            <td className="px-6 py-4">
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryClass(
                                    product.category
                                    )}`}
                                >
                                    {product.category}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-gray-700">
                                {formatCurrencty(product.price)}
                            </td>

                            <td className="px-6 py-4">
                                <span 
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                                        product.status
                                    )}`}
                                >
                                    {product.status}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-gray-500">
                                {formatDate(product.createdAt)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default ProductTable;
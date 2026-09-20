function ProductFilters({
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
}) {
    return (
    <div className="mb-6 grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-3">
    <div>
        <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-gray-700"
        >
            Search
        </label>

        <input
            id="search"
            type="text"
            placeholder="Search product name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
    </div>

    <div>
        <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-700"
        >
            Category
        </label>

        <select
            id="category"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Apparel">Apparel</option>
        </select>
    </div>

    <div>
        <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-700"
        >
            Status
        </label>

        <select
            id="status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
            <option value="All">All Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
        </select>
    </div>
    </div>
);
}

export default ProductFilters
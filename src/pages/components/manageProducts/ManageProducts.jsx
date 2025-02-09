import { useEffect, useState, useMemo } from "react";
import {
  Button,
  Flex,
  Modal,
  Title,
} from "@mantine/core";
import { useGetProductsQuery, useDeleteProductMutation } from "../../utility/services/products.service";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import PaginationComponent from "../../../shared/components/Pagination";
import useSearch from "../../../shared/utility/hooks/useSearch";
import useSort from "../../../shared/utility/hooks/useSort";
import { useSelector } from "react-redux";
import SearchBox from "../../../shared/components/SearchBox";
import { IconPlus } from "@tabler/icons-react";

const ManageProducts = () => {
  const [opened, setOpened] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { data: products = [], refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get Search Query from Redux
  const searchQuery = useSelector((state) => state.searchFilter?.searchQuery || "");

  // Memoize search results to prevent unnecessary re-renders
  const searchedProducts = useMemo(() => {
    return useSearch(products, searchQuery, ["name", "description", "category"]);
  }, [products, searchQuery]);

  // Memoize sorting results
  const { sortedData, handleSortColumn, sortColumn } = useSort(searchedProducts);

  // Total Items Count
  const totalCount = sortedData.length;

  // Memoize Pagination logic
  const paginatedProducts = useMemo(() => {
    return sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [sortedData, currentPage]);

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle Edit Product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpened(true);
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      refetch();
    }
  };

  // Close Modal & Reset Editing Product
  const handleCloseModal = () => {
    setEditingProduct(null);
    setOpened(false);
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Title order={4} visibleFrom="sm">Manage Products</Title>
        <Flex mt="md" gap="md">
          {/* Search box to perform product search */}
          <SearchBox />
          {/* Button to add product */}
          <Button onClick={() => setOpened(true)} visibleFrom="sm">
            Add Product
          </Button>

          <Button onClick={() => setOpened(true)} hiddenFrom="sm">
            <IconPlus size={20} />
          </Button>
        </Flex>
      </Flex>

      {/* Modal for Adding/Updating Product */}
      <Modal opened={opened} onClose={handleCloseModal} title={editingProduct ? "Update Product" : "Add New Product"} centered>
        <ProductForm product={editingProduct} onSuccess={handleCloseModal} />
      </Modal>

      {/* Product Table */}
      <ProductTable products={paginatedProducts} onEdit={handleEdit} onDelete={handleDelete} onSort={handleSortColumn} sortField={sortColumn} />

      {/* Pagination */}
      <PaginationComponent
        total={Math.ceil(totalCount / itemsPerPage)}
        page={currentPage}
        onChange={setCurrentPage}
        pageSize={itemsPerPage}
        totalCount={totalCount}
      />
    </>
  );
};

export default ManageProducts;

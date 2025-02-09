import { Table, ActionIcon, ScrollArea } from "@mantine/core";
import { IconArrowsSort, IconEdit, IconTrash } from "@tabler/icons-react";

const ProductTable = ({ products, onEdit, onDelete, onSort }) => {
  return (
    <ScrollArea style={{ width: "100%", maxWidth: "100vw" }}>
        {/* Start: Product data in table */}
    <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="sm"  mt="md">
      <Table.Thead>
        <Table.Tr>
          {["name", "description", "category", "price", "status", "actions"].map((field) => (
            <Table.Th
              key={field}
              onClick={() => field !== "actions" && onSort(field)}
              style={{ cursor: field !== "actions" ? "pointer" : "default" }}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {field !== "actions" && (
                <IconArrowsSort size={14} style={{ marginLeft: 6, opacity: 0.6 }} />
              )}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>{product.description}</Table.Td>
              <Table.Td>{product.category}</Table.Td>
              <Table.Td>₹{product.price}</Table.Td>
              <Table.Td>{product.status}</Table.Td>
              <Table.Td>
                <ActionIcon color="blue" variant="subtle" onClick={() => onEdit(product)}>
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="subtle" onClick={() => onDelete(product.id)} ml="md">
                  <IconTrash size={16} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan="6" style={{ textAlign: "center" }}>
              No products found
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
    {/* End: Product data in table */}
    </ScrollArea>
  );
};

export default ProductTable;

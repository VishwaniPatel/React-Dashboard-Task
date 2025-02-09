import { Flex, Pagination, Text } from "@mantine/core";

const PaginationComponent = ({ total, page, onChange, pageSize, totalCount }) => {
  if (totalCount === 0) return null; // Hide pagination if no items

  // Calculate range of results being displayed
  const startRange = (page - 1) * pageSize + 1;
  const endRange = Math.min(page * pageSize, totalCount);

  return (
    <Flex align="center" justify="space-between" mt={40}>
      {/* Showing results text */}
      <Text size="sm">
        Showing {startRange} - {endRange} of {totalCount} results
      </Text>

      {/* Pagination Control */}
      {total > 1 && <Pagination total={total} page={page} onChange={onChange} />}
    </Flex>
  );
};

export default PaginationComponent;

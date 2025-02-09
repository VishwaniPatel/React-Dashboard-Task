import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../utility/features/searchFilterSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchFilter.searchQuery);
    
  return (
    <TextInput
      icon={<IconSearch size={16} />}
      placeholder="Search Products"
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
};

export default SearchBox;

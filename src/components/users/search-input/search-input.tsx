import { Input } from "@chakra-ui/react";

type Props = {
  filter: {
    filtering: string;
    setFiltering: React.Dispatch<React.SetStateAction<string>>;
  };
};

function SearchInput({ filter }: Props) {
  return (
    <Input
      size="lg"
      value={filter.filtering}
      placeholder="search by name"
      onChange={e => filter.setFiltering(e.target.value)}
    />
  );
}

export default SearchInput;

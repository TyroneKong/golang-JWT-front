import UseQueryAlbums from "../../hooks/albums";
import Logout from "../logout";
import { Text, Box } from "@chakra-ui/react";
import axios from "axios";
import useToken from "../../hooks/token";
import { useEffect } from "react";

function Albums() {
  const { data } = UseQueryAlbums();
  const { token, setToken } = useToken();
  console.log(token);

  const getRefreshToken = async () => {
    const response = await axios.post(
      "/ref/refresh",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
  };

  useEffect(() => {
    getRefreshToken();
  }, []);

  return (
    <>
      <Box>
        <Logout />
      </Box>
      <Box mt={10}>
        <Text as="h1">Albums</Text>
      </Box>

      <Box mt={10}>{data?.map(x => <Text key={x.ID}>{x.Title}</Text>)}</Box>
    </>
  );
}

export default Albums;

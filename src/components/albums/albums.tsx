import { Text, Box } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import UseQueryAlbums from "../../hooks/albums";
import Logout from "../logout";
import useToken from "../../hooks/token";
import axiosRequest from "../../requests/requests";

function Albums() {
  const { data } = UseQueryAlbums();
  const { token } = useToken();

  const getRefreshToken = useCallback(async () => {
    await axiosRequest("/ref/refresh", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [token]);

  useEffect(() => {
    getRefreshToken();
  }, [getRefreshToken]);

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

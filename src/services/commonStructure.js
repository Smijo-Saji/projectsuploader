import axios from "axios";

export const commonStructure = async (method, url, data, reqHeader) => {
  const config = {
    method,
    url,
    data,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
  };

  return await axios(config)
    .then((result) => result)
    .catch((data) => data);
};

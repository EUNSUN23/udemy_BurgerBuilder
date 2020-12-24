import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    console.log(req);
    setError(null);
    return req;
  });

  console.log("after req: " + error);

  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log(err);
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  console.log("after res: " + error);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  console.log(error);

  return [error, errorConfirmedHandler];
};

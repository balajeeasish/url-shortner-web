import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppConstants from "../../App.constants";

const ShortIdRedirect = () => {
  const { shortId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");
    fetch(`${AppConstants.API_URL}/urls/${shortId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((data) => {
            setIsLoading(false);
            setErrorMessage(data.errorMessage);
          });
        }
      })
      .then((data) => {
        setIsLoading(false);
        if (data?.longURL) {
          window.location.href = data.longURL;
        }
      });
  }, [shortId]);

  return (
    <>
      {isLoading && <span>Redirecting to long URL...</span>}
      {errorMessage && <span>{errorMessage}</span>}
    </>
  );
};

export default ShortIdRedirect;

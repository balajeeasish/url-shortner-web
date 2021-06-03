import React, { useState } from "react";

import TextInput from "../../components/TextInput";
import AppConstants from "../../App.constants";
import "./ShortUrlGenerateForm.scss";

const ShortUrlGenerateForm = () => {
  const [longURL, setLongURL] = useState("");
  const [isFormLoading, setIsFormLoding] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [shortUrlData, setShortUrlData] = useState(null);

  const onLongURLSubmit = () => {
    setIsFormLoding(true);
    setShortUrlData(null);
    fetch(`${AppConstants.API_URL}/urls`, {
      method: "post",
      body: JSON.stringify({
        longURL,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((data) => {
            setFormErrorMessage(data.errorMessage);
            setIsFormLoding(false);
          });
        }
      })
      .then((data) => {
        setShortUrlData(data);
        setIsFormLoding(false);
        setFormErrorMessage("");
      });
  };

  const onShortUrlClick = (e) => {
    const shortUrlEl = e.target;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(shortUrlEl);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div className="shorturl-form-wrapper">
      <div className="card">
        <form>
          <h4>Please enter Long URL and submit to get short URL</h4>
          <div className="long-ur-textbox">
            <TextInput
              type="url"
              placeholder="Enter Long URL"
              value={longURL}
              onChange={(e) => setLongURL(e.target.value)}
              errorText={formErrorMessage}
            />
          </div>
          <button type="button" onClick={onLongURLSubmit}>
            Submit
          </button>
        </form>
        {shortUrlData && (
          <div className="short-url-wrapper">
            <h4>Short URL</h4>
            <span
              onClick={onShortUrlClick}
            >{`${AppConstants.WEBSITE_HOST_ADDRESS}${shortUrlData.shortId}`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortUrlGenerateForm;

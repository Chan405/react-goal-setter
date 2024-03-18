import axios from "axios";
import React, { useState } from "react";
import { upload } from "../constants";

function Test() {
  const [file, setFile] = useState(null);
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post(upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
  };
  return (
    <>
      <input type="file" name="file" onChange={handleOnChange} />
      <button onClick={handleFileSubmit}> Submit </button>
    </>
  );
}

export default Test;

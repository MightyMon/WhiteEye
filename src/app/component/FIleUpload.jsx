import React, { useState } from "react";
import styles from "./FileUpload.module.css"; // Adjust the path based on your project structure
import Image from "next/image";


function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [fileData, setFileData] = useState(null); // State to store data from server response

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    // Prepare FormData to send the file to the server
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Send POST request to server with FormData
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // If upload is successful, parse JSON response
        const data = await response.json();
        console.log(data);
        setFileData(data); // Set fileData state with response data
        setMessage(data.message); // Set message state with response message
      } else {
        // If upload fails, get error text from response
        const errorText = await response.text();
        setMessage(`Failed to upload file: ${errorText}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className={styles.containerwrap}>
      <div className={styles.container}>
        <div className={styles.Imageclass}>
        <Image src="/FileUpload.svg" layout="fill"/>
        </div>
        <h1 className={styles.fileuploadh1}>Upload a file</h1>
        <form onSubmit={handleUpload} className={styles.fileform}>
          <input type="file" onChange={handleFileChange} className={styles.fileInput}/>
          <button type="submit" className={styles.filebutton}>Upload</button>
        </form>
        {message && <p>{message}</p>}
        {fileData && (
          <div>
            <h2 className={styles.fileuploadh2}>File Details</h2>
            <table className={styles.filetable}>
              <tbody>
                <tr>
                  <td className={styles.twidth}>MD5</td>
                  <td>{fileData.md5}</td>
                </tr>
                <tr>
                  <td>SHA1</td>
                  <td>{fileData.sha1}</td>
                </tr>
                <tr>
                  <td className={styles.twidth}>SHA256</td>
                  <td>{fileData.sha256}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;

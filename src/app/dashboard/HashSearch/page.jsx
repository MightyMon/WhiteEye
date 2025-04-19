// "use client";
// import styles from "./IP.module.css";
// import { Input } from "@nextui-org/input";
// import React, { useState } from "react";
// import { classNames } from "primereact/utils";
// import { FilterMatchMode } from "primereact/api";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { IconField } from "primereact/iconfield";
// import { InputIcon } from "primereact/inputicon";
// import { Tag } from "primereact/tag";
// import { ProgressSpinner } from "primereact/progressspinner";
// import { Button } from "primereact/button";
// import { FloatLabel } from "primereact/floatlabel";
// import Image from "next/image";
// import "./ipmodule.css";

// export default function IpFetch() {
//   const [inputValue, setInputValue] = useState("");
//   const [error, setError] = useState("");
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const validateIPAddress = (ip) => {
//     // Regex pattern for matching a valid IPv4 address
//     const pattern =
//       /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
//     return pattern.test(ip);
//   };

//   const fetchReport = async (ip) => {
//     setLoading(true);
//     setReport(null);
//     try {
//       const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
//       const data = await response.json();
//       setReport(data);
//     } catch (error) {
//       setError("Failed to fetch data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       if (validateIPAddress(inputValue)) {
//         setError("");
//         fetchReport(inputValue);
//       } else {
//         setError("Please enter a valid IP address.");
//       }
//     }
//   };

//   return (
//     <div className={styles.containerwrap}>
//       <div className="star"></div>
//       <div className="meteor-1"></div>
//       <div className="meteor-2"></div>
//       <div className="meteor-3"></div>
//       <div className="meteor-5"></div>
//       <div className="meteor-4"></div>
//       <div className="meteor-6"></div>
//       <div className="meteor-7"></div>
//       <div className="meteor-8"></div>
//       <div className="meteor-9"></div>
//       <div className="meteor-10"></div>
//       <div className="meteor-11"></div>
//       <div className="meteor-12"></div>
//       <div className="meteor-13"></div>
//       <div className="meteor-14"></div>
//       <div className="meteor-15"></div>

//       <div className={styles.container}>
//         <div className={styles.ColumnFlex}>
//           <div className={styles.imgLogo}>
//             <Image src="/IPSearch.svg" layout="fill" alt="IP Search Logo" />
//           </div>

//           <div>
//             <div
//               style={{
//                 paddingLeft: "20px",
//                 padding: "20px",
//                 backdropFilter: "blur(8.9px)",
//                 WebkitBackdropFilter: "blur(8.9px)",
//                 borderRadius: "10px",
//               }}
//             >
//               <div className="flex justify-content-end">
//                 <IconField iconPosition="left" className="search">
//                   <InputText
//                     placeholder="IP address to get data"
//                     className="input"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                   />
//                 </IconField>
//               </div>
//               {error && <div style={{ color: "red" }}>{error}</div>}
//             </div>
//           </div>
//         </div>
//       </div>
//       {loading && <ProgressSpinner />}
//       {report && (
//         <div className={styles.report}>
//           <h3>Report for IP: {inputValue}</h3>
//           <pre>{JSON.stringify(report, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import FileUpload from "@/app/component/FIleUpload";
import styles from "./HashSearch.module.css";
import React, { useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import "./hashsearchmodule.css";

export default function HashFetch() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const validateHash = (hash) => {
    const pattern = /^[a-fA-F0-9]{32}$|^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/;
    return pattern.test(hash);
  };

  const handleSubmit = (event) => {
    if (!validateHash(inputValue)) {
      event.preventDefault();
      setError("Please enter a valid MD5, SHA-1, or SHA-256 hash.");
    } else {
      setError("");
      // Add your logic here to handle the hash data
      console.log("Valid hash:", inputValue);
    }
  };

  return (
    <div className={styles.containerwrap}>
      <div className="star"></div>
      <div className="meteor-1"></div>
      <div className="meteor-2"></div>
      <div className="meteor-3"></div>
      <div className="meteor-5"></div>
      <div className="meteor-4"></div>
      <div className="meteor-6"></div>
      <div className="meteor-7"></div>
      <div className="meteor-8"></div>
      <div className="meteor-9"></div>
      <div className="meteor-10"></div>
      <div className="meteor-11"></div>
      <div className="meteor-12"></div>
      <div className="meteor-13"></div>
      <div className="meteor-14"></div>
      <div className="meteor-15"></div>

      <div className={styles.container}>
        <div className={styles.ColumnFlex}>
          <div className={styles.imgLogo}>
            <Image src="/hashsearch.svg" layout="fill" alt="hash Search Logo" />
          </div>

          <div>
            <div
              style={{
                paddingLeft: "20px",
                padding: "20px",
                backdropFilter: "blur(8.9px)",
                WebkitBackdropFilter: "blur(8.9px)",
                borderRadius: "10px",
              }}
            >
              <form action="HashSearch/HashReport" method="get" onSubmit={handleSubmit}>
                <div className="flex justify-content-end">
                  <IconField iconPosition="left" className="search">
                    <InputText
                      name="hash"
                      placeholder="Hash to get data"
                      className="input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </IconField>
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit" style={{ display: 'none' }}></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


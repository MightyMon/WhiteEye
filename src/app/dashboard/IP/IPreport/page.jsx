// "use client";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import styles from "./IPReport.module.css";
// import { ProgressSpinner } from "primereact/progressspinner";
// import { Chart } from "primereact/chart";

// const IPReport = () => {
//   const searchParams = useSearchParams();
//   const ip = searchParams.get("ip");
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [chartData, setChartData] = useState({});
//   const [chartOptions, setChartOptions] = useState({});

//   useEffect(() => {
//     if (ip) {
//       fetchReport(ip);
//     }
//   }, [ip]);

//   const fetchReport = async (ip) => {
//     setLoading(true);
//     setReport(null);
//     try {
//       const data = {
//         data: {
//           id: "231.234.122.123",
//           type: "ip_address",
//           links: {
//             self: "https://www.virustotal.com/api/v3/ip_addresses/231.234.122.123",
//           },
//           attributes: {
//             as_owner: "1337 Services GmbH",
//             last_analysis_date: 1719864726,
//             continent: "EU",
//             asn: 210558,
//             total_votes: {
//               harmless: 1,
//               malicious: 1,
//             },
//             last_modification_date: 1719970832,
//             last_analysis_stats: {
//               malicious: 8,
//               suspicious: 2,
//               undetected: 26,
//               harmless: 57,
//               timeout: 0,
//             },
//             country: "PL",
//             network: "45.141.215.0/24",
//             whois_date: 1719691414,
//             tags: ["tor"],
//           },
//         },
//       };

//       setReport(data.data.attributes);

//       const lastAnalysisStats = data.data.attributes.last_analysis_stats;

//       const chartData = {
//         labels: Object.keys(lastAnalysisStats),
//         datasets: [
//           {
//             data: Object.values(lastAnalysisStats),
//             backgroundColor: [
//               "#FF6347", // malicious
//               "#FFA500", // suspicious
//               "#00FF00", // harmless
//               "#808080", // undetected
//               "#0000FF", // timeout
//             ],
//             hoverBackgroundColor: [
//               "#FF8C78",
//               "#FFD180",
//               "#8CEC8C",
//               "#BDBDBD",
//               "#82B1FF",
//             ],
//           },
//         ],
//       };

//       const chartOptions = {
//         cutout: "60%",
//       };

//       setChartData(chartData);
//       setChartOptions(chartOptions);
//     } catch (error) {
//       setError("Failed to fetch data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.containerwrap}>
//       {loading && <ProgressSpinner />}
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       {report && (
//         <div className={styles.container}>
//           <div className={styles.buttonrow}>
//             <button className={styles.leftbutton}>
//               <i className="pi pi-arrow-left"></i> Go Back
//             </button>
//             <button className={styles.rightbutton}>
//               <i className="pi pi-download"></i> Download report
//             </button>
//           </div>
//           <div>
//             <h1 className={styles.ReportHeading}>Report</h1>
//           </div>
//           <h3>Report for IP: {report.id}</h3>
//           <div className={styles.header1}>
//             <div className={styles.basicProperties}>
//               <table>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <strong>AS Owner:</strong>
//                     </td>
//                     <td>{report.as_owner}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Country:</strong>
//                     </td>
//                     <td>{report.country}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Network:</strong>
//                     </td>
//                     <td>{report.network}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Regional Internet Registry:</strong>
//                     </td>
//                     <td>{report.regional_internet_registry}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Last Analysis Date:</strong>
//                     </td>
//                     <td>
//                       {new Date(
//                         report.last_analysis_date * 1000
//                       ).toLocaleString()}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <div className={styles.chartContainer}>
//               <Chart type="doughnut" data={chartData} options={chartOptions} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IPReport;



// IPReport.jsx
'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./IPReport.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { Chart } from "primereact/chart";

const IPReport = () => {
  const searchParams = useSearchParams();
  const ip = searchParams.get("ip");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (ip) {
      fetchReport(ip);
    }
  }, [ip]);

  const fetchReport = async (ip) => {
    setLoading(true);
    setReport(null);
    try {
      const response = await fetch(`http://localhost:8080/ipdata?ipAddress=${ip}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setReport(data.data.attributes);

      const lastAnalysisStats = data.data.attributes.last_analysis_stats;

      const chartData = {
        labels: Object.keys(lastAnalysisStats),
        datasets: [
          {
            data: Object.values(lastAnalysisStats),
            backgroundColor: [
              "#FF6347", // malicious
              "#FFA500", // suspicious
              "#00FF00", // harmless
              "#808080", // undetected
              "#0000FF", // timeout
            ],
            hoverBackgroundColor: [
              "#FF8C78",
              "#FFD180",
              "#8CEC8C",
              "#BDBDBD",
              "#82B1FF",
            ],
          },
        ],
      };

      const chartOptions = {
        cutout: "60%",
      };

      setChartData(chartData);
      setChartOptions(chartOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.containerwrap}>
      {loading && <ProgressSpinner />}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {report && (
        <div className={styles.container}>
          <div className={styles.buttonrow}>
            <button className={styles.leftbutton}>
              <i className="pi pi-arrow-left"></i> Go Back
            </button>
            <button className={styles.rightbutton}>
              <i className="pi pi-download"></i> Download report
            </button>
          </div>
          <div>
            <h1 className={styles.ReportHeading}>Report</h1>
          </div>
          <h3>Report for IP: {report.id}</h3>
          <div className={styles.header1}>
            <div className={styles.basicProperties}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>AS Owner:</strong>
                    </td>
                    <td>{report.as_owner}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Country:</strong>
                    </td>
                    <td>{report.country}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Network:</strong>
                    </td>
                    <td>{report.network}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Regional Internet Registry:</strong>
                    </td>
                    <td>{report.regional_internet_registry}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Last Analysis Date:</strong>
                    </td>
                    <td>
                      {new Date(
                        report.last_analysis_date * 1000
                      ).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.chartContainer}>
              <Chart type="doughnut" data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPReport;

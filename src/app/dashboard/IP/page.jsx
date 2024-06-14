'use client'
// import React, { useState, useEffect } from "react";
// import { IPFetch } from "@/app/service/IPFetch";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { DataTable } from "primereact/datatable";
// import { ProgressSpinner } from "primereact/progressspinner";
 import styles from "./IP.module.css";
// import { classNames } from 'primereact/utils';
// import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import { InputText } from 'primereact/inputtext';
// import { IconField } from 'primereact/iconfield';
// import { InputIcon } from 'primereact/inputicon';
// import { Dropdown } from 'primereact/dropdown';
// import { MultiSelect } from 'primereact/multiselect';
// import { Tag } from 'primereact/tag';
// import { TriStateCheckbox } from 'primereact/tristatecheckbox';

// const IPPage = () => {
//   const [aliveIPs, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Flag for loading state

//   const getCustomers = (data) => {
//     return [...(data || [])].map((d) => {
//       d.date = new Date(d.date);
//       return d;
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/ipLiveChk?ip=10.113.23.47/24"); // Assuming local API

//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }

//         const data = await response.json();
//         setProducts(getCustomers(data));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false); // Ensure loading state is set to false even if there's an error
//       }
//     };

//     fetchData();
    

//   }, []);

//   const content = isLoading ? (
//     <div className={styles.loadingContainer}>
//       <ProgressSpinner 
//     style={{width: '100px', height: '100px'}} 
//     strokeWidth="8" 
//     color="grey" 
//     animationDuration=".5s" 
// />
//     </div>
//   ) : (
//     <DataTable value={aliveIPs} tableStyle={{ minWidth: "50rem" }}>
//       <Column field="ip" header="IP"></Column>
//       <Column field="isAlive" header="Is Alive"></Column>
//       <Column header="Category"></Column>
//       <Column field="quantity" header="Quantity"></Column>
//     </DataTable>
//   );

//   return (
//     <div className={styles.container}>
//       <Button label="Submit" onClick={console.log("hello")}/>
//       <h2 className={styles.title}>Recent Active IPs</h2>
//       <div className="card">{content}</div>
//     </div>
//   );
// };

// export default IPPage;


import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import "./ipmodule.css";
export default function IpTable() {
    const [ipData, setIpData] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ip: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        isalive: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        fetch('/api/ipquick')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setIpData(data);
                } else {
                    console.error('Data is not an array:', data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    // style={{"padding-left": '20px',padding: '20px', background: "#858893B0","box-shadow": "0 4px 30px rgba(0, 0, 0, 0.1)","backdrop-filter": "blur(8.9px)","-webkit-backdrop-filter": "blur(8.9px)","border-radius": "10px"}}
    const renderHeader = () => {
      return (
        <div style={{"padding-left": '20px',padding: '20px',"backdrop-filter": "blur(8.9px)","-webkit-backdrop-filter": "blur(8.9px)","border-radius": "10px"}}>

              <div className="flex justify-content-end">
                  <IconField iconPosition="left" className='search'>
                      <InputIcon className="pi pi-search" style={{"padding-right": '20px' }}/>
                      <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className='input'/>
                  </IconField>
              </div>
          </div>
      );
  };

    const iconBodyTemplate = () => {
        return <i className="pi pi-desktop" style={{ fontSize: '2em' }}></i>;
    };


    const header = renderHeader();

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
            {loading ? (
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration="100s" />
            ) : (
                <DataTable value={ipData} paginator rows={10} dataKey="ip" filters={filters} filterDisplay="row" globalFilterFields={['ip', 'isalive']} header={header} emptyMessage="No data found." className='input'>
                    <Column body={iconBodyTemplate} header="Icon" />
                    <Column field="ip" header="IP" />
                    <Column field="isalive" header="Is Alive"  />
                    <Column field="cidr" header="CIDR" style={{ minWidth: '12rem' }} body={() => '10.113.23.0/24'} />
                </DataTable>
            )}
        </div>
        </div>
    );
}


"use client";

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const roleOptions = [
    { label: 'Normal', value: 'NORMAL' },
    { label: 'Admin', value: 'ADMIN' },
];

const AdminUserManagementPage = () => {
  const { data: session, status } = useSession();
  const toast = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('NORMAL');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    'name': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'email': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'role': { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  const dt = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
        try {
          const res = await fetch('/api/users');
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          const data = await res.json();
          setUsers(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else if (status !== 'loading') {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session, status]);

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast('success', 'Success', 'User created successfully!');
        setEmail('');
        setPassword('');
        setName('');
        setRole('NORMAL');
      } else {
        showToast('error', 'Error', data.message || 'Failed to create user');
      }
    } catch (error) {
      showToast('error', 'Error', 'An error occurred while creating the user.');
      console.error('Error creating user:', error);
    }
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Users</h5>
    </div>
  );

  const clearFilter = () => {
    initFilters();
  };

  const initFilters = () => {
    setFilters({
      'name': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'email': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'role': { value: null, matchMode: FilterMatchMode.EQUALS }
    });
  };

  useEffect(() => {
    initFilters();
  }, []);

  const roleBodyTemplate = (rowData) => {
    return <span>{rowData.role}</span>;
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h1 className="text-3xl font-bold text-center">Admin User Management</h1>

      <div className="card">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit} className="p-fluid p-formgrid grid">
          <div className="field col-12 md:col-6">
            <label htmlFor="email" className="font-bold">Email</label>
            <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="password" className="font-bold">Password</label>
            <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="name" className="font-bold">Name</label>
            <InputText id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="role" className="font-bold">Role</label>
            <Dropdown id="role" value={role} options={roleOptions} onChange={(e) => setRole(e.target.value)} placeholder="Select a Role" />
          </div>
          <div className="field col-12">
            <Button label={isSubmitting ? (
              <>
                <ProgressSpinner style={{ width: '20px', height: '20px' }} />
                <span className="ml-2">Creating...</span>
              </>
            ) : 'Create User'} type="submit" disabled={isSubmitting} />
          </div>
        </form>
      </div>

      <div className="card">
        <DataTable ref={dt} value={users} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
          globalFilterFields={['name', 'email', 'role']} header={header} emptyMessage="No users found."
          style={{
            backgroundColor: 'var(--bg)',
            color: 'var(--text)',
          }}
        >
          <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
          <Column field="email" header="Email" filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }} />
          <Column field="role" header="Role" filterField="role" style={{ minWidth: '12rem' }} body={roleBodyTemplate} filter filterPlaceholder="Search by role" />
        </DataTable>
      </div>
    </div>
  );
};

export default AdminUserManagementPage;
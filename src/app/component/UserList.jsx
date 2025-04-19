"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const UserList = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!session || session.user.role !== 'ADMIN') {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div>
      <h2>User List (Admin Only)</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email}) - {user.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
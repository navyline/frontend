'use client';
import Link from 'next/link'
import Navbar from '/app/component/nav';
import Footer from '/app/Footter/footter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For redirectiony

export default function Page() {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [loading, setLoading] = useState(true); // State to handle loading
  const router = useRouter(); // Hook for navigation

  useEffect(() => {
    async function checkAuthentication() {
      // Check login status by looking for token in local storage
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        setLoading(false);
      } else {
        setIsLoggedIn(false);
        setLoading(false);
        router.push('/login'); // Redirect to signup page if not authenticated
      }
    }

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('https://backend-beryl-six-95.vercel.app/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
 
  getUsers()
  const interval  = setInterval(getUsers, 1000);
  return () => clearInterval(interval);
}, []);

const handleDelete = async (id) => {
  // Ask the user for confirmation
  const confirmed = window.confirm('คุณต้องการลบหรือไม่?');
  
  if (!confirmed) {
    return; // Exit the function if the user cancels
  }

  try {
    const res = await fetch(`https://backend-beryl-six-95.vercel.app/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to delete user');
    }

    const result = await res.json();
    console.log(result);

    // Optionally, update the state to remove the deleted item from the list
    setItems(items.filter(item => item.id !== id));
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

  return (
    <>
  <Navbar/>
    <br /><br /><br /><br />
    <div className="container">
      <div class="card">
  <div class="card-header">
    Users List
  </div>
  <div class="card-body">
  <div className="row">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className='col-md-2 text-center'>#</th>
            <th className='col-md-4'>Firstname</th>
            <th className='col-md-4'>Lastname</th>
            <th className='col-md-1'>Eidt</th>
            <th className='col-md-1'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className='text-center'>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td><Link href={`/users/edit/${item.id}`} className="btn btn-warning">Edit</Link></td>
              <td><button  className="btn btn-danger" type='button' onClick={() =>handleDelete(item.id)}>Del</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    </div>
    </div>
    <br /><br />
     <Footer/>
    </>
  );
}
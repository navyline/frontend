'use client';
import { useState } from 'react';
import Navbar from '/app/component/nav';
import Footer from '/app/Footter/footter';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Page() {

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission status

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://backend-beryl-six-95.vercel.app/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, username, password }),
    });

    const result = await res.json();
    console.log(result);
    
    if (res.ok) {
      setIsSubmitted(true); // Set submission status to true if successful
    }
  };

  return (
    <>
      <Navbar />
      <br /><br /><br />
      <div className="container">
        <div className="card">
          <div className="card-header bg-dark text-white">
            SignUp
          </div>
          <div className="card-body">
            {isSubmitted ? ( // Conditionally render the success message
              <div className="alert alert-success">
                สมัครสมาชิกเสร็จสิ้น
              </div>
            ) : (
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="form-label">FirstName</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                    <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">LastName</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-vcard-fill"></i></span>
                    <input type="text" className="form-control" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-vcard-fill"></i></span>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassWord(e.target.value)} required />
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-dark">
                    <i className="bi bi-box-arrow-right"></i> Sign Up
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

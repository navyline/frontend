'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '/app/component/nav';
import Footer from '/app/Footter/footter';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Page() {
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('https://backend-beryl-six-95.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify({ username }));
        setMessage('เข้าสู่ระบบสำเร็จ!');
        setTimeout(() => {
          router.push('/users');
        }, 1000);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-header bg-black text-white text-center">
            <h4>เข้าสู่ระบบ</h4>
          </div>
          <div className="card-body p-4">
            {message && (
              <div className="alert alert-info" role="alert">
                {message}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">ชื่อผู้ใช้</label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-person-circle"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">รหัสผ่าน</label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassWord(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-outline-dark">
                  <i className="bi bi-box-arrow-in-right"></i> เข้าสู่ระบบ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

import Link from 'next/link';
import styles from './Nav.module.css';
import { useState, useEffect } from 'react';

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Add any additional logic you need when logging out
  };

  return (
    <>
      <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-6 col-md-3 mb-2 mb-md-0">
              <Link href="/" className={`d-inline-flex ${styles.logoLink}`}>
                <img src="/img/1.jpg" alt="Logo" className={styles.logo} />
              </Link>
            </div>
            <div className="col-6 col-md-9">
              <nav className="navbar navbar-expand-md">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link href="/" className="nav-link px-2 link-secondary">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/about" className="nav-link px-2">
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/Service" className="nav-link px-2">
                        Service
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/Contact" className="nav-link px-2">
                        Contact
                      </Link>
                    </li>
                  </ul>
                  <div className="d-flex ms-md-3">
                    {isLoggedIn ? (
                      <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger me-2"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <Link href="/login" className="btn btn-outline-primary me-2">
                          Login
                        </Link>
                        <Link href="/signup" className="btn btn-primary">
                          Sign-up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

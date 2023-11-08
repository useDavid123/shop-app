import React from 'react';



import Footer from './Footer';
import HomeNavbar from './HomeNavbar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      
      <header>
        <HomeNavbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
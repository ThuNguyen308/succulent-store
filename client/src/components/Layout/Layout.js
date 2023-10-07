import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children, title, description, keywords, author}) => {
  return (
    <>
      <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
        </Helmet>
      <Header />
      <main className="container" style={{minHeight: '70vh', margin: '60px 0'}}>
          {children}
          <Toaster />
      </main>
      <Footer/>
    </>
  )

}

Layout.defaultProps = {
  title: "Watch store - luxury shop",
  description: "Online store with high quality product",
  keywords: "rolex, watch, luxury watch",
  author: "Thu Nguyen"
}

export default Layout
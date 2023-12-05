import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

const Layout = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <div>
      <Navbar />
      <main>
        {children}
        <Footer />
      </main>
    </div>
  )
}

export default Layout
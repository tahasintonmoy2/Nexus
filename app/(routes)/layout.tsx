import getProducts from '@/actions/get-products'
import CommandBar from '@/components/command-bar'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

const Layout = async({
    children
}:{
    children: React.ReactNode
}) => {
  const products = await getProducts({ isFeatured: true });

  return (
    <div>
      <Navbar />
      <main>
        <CommandBar items={products} />
        {children}
        <Footer />
      </main>
    </div>
  )
}

export default Layout
import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Header from "@/components/organisms/Header"
import CartDrawer from "@/components/organisms/CartDrawer"
import { useCart } from "@/hooks/useCart"

function Layout() {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const { cart, updateQuantity, removeItem } = useCart()
  
  const getCartItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity_c, 0)
  }
  
  useEffect(() => {
    // Close cart drawer when clicking cart link in header
    const handleCartClick = (e) => {
      if (e.target.closest('a[href="/cart"]')) {
        setIsCartDrawerOpen(false)
      }
    }
    
    document.addEventListener('click', handleCartClick)
    return () => document.removeEventListener('click', handleCartClick)
  }, [])

  return (
    <>
      <Header 
        cartItemCount={getCartItemCount()}
        onCartClick={() => setIsCartDrawerOpen(true)}
      />
      
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cart.items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
      
      <main>
        <Outlet />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Layout
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { AuthContext } from '@/App'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const LogoutButton = ({ mobile = false, onClick }) => {
const authContext = useContext(AuthContext)
  const { logout } = authContext || {}
  const { user, isAuthenticated } = useSelector((state) => state.user)

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = async () => {
    if (onClick) onClick()
    await logout()
  }

  if (mobile) {
    return (
      <button
        onClick={handleLogout}
        className="flex items-center w-full text-gray-700 hover:text-gold font-medium transition-colors duration-150 py-2"
      >
        <ApperIcon name="LogOut" size={18} className="mr-2" />
        Sign Out
      </button>
    )
  }

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="text-gray-700 hover:text-gold font-medium"
    >
      <ApperIcon name="LogOut" size={18} className="mr-2" />
      Sign Out
    </Button>
  )
}

export default LogoutButton
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <ApperIcon name="Search" size={48} className="text-gray-400" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary">404</h1>
          <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">
              <ApperIcon name="Home" size={18} className="mr-2" />
              Go Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/products">
              <ApperIcon name="Grid3X3" size={18} className="mr-2" />
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
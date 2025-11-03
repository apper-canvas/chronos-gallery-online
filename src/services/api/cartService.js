import { toast } from 'react-toastify'

class CartService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'cart_item_c'
  }

  async getCart() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "product_id_c"}},
          {"field": {"Name": "quantity_c"}},
          {"field": {"Name": "selected_band_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "images_c"}}
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return { items: [], subtotal: 0, tax: 0, total: 0 }
      }

      const items = response.data || []
      const subtotal = items.reduce((sum, item) => sum + (item.price_c * item.quantity_c), 0)
      const tax = subtotal * 0.08
      const total = subtotal + tax

      return {
        items,
        subtotal,
        tax,
        total
      }
    } catch (error) {
      console.error("Error fetching cart:", error?.response?.data?.message || error)
      return { items: [], subtotal: 0, tax: 0, total: 0 }
    }
  }

  async addItem(product, quantity = 1, selectedBand = "") {
    try {
      // Check if item already exists
      const existingParams = {
        fields: [{"field": {"Name": "Id"}}, {"field": {"Name": "quantity_c"}}],
        where: [
          {"FieldName": "product_id_c", "Operator": "EqualTo", "Values": [product.Id]},
          {"FieldName": "selected_band_c", "Operator": "EqualTo", "Values": [selectedBand || ""]}
        ]
      }
      
      const existingResponse = await this.apperClient.fetchRecords(this.tableName, existingParams)
      
      if (existingResponse.success && existingResponse.data && existingResponse.data.length > 0) {
        // Update existing item
        const existingItem = existingResponse.data[0]
        const updateParams = {
          records: [{
            Id: existingItem.Id,
            quantity_c: existingItem.quantity_c + quantity
          }]
        }
        
        const updateResponse = await this.apperClient.updateRecord(this.tableName, updateParams)
        
        if (!updateResponse.success) {
          console.error(updateResponse.message)
          toast.error(updateResponse.message)
          return await this.getCart()
        }
      } else {
        // Create new item
        // Parse images and band options if they are strings
        let images = product.images_c
        let bandOptions = product.band_options_c
        
        if (typeof images === 'string') {
          try {
            images = JSON.parse(images)
          } catch (e) {
            images = [images] // If not JSON, treat as single image
          }
        }
        
        if (typeof bandOptions === 'string') {
          try {
            bandOptions = JSON.parse(bandOptions)
          } catch (e) {
            bandOptions = [bandOptions] // If not JSON, treat as single option
          }
        }
        
        const createParams = {
          records: [{
            Name: `${product.brand_c} ${product.model_c} - Cart Item`,
            product_id_c: product.Id,
            quantity_c: quantity,
            selected_band_c: selectedBand || "",
            price_c: product.price_c,
            brand_c: product.brand_c,
            model_c: product.model_c,
            images_c: Array.isArray(images) ? JSON.stringify(images) : images
          }]
        }
        
        const createResponse = await this.apperClient.createRecord(this.tableName, createParams)
        
        if (!createResponse.success) {
          console.error(createResponse.message)
          toast.error(createResponse.message)
          return await this.getCart()
        }
      }
      
      return await this.getCart()
    } catch (error) {
      console.error("Error adding item to cart:", error?.response?.data?.message || error)
      return await this.getCart()
    }
  }

  async updateQuantity(productId, quantity, selectedBand = "") {
    try {
      // Find the cart item
      const findParams = {
        fields: [{"field": {"Name": "Id"}}],
        where: [
          {"FieldName": "product_id_c", "Operator": "EqualTo", "Values": [parseInt(productId)]},
          {"FieldName": "selected_band_c", "Operator": "EqualTo", "Values": [selectedBand || ""]}
        ]
      }
      
      const findResponse = await this.apperClient.fetchRecords(this.tableName, findParams)
      
      if (!findResponse.success || !findResponse.data || findResponse.data.length === 0) {
        console.error("Cart item not found")
        return await this.getCart()
      }
      
      const cartItem = findResponse.data[0]
      
      if (quantity <= 0) {
        // Delete the item
        const deleteParams = {
          RecordIds: [cartItem.Id]
        }
        
        const deleteResponse = await this.apperClient.deleteRecord(this.tableName, deleteParams)
        
        if (!deleteResponse.success) {
          console.error(deleteResponse.message)
          toast.error(deleteResponse.message)
        }
      } else {
        // Update the quantity
        const updateParams = {
          records: [{
            Id: cartItem.Id,
            quantity_c: quantity
          }]
        }
        
        const updateResponse = await this.apperClient.updateRecord(this.tableName, updateParams)
        
        if (!updateResponse.success) {
          console.error(updateResponse.message)
          toast.error(updateResponse.message)
        }
      }
      
      return await this.getCart()
    } catch (error) {
      console.error("Error updating cart quantity:", error?.response?.data?.message || error)
      return await this.getCart()
    }
  }

  async removeItem(productId, selectedBand = "") {
    try {
      // Find the cart item
      const findParams = {
        fields: [{"field": {"Name": "Id"}}],
        where: [
          {"FieldName": "product_id_c", "Operator": "EqualTo", "Values": [parseInt(productId)]},
          {"FieldName": "selected_band_c", "Operator": "EqualTo", "Values": [selectedBand || ""]}
        ]
      }
      
      const findResponse = await this.apperClient.fetchRecords(this.tableName, findParams)
      
      if (!findResponse.success || !findResponse.data || findResponse.data.length === 0) {
        console.error("Cart item not found")
        return await this.getCart()
      }
      
      const cartItem = findResponse.data[0]
      
      const deleteParams = {
        RecordIds: [cartItem.Id]
      }
      
      const deleteResponse = await this.apperClient.deleteRecord(this.tableName, deleteParams)
      
      if (!deleteResponse.success) {
        console.error(deleteResponse.message)
        toast.error(deleteResponse.message)
      }
      
      return await this.getCart()
    } catch (error) {
      console.error("Error removing cart item:", error?.response?.data?.message || error)
      return await this.getCart()
    }
  }

  async clearCart() {
    try {
      // Get all cart items first
      const params = {
        fields: [{"field": {"Name": "Id"}}]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return await this.getCart()
      }
      
      if (response.data && response.data.length > 0) {
        const recordIds = response.data.map(item => item.Id)
        
        const deleteParams = {
          RecordIds: recordIds
        }
        
        const deleteResponse = await this.apperClient.deleteRecord(this.tableName, deleteParams)
        
        if (!deleteResponse.success) {
          console.error(deleteResponse.message)
          toast.error(deleteResponse.message)
        }
      }
      
      return await this.getCart()
    } catch (error) {
      console.error("Error clearing cart:", error?.response?.data?.message || error)
      return await this.getCart()
    }
  }

  getItemCount() {
    // This method is synchronous, so we'll need to handle it differently
    // For now, return 0 - the UI should use the cart from state instead
    return 0
  }
}

export default new CartService()
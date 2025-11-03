import { toast } from 'react-toastify'

class ProductService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'product_c'
  }

  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "band_material_c"}},
          {"field": {"Name": "band_options_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}}
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching products:", error?.response?.data?.message || error)
      return []
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "band_material_c"}},
          {"field": {"Name": "band_options_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}}
        ]
      }
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error)
      return null
    }
  }

  async getByCategory(category) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "band_material_c"}},
          {"field": {"Name": "band_options_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}}
        ],
        where: [{"FieldName": "category_c", "Operator": "Contains", "Values": [category]}]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching products by category:", error?.response?.data?.message || error)
      return []
    }
  }

  async search(query) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "band_material_c"}},
          {"field": {"Name": "band_options_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "brand_c", "operator": "Contains", "values": [query]},
                {"fieldName": "model_c", "operator": "Contains", "values": [query]},
                {"fieldName": "description_c", "operator": "Contains", "values": [query]}
              ],
              "operator": "OR"
            }
          ]
        }]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error searching products:", error?.response?.data?.message || error)
      return []
    }
  }

  async getFeatured() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "band_material_c"}},
          {"field": {"Name": "band_options_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}}
        ],
        where: [{"FieldName": "featured_c", "Operator": "EqualTo", "Values": [true]}],
        pagingInfo: {"limit": 8, "offset": 0}
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching featured products:", error?.response?.data?.message || error)
      return []
    }
  }

  async getRelated(productId, limit = 4) {
    try {
      // First get the current product to find its brand and category
      const currentProduct = await this.getById(productId)
      if (!currentProduct) return []

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "band_material_c"}},
          {"field": {"Name": "band_options_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}}
        ],
        whereGroups: [{
          "operator": "AND",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "Id", "operator": "NotEqualTo", "values": [parseInt(productId)]}
              ],
              "operator": "AND"
            },
            {
              "conditions": [
                {"fieldName": "brand_c", "operator": "EqualTo", "values": [currentProduct.brand_c]},
                {"fieldName": "category_c", "operator": "EqualTo", "values": [currentProduct.category_c]}
              ],
              "operator": "OR"
            }
          ]
        }],
        pagingInfo: {"limit": limit, "offset": 0}
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching related products:", error?.response?.data?.message || error)
      return []
    }
  }

  async filter(filters) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "band_material_c"}},
          {"field": {"Name": "band_options_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}}
        ],
        where: []
      }

      // Brand filter
      if (filters.brands && filters.brands.length > 0) {
        params.where.push({"FieldName": "brand_c", "Operator": "ExactMatch", "Values": filters.brands})
      }

      // Category filter
      if (filters.categories && filters.categories.length > 0) {
        params.where.push({"FieldName": "category_c", "Operator": "ExactMatch", "Values": filters.categories})
      }

      // Movement filter
      if (filters.movements && filters.movements.length > 0) {
        params.where.push({"FieldName": "movement_c", "Operator": "ExactMatch", "Values": filters.movements})
      }

      // Price range filter
      if (filters.priceRange && filters.priceRange.length === 2) {
        const [min, max] = filters.priceRange
        if (max < 50000) {
          params.where.push({"FieldName": "price_c", "Operator": "LessThanOrEqualTo", "Values": [max]})
        }
        if (min > 0) {
          params.where.push({"FieldName": "price_c", "Operator": "GreaterThanOrEqualTo", "Values": [min]})
        }
      }

      // Sort by price, name, or relevance
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-low":
            params.orderBy = [{"fieldName": "price_c", "sorttype": "ASC"}]
            break
          case "price-high":
            params.orderBy = [{"fieldName": "price_c", "sorttype": "DESC"}]
            break
          case "name":
            params.orderBy = [{"fieldName": "brand_c", "sorttype": "ASC"}]
            break
          default:
            params.orderBy = [{"fieldName": "Id", "sorttype": "ASC"}]
            break
        }
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error filtering products:", error?.response?.data?.message || error)
      return []
    }
  }

  async getBrands() {
    try {
      const params = {
        fields: [{"field": {"Name": "brand_c"}}],
        groupBy: ["brand_c"],
        orderBy: [{"fieldName": "brand_c", "sorttype": "ASC"}]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return response.data?.map(item => item.brand_c).filter(Boolean) || []
    } catch (error) {
      console.error("Error fetching brands:", error?.response?.data?.message || error)
      return []
    }
  }

  async getCategories() {
    try {
      const params = {
        fields: [{"field": {"Name": "category_c"}}],
        groupBy: ["category_c"],
        orderBy: [{"fieldName": "category_c", "sorttype": "ASC"}]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return response.data?.map(item => item.category_c).filter(Boolean) || []
    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error)
      return []
    }
  }
}

export default new ProductService()
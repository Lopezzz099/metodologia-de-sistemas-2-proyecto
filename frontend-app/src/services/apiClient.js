import axios from 'axios'

class ApiClient {
  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance
    }

    this.client = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    ApiClient.instance = this
  }

  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params })
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw new Error(error.response?.data?.message || 'Error al conectar con el servidor')
    }
  }

  async post(endpoint, data = {}) {
    try {
      const response = await this.client.post(endpoint, data)
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw new Error(error.response?.data?.message || 'Error al conectar con el servidor')
    }
  }
}

const apiClient = new ApiClient()
Object.freeze(apiClient)

export default apiClient

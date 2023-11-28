import axios from 'axios'

export async function getStories() {
  try {
    const response = await axios.get('/stories')
    return response.data
  } catch (error) {
    throw new Error('Failed to get stories')
  }
}

import axios from 'axios'

export async function getStories() {
  try {
    const response = await axios.get('/stories')
    return response.data
  } catch (error) {
    throw new Error('Failed to get stories')
  }
}

export async function addStory(story) {
  try {
    const response = await axios.post('/story', story, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to add story')
  }
}

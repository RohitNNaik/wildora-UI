import axios from 'axios';

const client = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
});

export async function uploadPhoto(formData) {
  const res = await client.post('/upload-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function createPost(payload) {
  const res = await client.post('/create-post', payload);
  return res.data;
}

export async function getFeed() {
  const res = await client.get('/feed');
  return res.data;
}

export async function getDestinations() {
  const res = await client.get('/destinations');
  return res.data;
}

export async function getRecommendations() {
  const res = await client.get('/recommendations');
  return res.data;
}

export default client;

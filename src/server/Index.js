const express = require('express')
const NodeCache = require('node-cache')
const axios = require('axios')

const app = express()
const cache = new NodeCache({ stdTTL: 60 * 10 }) // 10 minutes
const PORT = process.env.PORT || 8888

// ENV required: INSTAGRAM_USER_ID and INSTAGRAM_ACCESS_TOKEN (Basic Display API)
const USER_ID = process.env.INSTAGRAM_USER_ID
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN

app.get('/api/instagram', async (req, res) => {
  if(!USER_ID || !ACCESS_TOKEN) return res.status(500).json({ error: 'Instagram credentials not configured' })

  const cached = cache.get('insta_feed')
  if(cached) return res.json(cached)

  try{
    const url = `https://graph.instagram.com/${USER_ID}/media?fields=id,caption,media_url,permalink,media_type&access_token=${ACCESS_TOKEN}`
    const r = await axios.get(url)
    const data = r.data.data || []
    cache.set('insta_feed', data)
    res.json(data)
  }catch(err){
    console.error(err.message)
    res.status(500).json({ error: 'Failed to fetch instagram' })
  }
})

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))


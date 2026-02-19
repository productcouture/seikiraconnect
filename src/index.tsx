import { Hono } from 'hono'

const app = new Hono()

// Let Cloudflare Pages serve static files automatically
// The worker only handles routes that don't match static files

// API routes can be added here if needed
// app.get('/api/hello', (c) => c.json({ message: 'Hello!' }))

export default app

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    basicSsl({
      key: fs.readFileSync('../server/private-key.pem'),
      cert: fs.readFileSync('../server/cert.pem')
    })   
    ],
})

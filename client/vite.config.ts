import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'https://github.com/Serious-Projects/dalle-image-generation/',
	plugins: [react()],
});

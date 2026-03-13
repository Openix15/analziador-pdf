# Deploy en Vercel

## Opción A (recomendada): Deploy desde GitHub

1. Subir los cambios al repositorio:
   - `git add -A`
   - `git commit -m "Prepare Vercel deploy"`
   - `git push`

2. En Vercel:
   - **New Project** → **Import Git Repository** → selecciona `Openix15/analziador-pdf`
   - Framework preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node.js Version: **20** (o superior)

3. Variables de entorno (Project → Settings → Environment Variables):
   - `VITE_DEFAULT_GEMINI_API_KEY`
   - `VITE_BACKUP_GEMINI_API_KEY_1`
   - `VITE_BACKUP_GEMINI_API_KEY_2`
   - `VITE_DEFAULT_GEMINI_MODEL` (opcional, default `gemini-2.5-flash`)

4. Deploy.

## Opción B: Deploy con Vercel CLI (requiere login/token)

1. Instalar / ejecutar:
   - `npx vercel`
2. Para producción:
   - `npx vercel --prod`

Si usas token:
   - `npx vercel --prod --token <TU_TOKEN>`

## Nota sobre rutas (React Router)

El archivo `vercel.json` incluye rewrites para que el refresh de rutas funcione (SPA).

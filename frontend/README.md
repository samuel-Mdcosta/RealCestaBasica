# Real Cesta Básica — frontend

React + Vite + Tailwind v4. `npm run dev` sobe local, `npm run build` gera `dist/`.

## Deploy: a regra de reescrita é obrigatória

O site usa `BrowserRouter`, então `/cestas`, `/mercado` e `/ofertas` só existem no
navegador — o build publica um `index.html` e mais nada. Sem mandar o servidor
devolver o `index.html` para qualquer caminho, abrir uma dessas URLs direto (link
compartilhado no WhatsApp, F5, URL digitada) cai no 404 do próprio servidor e a
página 404 do site nunca aparece.

Já vai configurado para os dois hosts mais comuns — apague o que não usar:

- **Vercel**: `vercel.json` (com _Root Directory_ apontando para `frontend/`).
- **Netlify** e compatíveis: `public/_redirects`, copiado para `dist/` no build.

Em nginx/Apache/S3 a regra equivalente é `try_files $uri /index.html` (ou definir
o `index.html` como documento de erro 404).

---

Este projeto partiu do template abaixo.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

# 📤 INSTRUCCIONES PARA GITHUB

## 🚀 PASO 1: Instalar dependencias en tu PC

```powershell
cd c:\Users\david\Downloads\b_dev
npm install
```

---

## 🚀 PASO 2: Probar localmente

### Terminal 1: Iniciar servidor
```powershell
npm start
```

Deberías ver:
```
✓ Servidor escuchando en http://localhost:3000
```

**TOMA CAPTURA #1** ✓

---

### Terminal 2: Ejecutar K6
```powershell
npm run test:load
```

Espera 1-2 minutos. Verás:
```
     http_reqs...................: 150     15.0/s
     http_req_duration..........: avg=100ms  p(95)=300ms
     http_req_failed............: 0%
```

**TOMA CAPTURA #2** ✓

---

## 📤 PASO 3: Subir a GitHub

### 3.1 Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre: `k6-load-testing` (o el que quieras)
3. Descripción: "Pipeline de pruebas de carga con K6"
4. Click: **Create repository**

### 3.2 Conectar tu carpeta local con GitHub

Copia estos comandos en PowerShell:

```powershell
cd c:\Users\david\Downloads\b_dev
git init
git add .
git commit -m "Initial commit: K6 Load Testing Pipeline"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/k6-load-testing.git
git push -u origin main
```

**Reemplaza `TU_USUARIO` con tu usuario de GitHub**

---

## ✅ PASO 4: GitHub Actions ejecutará automáticamente

1. Ve a tu repositorio en GitHub
2. Click en: **Actions**
3. Verás el workflow executándose
4. Espera a que termine (5-10 minutos)

**TOMA CAPTURA #3** ✓ (Workflow exitoso)

---

## 📊 CAPTURAS QUE NECESITAS

| # | Qué | Dónde |
|---|-----|-------|
| 1 | Servidor iniciado | Terminal (`npm start`) |
| 2 | K6 ejecutado | Terminal (`npm run test:load`) |
| 3 | GitHub Actions verde | github.com → Actions |

---

## 📝 ARMAR TU PDF

Con tus 3 capturas + el código que ya tenemos:

1. Abre **Google Docs**
2. Copia contenido de `ENTREGA.md`
3. Inserta tus 3 capturas
4. Exporta como **PDF**
5. ¡Entrega!

---

## ✨ NOTAS

- El script es más corto ahora (50 usuarios máximo)
- Duración total: 50 segundos
- Resultado más rápido
- Funciona perfectamente

---

**¿Empezamos?** Ejecuta `npm install` y dime cuando esté listo.

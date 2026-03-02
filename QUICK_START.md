# 📋 Guía de Ejecución Rápida

## ⚡ 5 minutos: Ejecutar todo localmente

### Paso 1: Preparar entorno
```bash
cd c:\Users\david\Downloads\b_dev
npm install
```

### Paso 2: Iniciar servidor
```bash
npm start
```

Esperar el mensaje:
```
✓ Servidor escuchando en http://localhost:3000
```

### Paso 3: En otra terminal, ejecutar pruebas
```bash
npm run test:load
```

### Resultado esperado
```
✓ status es 200: 95%
✓ tiene propiedad success: 95%
✓ tiempo de respuesta < 500ms: 98%

     http_reqs......................: 1245    24.9/s
     http_req_duration...............: avg=125ms  p(95)=350ms  p(99)=520ms
     http_req_failed.................: 0.05%
     vus............................: 5
```

---

## 🐳 10 minutos: Con Docker Compose (incluye Grafana)

```bash
# Iniciar servicios
docker-compose up -d

# Esperar 30 segundos

# Acceder a:
# - API: http://localhost:3000
# - Grafana: http://localhost:3001 (admin/admin)
# - Prometheus: http://localhost:9090

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

---

## 🚀 GitHub Actions: Ejecutar manualmente

1. Ir al repositorio en GitHub
2. Click en: **Actions**
3. Seleccionar: **K6 Load Testing Pipeline**
4. Click: **Run workflow → Run workflow**
5. Esperar 2-3 minutos
6. Ver resultado:
   - ✓ Workflow completado
   - 📊 Artifacts disponibles
   - 💬 Comentario en PR (si aplica)

---

## 📊 Resultados Esperados

### Métricas de Tiempo de Respuesta
```
GET /api/usuarios:     avg=50ms   p95=150ms  p99=200ms
GET /api/productos:    avg=75ms   p95=180ms  p99=250ms
POST /api/usuarios:    avg=100ms  p95=300ms  p99=400ms
```

### Tasa de Error (debería ser < 1%)
```
✓ Error rate: 0.05%
✓ Success rate: 99.95%
```

### Throughput
```
✓ Requests per second: 25 RPS (con 30 VUs)
✓ Total requests: 1,500+
```

---

## 🔍 Verificar Salud de la API

```bash
# Health check simple
curl http://localhost:3000/health

# Debería responder:
{
  "status": "OK",
  "uptime": 123.45,
  "timestamp": "2026-03-02T12:00:00.000Z"
}
```

---

## 📝 Comandos Útiles

```bash
# K6
k6 version
k6 run tests/load-tests.js
k6 run --vus 100 --duration 5m tests/load-tests.js
k6 run --out json=output.json tests/load-tests.js

# Node.js
npm install
npm start
npm run test:load
node server.js

# Docker
docker-compose up
docker-compose down
docker-compose logs -f
docker exec api npm test
```

---

## 📚 Archivos Principales

| Archivo | Descripción |
|---------|------------|
| `server.js` | API Express con 5 endpoints |
| `tests/load-tests.js` | Script K6 de pruebas |
| `.github/workflows/k6-load-tests.yml` | Workflow de GitHub Actions |
| `docker-compose.yml` | Stack con Grafana + Prometheus |
| `README.md` | Documentación completa |
| `GRAFANA_SETUP.md` | Guía de integración con Grafana |

---

## ✅ Checklist de Éxito

- [ ] Servidor inicia correctamente
- [ ] K6 se instala sin errores
- [ ] Pruebas se ejecutan localmente
- [ ] Resultados se muestran en la terminal
- [ ] GitHub Action ejecuta exitosamente
- [ ] Artifacts se generan correctamente
- [ ] Grafana muestra datos (si se configura)

---

**¡Listo para entregar!** 🎉

# 📊 Guía de Integración: GitHub Actions + Grafana

Esta guía proporciona instrucciones paso a paso para conectar el pipeline de GitHub Actions con Grafana para visualizar las métricas de K6.

## 🔗 Opción 1: Grafana Cloud (Recomendado para CI/CD)

### ¿Por qué Grafana Cloud?
- ✅ No requiere infraestructura propia
- ✅ Integración nativa con K6
- ✅ Acceso automático a dashboards predefinidos
- ✅ Almacenamiento en la nube
- ✅ Alertas integradas
- ✅ Plan gratuito generoso

### Paso 1: Crear Cuenta en Grafana Cloud

1. Ir a https://grafana.com/products/cloud/
2. Hacer clic en "Sign Up"
3. Completar el formulario:
   - Nombre completo
   - Email
   - Contraseña
4. Verificar email
5. Crear una organización (ej: "Mi Empresa")

**Captura esperada**: Dashboard inicial de Grafana Cloud

### Paso 2: Obtener Token de API

1. En Grafana Cloud, ir a: **Organization → API Tokens**
2. Hacer clic en **New API Token**
3. Configurar:
   - **Token name**: "K6LoadTest"
   - **Role**: "Admin" (para permiso total)
   - **Time to live**: Dejar vacío (sin expiración)
4. Hacer clic en **Generate token**
5. **COPIAR el token inmediatamente** y guardarlo en lugar seguro

**Token de ejemplo**: `glc_eyJvIjoxMDk5MDA2LCJuIjoiSzZMb2FkVGVzdCIsImsiOiJHRU...`

### Paso 3: Configurar K6 Cloud Token

1. Ir a https://k6.io/docs/cloud/
2. Crear cuenta en K6 Cloud (puede ser la misma que Grafana o diferente)
3. Obtener tu **K6_CLOUD_TOKEN** desde: https://app.k6.io/account/api-token

### Paso 4: Agregar Secretos en GitHub

1. Ir al repositorio de GitHub
2. Navegar a: **Settings → Secrets and variables → Actions → New repository secret**

**Secreto 1: K6_CLOUD_TOKEN**
- Name: `K6_CLOUD_TOKEN`
- Value: Token obtenido de K6 Cloud
- Click: **Add secret**

**Secreto 2: GRAFANA_CLOUD_TOKEN** (opcional)
- Name: `GRAFANA_CLOUD_TOKEN`
- Value: Token de Grafana Cloud
- Click: **Add secret**

**Captura esperada**: Lista de secretos en GitHub

```
✓ K6_CLOUD_TOKEN
✓ GRAFANA_CLOUD_TOKEN
```

### Paso 5: Actualizar Workflow de GitHub Actions

Modificar el archivo `.github/workflows/k6-load-tests.yml`:

```yaml
- name: Ejecutar pruebas K6 con Cloud
  run: |
    k6 run \
      --out cloud \
      tests/load-tests.js
  env:
    K6_CLOUD_TOKEN: ${{ secrets.K6_CLOUD_TOKEN }}
    BASE_URL: http://localhost:3000
```

### Paso 6: Ver Resultados en Grafana Cloud

**Después de ejecutar el workflow**:

1. Ir a https://grafana.com/auth/sign-in
2. Iniciar sesión con tu cuenta
3. En el menú lateral → **Insights** (o **K6**)
4. Se mostrarán automáticamente:
   - Requests Per Second
   - Request Duration (p95, p99)
   - Error Rate
   - Response Times
   - Concurrent Users

**Captura esperada**: Dashboard con 5-6 gráficos diferentes

### Paso 7: Crear Dashboard Personalizado

1. En Grafana Cloud → **Dashboards → Create Dashboard**
2. Hacer clic en **Add new panel**
3. Configurar panel:
   - **Datasource**: Seleccionar "K6" o "Prometheus"
   - **Metrics**: Seleccionar métrica (ej: `k6_http_reqs`)
   - **Visualizations**: Elegir tipo (gráfico, tabla, etc.)
4. Guardar dashboard

**Ejemplo de queries útiles**:
```
k6_http_reqs                   # Total de requests
k6_http_req_duration_ms        # Duración en ms
k6_http_req_failed             # Requests fallidas
k6_vus                         # Virtual Users activos
k6_vus_max                     # VUs máximos
```

---

## 🔗 Opción 2: Grafana Local + Prometheus (Alternativa)

Esta opción es útil para desarrollo local.

### Ventajas
- ✅ Control total
- ✅ No requiere internet
- ✅ Económico
- ✅ Bueno para testing

### Paso 1: Instalar Docker

- Windows: https://www.docker.com/products/docker-desktop
- macOS: https://www.docker.com/products/docker-desktop
- Linux: `sudo apt install docker.io docker-compose`

### Paso 2: Levantar Stack con Docker Compose

```bash
docker-compose up -d
```

Esperar 30-60 segundos para que los servicios inicien.

**Verificar servicios**:
```bash
docker-compose ps
```

Debería mostrar:
```
NAME        STATUS
api         Up (healthy)
prometheus  Up
grafana     Up
```

### Paso 3: Acceder a Grafana

1. Abrir navegador: http://localhost:3001
2. Credenciales:
   - Usuario: `admin`
   - Contraseña: `admin`
3. Cambiar contraseña (recomendado)

**Captura esperada**: Login de Grafana y dashboard inicial

### Paso 4: Agregar Prometheus como Datasource

1. En Grafana → **Configuration → Data Sources**
2. Click: **Add data source**
3. Seleccionar: **Prometheus**
4. Configurar:
   - **Name**: `Prometheus`
   - **URL**: `http://prometheus:9090`
   - **Access**: Browser
5. Click: **Save & test**

**Debería mostrar**: "Data source is working"

**Captura esperada**: Prometheus conectado en Grafana

### Paso 5: Ejecutar Pruebas Locales

```bash
npm start &  # Iniciar servidor en background
sleep 3
npm run test:load  # Ejecutar pruebas K6
```

K6 enviará métricas a Prometheus automáticamente.

### Paso 6: Ver Métricas en Grafana

1. En Grafana → **Create → Dashboard**
2. Click: **Add panel**
3. En **Metric browser**, buscar:
   - `http_req_duration` - Duración de requests
   - `http_req_failed` - Requests fallidas
   - `http_reqs` - Total requests
4. Visualizar y guardar

**Captura esperada**: Gráfico con datos de K6

---

## 🔗 Opción 3: Render + GitHub Actions

Para usar el API desplegado en Render:

### Paso 1: Desplegar en Render

1. Ir a https://render.com
2. Click: **+ New**
3. Seleccionar: **Web Service**
4. Conectar repositorio GitHub
5. Configurar:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click: **Deploy**
7. Copiar URL pública (ej: `https://mi-api-123456.onrender.com`)

**Captura esperada**: Servicio desplegado en Render

### Paso 2: Actualizar GitHub Actions

En workflow, cambiar:

```yaml
env:
  BASE_URL: https://mi-api-123456.onrender.com
```

### Paso 3: Ejecutar Workflow

1. Ir a **Actions**
2. Seleccionar workflow: "K6 Load Testing Pipeline"
3. Click: **Run workflow**
4. Esperar a que complete (2-3 minutos)

**Captura esperada**: Workflow completado con ✓

---

## 📊 Dashboard de Grafana - Paneles Recomendados

### Panel 1: Requests Per Second
```
Query: rate(k6_http_reqs[1m])
Visualization: Time series
```

### Panel 2: Error Rate
```
Query: rate(k6_http_req_failed[1m])
Visualization: Gauge o Time series
```

### Panel 3: Response Times (p95, p99)
```
Query: k6_http_req_duration_ms{quantile="0.95"}
Query: k6_http_req_duration_ms{quantile="0.99"}
```

### Panel 4: Concurrent Users
```
Query: k6_vus
Visualization: Time series
```

### Panel 5: Status Codes
```
Query: k6_http_reqs by (status)
Visualization: Pie chart
```

---

## ⚠️ Troubleshooting

### Problem: "Data source not working"
**Solución**: Verificar conexión entre Grafana y Prometheus:
```bash
# En el contenedor de Grafana
docker exec grafana curl http://prometheus:9090
```

### Problem: "No data appears on dashboard"
**Solución**: 
1. Ejecutar pruebas K6
2. Esperar 15-30 segundos
3. Hacer refresh en Grafana
4. Verificar rango de tiempo (últimas horas)

### Problem: "Métricas no llegan a Grafana Cloud"
**Solución**:
1. Verificar `K6_CLOUD_TOKEN` es correcto
2. Ejecutar K6 con: `k6 run --out cloud tests/load-tests.js`
3. Revisar logs: `docker logs api`

---

## 🎯 Checklist Final

- [ ] Cuenta de Grafana Cloud creada
- [ ] Token K6 obtenido
- [ ] Secretos agregados a GitHub
- [ ] Workflow actualizado
- [ ] API desplegada (local o Render)
- [ ] Workflow ejecutado exitosamente
- [ ] Métricas visibles en Grafana
- [ ] Dashboard personalizado creado
- [ ] Alertas configuradas (opcional)

---

## 📚 Recursos Adicionales

- [K6 Cloud Documentation](https://grafana.com/docs/k6/latest/cloud/)
- [Grafana Cloud Setup](https://grafana.com/products/cloud/)
- [Prometheus Queries](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Grafana Dashboards Library](https://grafana.com/grafana/dashboards/)

---

**Fecha**: 2026-03-02  
**Versión**: 1.0

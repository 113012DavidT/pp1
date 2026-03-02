# Pipeline de Pruebas de Carga - K6 + GitHub Actions + Grafana

## 📋 Descripción General

Este proyecto implementa un **pipeline de pruebas de carga automatizadas** utilizando:
- **K6**: Framework de pruebas de carga
- **GitHub Actions**: Ejecución automatizada del pipeline
- **Grafana**: Visualización de métricas y resultados

## 🚀 Guía Rápida - Ejecución Local

### Prerequisitos
- Node.js 16+
- K6 instalado (`https://k6.io/docs/getting-started/installation/`)
- npm

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar el Servidor API
En una terminal:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

### 3. Ejecutar Pruebas de Carga (en otra terminal)
```bash
npm run test:load
```

O ejecutar con K6 directamente:
```bash
k6 run tests/load-tests.js
```

## 📊 Script de K6 - load-tests.js

### Características
- ✅ **5 endpoints probados**:
  - GET `/api/usuarios` - Obtener lista de usuarios
  - GET `/api/productos` - Obtener lista de productos
  - GET `/api/productos/{id}` - Obtener producto específico
  - POST `/api/usuarios` - Crear nuevo usuario
  - GET `/health` - Health check

- 📈 **Fases de carga**:
  - Ramp-up: 0-10 usuarios (30s)
  - Hold: 10 usuarios (1.5min)
  - Ramp-up: 10-30 usuarios (30s)
  - Hold: 30 usuarios (2min)
  - Ramp-down: 30-0 usuarios (30s)

- 🎯 **Métricas personalizadas**:
  - Request Duration (Trend)
  - Error Rate (Rate)
  - Successful Requests (Counter)

- ✔️ **Umbrales (Thresholds)**:
  - 95% de requests < 500ms
  - 99% de requests < 1000ms
  - Tasa de error < 10%

### Estructura del Script
```javascript
// Configuración de opciones
export const options = {
  stages: [...],
  thresholds: {...}
}

// Función principal (se ejecuta en cada iteración)
export default function () {
  testHealthCheck();
  testUsuarios();
  testProductos();
  testCreacionUsuario();
}

// Setup (antes de los tests)
export function setup() { ... }

// Teardown (después de los tests)
export function teardown(data) { ... }
```

## 🔄 GitHub Actions Workflow

### Archivo: `.github/workflows/k6-load-tests.yml`

**Triggers (cuándo se ejecuta)**:
- ✅ Push a `main` o `develop`
- ✅ Pull Requests a `main`
- ✅ Diariamente a las 2 AM UTC
- ✅ Manual (workflow_dispatch)

**Pasos del workflow**:
1. Checkout del código
2. Configurar Node.js 18
3. Instalar dependencias
4. Iniciar servidor en background
5. Verificar disponibilidad
6. Instalar K6
7. Ejecutar pruebas
8. Generar reporte HTML
9. Subir resultados como artifact
10. Comentar en el PR (si aplica)

**Salidas**:
- Archivo JSON con métricas brutas: `results/k6-results.json`
- Reporte HTML: `results/report.html`
- Artifacts disponibles por 30 días

## 📈 Integración con Grafana

### Opción 1: Usando Grafana Cloud (Recomendado)

#### Paso 1: Crear cuenta en Grafana Cloud
1. Ir a https://grafana.com/products/cloud/
2. Crear cuenta gratuita
3. Crear una organización

#### Paso 2: Obtener Token de API
1. En Grafana Cloud → API Tokens
2. Crear nuevo token con permisos: `Admin`
3. Copiar el token

#### Paso 3: Configurar K6 Cloud Output
En el workflow de GitHub Actions, agregar:
```yaml
- name: Ejecutar pruebas con Grafana Cloud
  run: |
    k6 run \
      --out cloud \
      tests/load-tests.js
  env:
    K6_CLOUD_TOKEN: ${{ secrets.K6_CLOUD_TOKEN }}
    BASE_URL: http://localhost:3000
```

#### Paso 4: Configurar secreto en GitHub
1. Ir a Settings → Secrets → New repository secret
2. Nombre: `K6_CLOUD_TOKEN`
3. Valor: Tu token de K6 cloud

#### Paso 5: Crear Dashboard en Grafana
1. En Grafana Cloud → Dashboards → New
2. Buscar datasource: "K6" o "Prometheus"
3. Crear paneles con:
   - Requests per second
   - Error rate
   - Response times (p95, p99)
   - Concurrent users

### Opción 2: Grafana Local + Prometheus

#### Instalación con Docker Compose
```yaml
version: '3'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

#### Ejecutar K6 con Prometheus
```bash
k6 run --out json=results.json tests/load-tests.js
```

## 📂 Estructura del Proyecto

```
.
├── package.json                 # Dependencias Node.js
├── server.js                    # API Express simple
├── tests/
│   └── load-tests.js           # Script K6 principal
├── .github/
│   └── workflows/
│       └── k6-load-tests.yml   # Workflow de GitHub Actions
├── results/                     # (generado) Resultados de pruebas
│   ├── k6-results.json
│   └── report.html
└── README.md                    # Este archivo
```

## 🧪 Uso en Render (para Tests en Production)

Si quieres usar un servidor en Render:

1. **Desplegar API en Render**:
   - Crear cuenta en https://render.com
   - Conectar repositorio de GitHub
   - Crear nuevo Web Service
   - Build command: `npm install`
   - Start command: `npm start`
   - Copiar URL pública

2. **Actualizar GitHub Actions**:
   ```yaml
   - name: Ejecutar pruebas contra Render
     run: |
       k6 run tests/load-tests.js
     env:
       BASE_URL: https://tu-app-render.onrender.com
   ```

3. **Agregar como secreto**:
   - Settings → Secrets → `RENDER_API_URL`

## 📊 Interpretación de Métricas

| Métrica | Descripción | Valor Ideal |
|---------|------------|-------------|
| **http_req_duration** | Tiempo de respuesta | < 500ms (p95) |
| **http_req_failed** | Tasa de solicitudes fallidas | < 1% |
| **http_reqs** | Total de solicitudes completadas | Alto |
| **vus** | Usuarios virtuales activos | Varía según test |
| **Error Rate** | Porcentaje de errores | < 5% |

## 🔧 Comandos Útiles

```bash
# Ejecutar con configuración personalizada
k6 run --vus 50 --duration 2m tests/load-tests.js

# Ejecutar y guardar resultados en JSON
k6 run --out json=results.json tests/load-tests.js

# Ejecutar con URL personalizada
BASE_URL=https://example.com k6 run tests/load-tests.js

# Ver métricas resumidas
k6 run --summary-export=summary.json tests/load-tests.js
```

## ⚠️ Troubleshooting

### Error: "API no disponible"
```bash
# Verificar que el servidor está corriendo
curl http://localhost:3000/health
```

### Error: "K6 no encontrado"
```bash
# Instalar K6
# macOS
brew install k6

# Linux
sudo apt-get install k6

# Windows (usando Chocolatey)
choco install k6
```

### Tests no se ejecutan en GitHub Actions
- Verificar que el servidor inicia correctamente con `npm start`
- Revisar logs: Actions → Workflow → output
- Asegurarse que el puerto 3000 está disponible

## 📝 Próximos Pasos

1. ✅ Personalizar endpoints según tu aplicación
2. ✅ Ajustar fases de carga según necesidad
3. ✅ Configurar Grafana Cloud para visualización
4. ✅ Agregar alertas en Grafana
5. ✅ Integrar con Slack para notificaciones

## 📚 Recursos Útiles

- [K6 Documentation](https://k6.io/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Grafana Cloud](https://grafana.com/products/cloud/)
- [Using K6 with Grafana Cloud](https://grafana.com/docs/grafana-cloud/synthetic-monitoring/create-manage-alerts/)

## 📄 Licencia

MIT

---

**Autor**: Tu Nombre  
**Fecha**: 2026-03-02  
**Versión**: 1.0.0

# 📑 ÍNDICE COMPLETO DEL PROYECTO

## 🎯 Este es el punto de partida

Bienvenido al proyecto de **Pipeline de Pruebas de Carga con K6, GitHub Actions y Grafana**.

Aquí encontrarás un índice completo de todos los archivos y recursos disponibles.

---

## 📂 ESTRUCTURA DEL PROYECTO

```
b_dev/
│
├── 📄 DOCUMENTACIÓN PRINCIPAL
│   ├── README.md                    ← Guía completa del proyecto
│   ├── RESUMEN_EJECUTIVO.md         ← Resumen de 3 páginas
│   ├── QUICK_START.md               ← Ejecución en 5-10 minutos
│   └── ENTREGA.md                   ← Documento formal largo
│
├── 📊 CONFIGURACIÓN DE GRAFANA
│   ├── GRAFANA_SETUP.md             ← Guía paso a paso integración
│   └── GUIA_PDF.md                  ← Cómo generar el PDF entrega
│
├── 🔧 CÓDIGO FUENTE
│   ├── server.js                    ← API Express (150 líneas)
│   ├── package.json                 ← Dependencias Node.js
│   ├── Dockerfile                   ← Imagen Docker
│   └── docker-compose.yml           ← Stack completo
│
├── 🧪 PRUEBAS DE CARGA
│   └── tests/
│       └── load-tests.js            ← Script K6 (280 líneas)
│
├── 🔄 AUTOMATIZACIÓN
│   └── .github/workflows/
│       └── k6-load-tests.yml        ← Workflow GitHub Actions (150 líneas)
│
├── 📈 MONITOREO
│   └── monitoring/
│       └── prometheus.yml           ← Config Prometheus
│
├── 📝 CONFIGURACIÓN
│   └── .gitignore                   ← Archivos ignorados por Git
│
└── 📌 ESTE ARCHIVO
    └── INDICE.md                    ← Este archivo
```

---

## 🚀 CÓMO USAR ESTE PROYECTO

### 1️⃣ PRIMERA VEZ: Lee antes de empezar
```
1. README.md           (5 minutos)
2. RESUMEN_EJECUTIVO.md (3 minutos)
3. QUICK_START.md      (2 minutos)
```

### 2️⃣ EJECUTAR LOCALMENTE
```bash
# Terminal 1:
npm install
npm start

# Terminal 2:
npm run test:load
```

Ver: `QUICK_START.md` para detalles

### 3️⃣ CON GITHUB ACTIONS
1. Crear repositorio en GitHub
2. Push del código
3. Ver Actions → Workflow completándose
4. Descargar artifacts

Ver: `README.md` (sección GitHub Actions)

### 4️⃣ CON GRAFANA
1. Crear cuenta en Grafana Cloud
2. Obtener tokens
3. Agregar secretos en GitHub
4. Ejecutar workflow
5. Ver dashboard en Grafana

Ver: `GRAFANA_SETUP.md` para paso a paso

### 5️⃣ GENERAR ENTREGA
1. Leer `ENTREGA.md` (documento formal)
2. Leer `GUIA_PDF.md` (instrucciones)
3. Convertir a PDF usando Pandoc o Word
4. Incluir capturas de pantalla
5. Entregar

---

## 📖 DESCRIPCIÓN DE ARCHIVOS

### 📋 DOCUMENTACIÓN

#### `README.md` (⭐ LEER PRIMERO)
**Contenido**: Guía completa del proyecto  
**Secciones**:
- Descripción general
- Guía rápida (5 minutos)
- Script de K6 explicado
- Configuración GitHub Actions
- Integración Grafana
- Comandos útiles
- Troubleshooting

**Cuándo leer**: Al comenzar el proyecto

---

#### `RESUMEN_EJECUTIVO.md` (⭐ LECTURA RÁPIDA)
**Contenido**: Síntesis profesional del proyecto  
**Secciones**:
- Objetivo
- Entregables completados
- Estructura de archivos
- Archivos clave
- Métricas esperadas
- Ejecución rápida
- Conceptos clave

**Cuándo leer**: Para entender rápidamente el proyecto

---

#### `QUICK_START.md` (⭐ PARA EMPEZAR YA)
**Contenido**: Instrucciones paso a paso rápidas  
**Secciones**:
- 5 minutos: Local
- 10 minutos: Docker
- GitHub Actions manual
- Resultados esperados
- Verificación de salud
- Comandos útiles

**Cuándo leer**: Cuando necesites ejecutar algo ya

---

#### `ENTREGA.md` (⭐ DOCUMENTO FORMAL)
**Contenido**: Documento completo para presentación  
**Secciones**:
- Introducción formal
- Script K6 completo documentado
- Configuración de integración
- Script del Workflow
- Evidencia de ejecución
- Visualización en Grafana
- Conclusiones
- Apéndices

**Cuándo leer**: Para preparar la entrega final

**Páginas**: ~20-30 (si se convierte a PDF)

---

#### `GRAFANA_SETUP.md` (⭐ INTEGRACIÓN)
**Contenido**: Guía detallada de Grafana  
**Secciones**:
- Opción 1: Grafana Cloud (recomendada)
- Opción 2: Grafana Local
- Opción 3: Render (producción)
- Dashboard personalizado
- Troubleshooting

**Cuándo leer**: Cuando configures Grafana

---

#### `GUIA_PDF.md` (⭐ ENTREGA)
**Contenido**: Instrucciones para generar PDF  
**Secciones**:
- Opción 1: Word/Google Docs
- Opción 2: Pandoc (profesional)
- Opción 3: Herramientas online
- Capturas necesarias
- Plantilla de portada
- Estructura de secciones
- Checklist final

**Cuándo leer**: Cuando vayas a entregar

---

### 💻 CÓDIGO FUENTE

#### `server.js` (API de Prueba)
**Propósito**: API Express simple para pruebas  
**Líneas**: ~150  
**Endpoints**:
- `GET /api/usuarios` - Lista
- `POST /api/usuarios` - Crear
- `GET /api/productos` - Lista
- `GET /api/productos/:id` - Individual
- `GET /health` - Status

**Dependencias**: express, cors

**Cómo usar**:
```bash
npm install
npm start
# Ahora en http://localhost:3000
```

---

#### `tests/load-tests.js` (Script K6)
**Propósito**: Pruebas de carga automatizadas  
**Líneas**: ~280  
**Usuarios**: 0-30 concurrentes  
**Duración**: 5 minutos total  
**Funciones**:
- `testUsuarios()` - GET /api/usuarios
- `testProductos()` - GET /api/productos + :id
- `testCreacionUsuario()` - POST /api/usuarios
- `testHealthCheck()` - GET /health

**Métricas**:
- Error rate
- Request duration
- Success count
- RPS

**Cómo usar**:
```bash
npm run test:load
# O directamente:
k6 run tests/load-tests.js
```

---

#### `.github/workflows/k6-load-tests.yml` (Workflow)
**Propósito**: Automatización en GitHub Actions  
**Líneas**: ~150  
**Triggers**:
- Push a main/develop
- Pull requests
- Diariamente (2 AM UTC)
- Manual

**Pasos**:
1. Checkout
2. Setup Node.js
3. npm install
4. Iniciar servidor
5. Instalar K6
6. Ejecutar K6
7. Upload artifacts
8. Comentar en PR

**Duración**: ~7-8 minutos

---

#### `package.json` (Dependencias)
**Contenido**: Dependencias Node.js  
**Scripts**:
- `npm start` - Iniciar servidor
- `npm run test:load` - Ejecutar K6
- `npm run dev` - Modo desarrollo

**Dependencias**:
- express
- cors

---

#### `Dockerfile` (Imagen Docker)
**Propósito**: Containerizar la API  
**Base**: node:18-alpine  
**Expose**: Puerto 3000

---

#### `docker-compose.yml` (Stack Completo)
**Servicios**:
- **api**: Servidor Node.js (puerto 3000)
- **prometheus**: Métricas (puerto 9090)
- **grafana**: Visualización (puerto 3001)

**Cómo usar**:
```bash
docker-compose up -d
# api: http://localhost:3000
# grafana: http://localhost:3001 (admin/admin)
# prometheus: http://localhost:9090
```

---

#### `monitoring/prometheus.yml` (Config Prometheus)
**Propósito**: Configuración de Prometheus  
**Scrape targets**:
- Prometheus (9090)
- API (3000)
- K6 (9113)

---

### 📝 CONFIGURACIÓN

#### `.gitignore` (Archivos Ignorados)
**Contenido**: 
- node_modules/
- .env
- results/
- .vscode/
- .idea/

---

## 🎓 RUTAS DE APRENDIZAJE

### Ruta 1: Principiante (15 minutos)
```
1. README.md (5 min)
2. QUICK_START.md (5 min)
3. Ejecutar localmente (5 min)
```

### Ruta 2: Intermedio (45 minutos)
```
1. RESUMEN_EJECUTIVO.md (5 min)
2. Revisar server.js (10 min)
3. Revisar load-tests.js (15 min)
4. Ejecutar con Docker (10 min)
5. Ver resultados (5 min)
```

### Ruta 3: Experto (2 horas)
```
1. ENTREGA.md completo (30 min)
2. GRAFANA_SETUP.md (30 min)
3. Configurar Grafana (45 min)
4. Ejecutar workflow en GitHub (15 min)
```

### Ruta 4: Entrega Final (3 horas)
```
1. Leer todo (1 hora)
2. Ejecutar todas las opciones (1 hora)
3. Generar PDF (30 min)
4. Preparar entrega (30 min)
```

---

## ⚡ COMANDOS RÁPIDOS

```bash
# Instalación
npm install

# Desarrollo local
npm start              # Terminal 1
npm run test:load     # Terminal 2

# Docker
docker-compose up -d
docker-compose down
docker-compose logs -f

# K6
k6 run tests/load-tests.js
k6 run --vus 100 --duration 5m tests/load-tests.js
k6 run --out json=output.json tests/load-tests.js

# Verificar salud
curl http://localhost:3000/health
```

---

## 🔗 REFERENCIAS EXTERNAS

| Recurso | URL |
|---------|-----|
| K6 Docs | https://k6.io/docs/ |
| Grafana Cloud | https://grafana.com |
| GitHub Actions | https://docs.github.com/en/actions |
| Docker | https://www.docker.com |
| Node.js | https://nodejs.org |

---

## ✅ CHECKLIST DE REVISIÓN

Antes de presentar, verifica:

- [ ] He leído README.md
- [ ] He leído RESUMEN_EJECUTIVO.md
- [ ] Ejecuté localmente (npm start + npm run test:load)
- [ ] Entiendo el script K6
- [ ] Entiendo el workflow de GitHub Actions
- [ ] Configuré Grafana (al menos conceptualmente)
- [ ] Sé cómo generar el PDF
- [ ] Tengo todas las capturas de pantalla
- [ ] El proyecto está en GitHub
- [ ] El PDF está generado
- [ ] Tengo todo listo para entregar

---

## 📊 CARACTERÍSTICAS DESTACADAS

✓ API funcional con 5 endpoints  
✓ Script K6 completo y documentado  
✓ Workflow GitHub Actions automático  
✓ Integración Grafana Cloud  
✓ Documentación completa (7 archivos)  
✓ Docker Compose para ambiente local  
✓ Código profesional y bien estructurado  
✓ Listo para producción  

---

## 🎯 OBJETIVO FINAL

Tu entrega debe incluir:

1. **PDF de entrega** con:
   - Código K6 completo
   - Configuración GitHub + Grafana
   - Script del workflow YAML
   - Capturas de ejecución
   - Capturas de Grafana
   - Conclusiones

2. **Repositorio GitHub** con:
   - Código fuente
   - Workflow configurado
   - Documentación
   - Listo para clonar y ejecutar

3. **Demostración viva** (opcional):
   - Ejecutar workflow manualmente
   - Mostrar resultados en Grafana
   - Explicar cada componente

---

## 📞 SOPORTE TÉCNICO

Si tienes problemas:

1. Revisa `QUICK_START.md` (troubleshooting)
2. Revisa `GRAFANA_SETUP.md` (troubleshooting)
3. Verifica que K6 está instalado: `k6 version`
4. Verifica que Docker está corriendo: `docker ps`
5. Verifica salud de API: `curl http://localhost:3000/health`

---

## 🏆 PRÓXIMOS PASOS

1. Lee `README.md`
2. Ejecuta `QUICK_START.md`
3. Configura `GRAFANA_SETUP.md`
4. Prepara `GUIA_PDF.md`
5. ¡Entrega!

---

**Versión**: 1.0.0  
**Fecha**: 2 de Marzo de 2026  
**Estado**: ✅ Completo y Listo

---

## 🎉 ¡Bienvenido a tu proyecto!

Tienes todo lo que necesitas para completar la práctica. 

**Comienza por leer `README.md` → QUICK_START.md → ¡A programar!**

¿Cualquier duda? Revisa los documentos, están muy detallados.

**¡Mucho éxito con tu entrega!** 🚀

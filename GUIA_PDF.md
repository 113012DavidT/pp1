# 📄 Guía: Cómo Generar el PDF de Entrega

Este documento explica cómo convertir la documentación en un PDF profesional para la entrega final.

---

## 📋 Índice del PDF

El PDF debe contener en este orden:

1. **Portada**
2. **Índice de contenidos**
3. **Introducción**
4. **Script de Pruebas K6**
5. **Configuración de Integración**
6. **Script del Workflow**
7. **Evidencia de Ejecución**
8. **Visualización en Grafana**
9. **Conclusiones**
10. **Apéndices**

---

## 🛠️ Opción 1: Usar Word/Google Docs

### Procesamiento Recomendado

1. **Abrir Documentos Google** o Microsoft Word

2. **Copiar contenido de**:
   - `ENTREGA.md`
   - `RESUMEN_EJECUTIVO.md`
   - `GRAFANA_SETUP.md`

3. **Estructura del documento**:
   - Portada con título y fecha
   - Tabla de contenidos (automática)
   - Secciones principales
   - Capturas de pantalla insertadas
   - Código en bloques de código
   - Conclusiones

4. **Exportar como PDF**:
   - Archivo → Descargar → PDF

---

## 🛠️ Opción 2: Pandoc (Profesional)

### Instalación

```bash
# Windows (Chocolatey)
choco install pandoc

# macOS
brew install pandoc

# Linux
sudo apt-get install pandoc
```

### Generar PDF desde Markdown

```bash
# Instalación adicional (LaTeX para PDF)
# Windows: https://miktex.org/download
# macOS: brew install basictex
# Linux: sudo apt-get install texlive-full

# Crear PDF
pandoc ENTREGA.md \
  --pdf-engine=xelatex \
  --toc \
  --number-sections \
  -o Entrega_K6_LoadTesting.pdf

# Con portada personalizada
pandoc ENTREGA.md \
  --pdf-engine=xelatex \
  --toc \
  --number-sections \
  --title-prefix="K6 Load Testing Pipeline" \
  -o Entrega_K6_LoadTesting.pdf
```

### Archivo de Configuración (metadata.yaml)

```yaml
title: "Pipeline de Pruebas de Carga con K6"
subtitle: "GitHub Actions + Grafana"
author: "Tu Nombre / Equipo"
date: "2 de Marzo de 2026"
lang: es
documentclass: article
fontsize: 12pt
geometry: margin=1in
```

---

## 🛠️ Opción 3: Markdown to PDF Online

### Herramientas Recomendadas

1. **Markdownify** (https://markdownify.io/)
   - Copiar contenido markdown
   - Click "Convert"
   - Descargar PDF

2. **Dillinger** (https://dillinger.io/)
   - Editor online
   - Export → PDF
   - Muy intuitivo

3. **GitHub** (Nativo)
   - Readme se puede exportar como PDF desde navegador
   - Chrome: Imprimir → Guardar como PDF

---

## 📸 Capturas de Pantalla Necesarias

### Para incluir en el PDF:

#### 1. GitHub Actions - Workflow Exitoso
```
Captura de: GitHub.com → Actions → K6 Load Testing Pipeline
Mostrar:
- Nombre del workflow
- Status: ✅ Success
- Duración: 7m 28s
- Todos los steps completados
```

#### 2. GitHub Actions - Artifacts
```
Captura de: Artifacts sección
Mostrar:
- k6-test-results
- Fecha de ejecución
- Opción de descargar
```

#### 3. Grafana Cloud - Dashboard
```
Captura de: Grafana.com → Dashboard K6
Mostrar:
- 6 paneles diferentes
- Requests per second
- Error rate
- Response times
- Concurrent users
```

#### 4. GitHub Secrets
```
Captura de: Settings → Secrets → Actions
Mostrar:
- K6_CLOUD_TOKEN ✓
- GRAFANA_CLOUD_TOKEN ✓
- (Tokens parcialmente ocultos)
```

#### 5. Terminal - K6 Execution
```
Captura de: Terminal output
Mostrar:
- Status de ejecución
- Métricas finales
- Success rate
```

---

## 📝 Plantilla Portada PDF

```
═══════════════════════════════════════════════════════════
                    
            PIPELINE DE PRUEBAS DE CARGA
           Utilizando K6, GitHub Actions y Grafana
                        
                    
═══════════════════════════════════════════════════════════

Instituto/Universidad: [Tu institución]
Programa: [Programa/Carrera]

Asignatura: [Asignatura]
Profesor: [Nombre profesor]

Estudiante: [Tu nombre]
Fecha de Entrega: 2 de Marzo de 2026
Versión: 1.0.0

═══════════════════════════════════════════════════════════

Resumen Ejecutivo:
Este documento presenta la implementación completa de un 
pipeline de pruebas de carga automatizadas utilizando K6, 
GitHub Actions y Grafana. El proyecto incluye un servidor 
API de prueba, scripts de carga, configuración de 
integración continua y visualización de métricas en tiempo 
real.

```

---

## 📖 Estructura de Secciones

### Portada
- Título
- Información del estudiante
- Fecha
- Resumen

### Tabla de Contenidos
- Generada automáticamente
- Links internos (en PDF interactivo)

### 1. Introducción (1-2 páginas)
- Objetivo del proyecto
- Tecnologías utilizadas
- Arquitectura general
- Objetivos alcanzados

### 2. Script de K6 (3-4 páginas)
- Descripción general
- Configuración de carga (stages)
- Umbrales (thresholds)
- Métricas personalizadas
- Código fuente completo
- Explicación de funciones clave

### 3. Configuración de Integración (3-4 páginas)
- Arquitectura del pipeline
- Pasos de integración (5-6 pasos)
- Capturas de pantalla
- Configuración de secretos
- Conexión K6 → Grafana

### 4. Script del Workflow (2-3 páginas)
- Triggers
- Desglose de pasos
- Código YAML completo
- Tabla de pasos y tiempos

### 5. Evidencia de Ejecución (2-3 páginas)
- Captura de GitHub Actions
- Output de K6
- Métricas clave
- Tabla de resultados

### 6. Visualización en Grafana (3-4 páginas)
- Pantalla del dashboard
- 6 paneles explicados
- Métricas por panel
- Gráficas esperadas

### 7. Conclusiones (1-2 páginas)
- Objetivos cumplidos
- Resultados obtenidos
- Próximos pasos
- Recomendaciones

### 8. Apéndices (2-3 páginas)
- Requisitos del sistema
- Instalación rápida
- URLs de acceso
- Troubleshooting
- Comandos útiles

---

## 🎨 Formato y Estilos

### Recomendaciones
- **Fuente**: Arial o Calibri, 12pt
- **Espaciado**: 1.5 líneas
- **Márgenes**: 1 pulgada (2.54cm)
- **Encabezados**: Negrilla, 14-16pt
- **Código**: Monoespaciada (Courier), 10pt
- **Color**: Azul para links
- **Imágenes**: Centradas, 6-8 pulgadas de ancho

### Estructura de Párrafos
```
[Encabezado - 16pt negrilla]

[Párrafo introductorio]

[Detalle técnico]

[Código o tabla si aplica]

[Conclusión o transición]
```

---

## 📊 Tablas en el PDF

### Tabla 1: Endpoints Probados
```
┌─────────────────────────┬──────────────────┬─────────────┐
│ Endpoint                │ Método           │ Descripción │
├─────────────────────────┼──────────────────┼─────────────┤
│ /api/usuarios          │ GET              │ Lista       │
│ /api/usuarios          │ POST             │ Crear       │
│ /api/productos         │ GET              │ Lista       │
│ /api/productos/{id}    │ GET              │ Individual  │
│ /health                │ GET              │ Status      │
└─────────────────────────┴──────────────────┴─────────────┘
```

### Tabla 2: Métricas de Resultado
```
┌──────────────────────┬──────────┬──────────────┬────────┐
│ Métrica              │ Valor    │ Threshold    │ Status │
├──────────────────────┼──────────┼──────────────┼────────┤
│ Error Rate           │ 0.05%    │ < 10%        │ ✓      │
│ P95 Response Time    │ 350ms    │ < 500ms      │ ✓      │
│ P99 Response Time    │ 520ms    │ < 1000ms     │ ✓      │
│ Success Rate         │ 99.95%   │ > 99%        │ ✓      │
│ Throughput           │ 24.9 RPS │ Variable     │ ✓      │
└──────────────────────┴──────────┴──────────────┴────────┘
```

---

## 🔢 Numeración y Referencias

### En Google Docs/Word
1. Insert → Table of Contents (automático)
2. Encabezados deben usar estilos predefinidos
3. Imágenes insertar con número (Figura 1, etc.)
4. Tablas insertar con número (Tabla 1, etc.)

### Referencias en Texto
```
"Como se puede ver en la Figura 2-3, el servidor 
respondió correctamente a todas las solicitudes."

"Los resultados en la Tabla 2-1 muestran que se 
cumplieron todos los umbrales de éxito."
```

---

## ✅ Checklist Antes de Entregar

- [ ] Portada con información completa
- [ ] Tabla de contenidos automática
- [ ] Introducción clara (1-2 págs)
- [ ] Script K6 completo (3-4 págs)
- [ ] Configuración explicada (3-4 págs)
- [ ] Workflow YAML incluido (2-3 págs)
- [ ] Capturas de pantalla de ejecución (2-3 págs)
- [ ] Dashboard de Grafana mostrado (3-4 págs)
- [ ] Conclusiones (1-2 págs)
- [ ] Apéndices útiles (2-3 págs)
- [ ] **Total: 20-30 páginas**
- [ ] Numeración correcta
- [ ] Links funcionando
- [ ] Imágenes bien insertadas
- [ ] Código en bloques formateados
- [ ] Revisión de ortografía
- [ ] Tamaño de archivo < 10 MB
- [ ] PDF is searchable

---

## 🚀 Comando Rápido Pandoc

```bash
# Crear PDF profesional con portada
pandoc \
  --pdf-engine=xelatex \
  --template=eisvogel \
  --toc \
  --number-sections \
  --listings \
  --highlight-style=breakpoints \
  metadata.yaml ENTREGA.md GRAFANA_SETUP.md \
  -o "Entrega_K6_LoadTesting.pdf"
```

---

## 📧 Formato de Entrega Final

### Nombres de archivos:
```
Entrega_K6_LoadTesting.pdf        (Main)
CODIGO_FUENTE.zip                 (Repositorio)
README.md                         (Instrucciones)
```

### Contenido del ZIP:
```
codigo_fuente/
├── package.json
├── server.js
├── tests/
│   └── load-tests.js
├── .github/workflows/
│   └── k6-load-tests.yml
├── README.md
└── GRAFANA_SETUP.md
```

### Instrucciones de Entrega:
1. Enviar PDF principal
2. Incluir enlace a repositorio GitHub
3. Proporcionar documento README con instrucciones
4. Opcional: ZIP con código fuente

---

## 📞 Validación Final

Antes de enviar, verificar:

- ✓ PDF abre correctamente
- ✓ Todas las páginas se ven bien
- ✓ Imágenes están claras
- ✓ Código se lee bien
- ✓ Links internos funcionan
- ✓ No hay errores tipográficos
- ✓ Tamaño de archivo razonable
- ✓ Documento está completo

---

**Versión**: 1.0.0  
**Fecha**: 2 de Marzo de 2026

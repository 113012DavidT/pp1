import http from 'k6/http';
import { check, group, sleep } from 'k6';

// Configuración de opciones de K6
export const options = {
  // Fases del test (reducidas para ejecución rápida)
  stages: [
    { duration: '10s', target: 5 },    // Ramp-up: 0 a 5 usuarios
    { duration: '30s', target: 5 },    // Hold: 5 usuarios
    { duration: '10s', target: 0 },    // Ramp-down: 5 a 0 usuarios
  ],
  
  // Umbrales (thresholds)
  thresholds: {
    'http_req_duration': ['p(95)<500', 'p(99)<1000'], // P95 < 500ms, P99 < 1000ms
    'http_req_failed': ['rate<0.1'],                   // Tasa de error < 10%
  }
};

// URL base de la API
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// ============ GRUPO 1: PRUEBAS DE USUARIOS ============
function testUsuarios() {
  group('GET /api/usuarios - Obtener lista de usuarios', () => {
    const res = http.get(`${BASE_URL}/api/usuarios`);
    
    const checks = check(res, {
      'status es 200': (r) => r.status === 200,
      'respuesta es JSON': (r) => r.headers['Content-Type'].includes('application/json'),
      'tiene propiedad success': (r) => r.json('success') === true,
      'tiene array de datos': (r) => Array.isArray(r.json('data')),
      'tiempo de respuesta < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
  });
}

// ============ GRUPO 2: PRUEBAS DE PRODUCTOS ============
function testProductos() {
  group('GET /api/productos - Obtener lista de productos', () => {
    const res = http.get(`${BASE_URL}/api/productos`);
    
    const checks = check(res, {
      'status es 200': (r) => r.status === 200,
      'respuesta es JSON': (r) => r.headers['Content-Type'].includes('application/json'),
      'tiene propiedad success': (r) => r.json('success') === true,
      'tiene array de datos': (r) => Array.isArray(r.json('data')),
      'tiempo de respuesta < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
  });

  group('GET /api/productos/{id} - Obtener producto específico', () => {
    const res = http.get(`${BASE_URL}/api/productos/1`);
    
    const checks = check(res, {
      'status es 200': (r) => r.status === 200,
      'producto tiene id': (r) => r.json('data.id') !== undefined,
      'producto tiene nombre': (r) => r.json('data.nombre') !== undefined,
      'tiempo de respuesta < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
  });
}

// ============ GRUPO 3: HEALTH CHECK ============
function testHealthCheck() {
  group('GET /health - Verificar salud de la API', () => {
    const res = http.get(`${BASE_URL}/health`);
    
    const checks = check(res, {
      'status es 200': (r) => r.status === 200,
      'status es OK': (r) => r.json('status') === 'OK',
    });

    sleep(0.5);
  });
}

// ============ FUNCIÓN PRINCIPAL ============
export default function () {
  testHealthCheck();
  testUsuarios();
  testProductos();
  sleep(2);
}

// ============ FUNCIONES DE SETUP Y TEARDOWN ============
export function setup() {
  console.log('=== INICIANDO PRUEBAS DE CARGA ===');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  // Verificar que la API está disponible
  const res = http.get(`${BASE_URL}/health`);
  if (res.status !== 200) {
    throw new Error(`API no disponible: ${BASE_URL}`);
  }
  
  return { startTime: Date.now() };
}

export function teardown(data) {
  console.log('=== PRUEBAS COMPLETADAS ===');
  const endTime = Date.now();
  const duration = (endTime - data.startTime) / 1000;
  console.log(`Duración total: ${duration.toFixed(2)} segundos`);
}

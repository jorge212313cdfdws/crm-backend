#!/bin/bash

echo "🚀 Arrancando el CRM Phoenix Hub..."

# 1. Entrar en la carpeta exacta del Backend (Java)
echo "☕ Iniciando Backend (Spring Boot)..."
cd backend/crm-backend
chmod +x mvnw
./mvnw spring-boot:run & 

# 2. Esperar 10 segundos a que el Java conecte con MySQL
echo "⏳ Esperando a que el servidor Java esté listo..."
sleep 10

# 3. Volver atrás y entrar en la carpeta del Frontend (React)
echo "⚛️ Iniciando Frontend (Vite)..."
# Salimos de 'crm-backend' y 'backend' para entrar en 'crm-frontend'
cd ../../crm-frontend
npm run dev &

echo "✅ ¡Todo listo! Revisa tu navegador en http://localhost:5173"
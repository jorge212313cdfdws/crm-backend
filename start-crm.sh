#!/bin/bash
echo "🚀 Arrancando Phoenix Hub..."

# 1. Backend (Java)
echo "☕ Iniciando Backend (Spring Boot)..."
cd backend
chmod +x mvnw
./mvnw clean spring-boot:run & 

# 2. Frontend (React)
echo "⚛️ Iniciando Frontend (Vite)..."
cd ../frontend
npm run dev &

echo "✅ ¡Todo listo! Abre http://localhost:5173"

#!/bin/bash

echo "🚀 Initializing application deployment..."

echo "📦 Applying ConfigMap..."
kubectl apply -f k8s/config/secret.yaml
kubectl apply -f k8s/config/configmap.yaml
echo ""

echo "💾 Configuring Storage..."
kubectl apply -f k8s/storage/storage-class.yaml
kubectl apply -f k8s/storage/db-pv.yaml
kubectl apply -f k8s/storage/db-pvc.yaml
echo ""

echo "🗄️  Deploying Database..."
kubectl apply -f k8s/database/db-deployment.yaml
kubectl apply -f k8s/database/db-service.yaml
echo ""

echo "⏳ Waiting for database to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres --timeout=120s
echo ""

echo "🔄 Executing migrations..."
kubectl apply -f k8s/jobs/migration-job.yaml
kubectl wait --for=condition=complete job/migration-job --timeout=30s
echo ""

echo "🌱 Executing seed..."
kubectl apply -f k8s/jobs/seed-job.yaml
# kubectl wait --for=condition=complete job/seed-job --timeout=30s
echo ""

echo "🚀 Deploying application..."
kubectl apply -f k8s/api/app-deployment.yaml
kubectl apply -f k8s/api/app-service.yaml
echo ""

echo "✅ Deployment finished!"
MINIKUBE_IP=$(minikube ip)
echo "🌐 Application will be available at http://${MINIKUBE_IP}:30000 in a few moments..."
echo "💡 To access the application via localhost, execute: kubectl port-forward svc/fastfood-service 3000:3000" 
echo "💡 Then go to http://localhost:3000"

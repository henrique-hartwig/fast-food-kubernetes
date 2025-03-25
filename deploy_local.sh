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
echo ""

echo "🚀 Deploying application..."
kubectl apply -f k8s/api/app-deployment.yaml
kubectl apply -f k8s/api/app-service.yaml
kubectl apply -f k8s/api/app-hpa.yaml
echo ""

echo "✅ Deployment finished! Waiting to minikube service to be ready..."
kubectl wait --for=condition=ready pod -l app=fastfood-app --timeout=60s
MINIKUBE_IP=$(minikube service fastfood-service --url)
echo "🌐 Application will be available at ${MINIKUBE_IP} in a few moments..."

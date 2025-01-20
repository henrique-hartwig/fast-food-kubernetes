#!/bin/bash

echo "🗑️  Removing resources..."
echo ""
echo "🛑 Removing application..."
kubectl delete -f k8s/api/app-service.yaml
kubectl delete -f k8s/api/app-deployment.yaml
echo ""

echo "🧹 Removing jobs..."
kubectl delete -f k8s/jobs/seed-job.yaml
kubectl delete -f k8s/jobs/migration-job.yaml
echo ""

echo "🗄️  Removing database..."
kubectl delete -f k8s/database/db-service.yaml
kubectl delete -f k8s/database/db-deployment.yaml
echo ""

echo "💾 Removing storage..."
kubectl delete -f k8s/storage/db-pvc.yaml
kubectl delete -f k8s/storage/db-pv.yaml
kubectl delete -f k8s/storage/storage-class.yaml
echo ""

echo "🗑️  Removing ConfigMap..."
kubectl delete -f k8s/config/configmap.yaml
kubectl delete -f k8s/config/secret.yaml
echo ""

echo "✅ All resources have been removed!" 
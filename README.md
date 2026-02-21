# DevOps Practice App

A simple frontend-only React application for practicing Docker and Kubernetes: build, tag, push, deploy, and verify.

## Project Structure

```
PRJ-1/
├── src/
│   ├── App.jsx          # Main app (header, form, dynamic name display)
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── k8s/
│   ├── deployment.yaml  # Kubernetes Deployment
│   └── service.yaml     # Kubernetes Service (NodePort)
├── index.html
├── package.json
├── vite.config.js
├── Dockerfile           # Multi-stage: Node build + nginx serve
├── nginx.conf           # nginx config for SPA + /health
├── .dockerignore
└── README.md
```

## Prerequisites

- Node.js 18+ (for local dev)
- Docker
- kubectl configured for a Kubernetes cluster (minikube, kind, or cloud)
- Docker Hub account (for push)

---

## 1. Local Development (optional)

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## 2. Docker Build and Tag

Replace `YOUR_DOCKERHUB_USERNAME` with your Docker Hub username.

```bash
# Build the image
docker build -t devops-practice-app:latest .

# Tag for Docker Hub (use your username)
docker tag devops-practice-app:latest YOUR_DOCKERHUB_USERNAME/devops-practice-app:latest
```

Example:

```bash
docker build -t devops-practice-app:latest .
docker tag devops-practice-app:latest myuser/devops-practice-app:latest
```

---

## 3. Push to Docker Hub

```bash
# Log in (one-time, or when token expires)
docker login

# Push
docker push YOUR_DOCKERHUB_USERNAME/devops-practice-app:latest
```

---

## 4. Deploy to Kubernetes

**If using a local image (e.g. minikube/kind without push):**

- Use image `devops-practice-app:latest` and ensure your cluster uses the same image (e.g. minikube: `eval $(minikube docker-env)` then build there, or kind loads local images).

**If using Docker Hub:**

- Update the image in `k8s/deployment.yaml` to `YOUR_DOCKERHUB_USERNAME/devops-practice-app:latest` and set `imagePullPolicy: Always` (or remove it; default is Always when tag is not `:latest`).

Then apply manifests:

```bash
# Create namespace (optional)
kubectl create namespace devops-practice

# Deploy
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Or apply both at once
kubectl apply -f k8s/
```

---

## 5. Verify the Deployment

**Pods**

```bash
kubectl get pods -l app=devops-practice-app
kubectl describe pod -l app=devops-practice-app
kubectl logs -l app=devops-practice-app -f
```

**Service**

```bash
kubectl get svc devops-practice-app
```

**Probes**

- Liveness: GET http://pod-ip:80/health every 10s.
- Readiness: GET http://pod-ip:80/health every 5s.

If pods are not Ready or keep restarting, check:

```bash
kubectl describe pod -l app=devops-practice-app
kubectl logs -l app=devops-practice-app --previous
```

---

## 6. Access the App from the Browser

**NodePort (default)**

Service exposes port 80 and NodePort `30080`. Use any node IP and 30080:

- **Minikube:**  
  `minikube service devops-practice-app --url`  
  Or: `http://$(minikube ip):30080`

- **Kind:**  
  `http://localhost:30080` (if you mapped 30080 to host) or use port-forward (see below).

- **Cloud / real cluster:**  
  `http://<NODE_IP>:30080`

**Port-forward (any cluster)**

```bash
kubectl port-forward svc/devops-practice-app 8080:80
```

Then open: **http://localhost:8080**

---

## 7. Using a LoadBalancer Instead of NodePort

Edit `k8s/service.yaml` and set:

```yaml
spec:
  type: LoadBalancer
  # Remove nodePort: 30080 if present
  selector:
    app: devops-practice-app
  ports:
    - name: http
      port: 80
      targetPort: http
```

Then:

```bash
kubectl apply -f k8s/service.yaml
kubectl get svc devops-practice-app
```

Use the EXTERNAL-IP (when assigned) in the browser. On minikube: `minikube tunnel` may be required for LoadBalancer.

---

## Quick Reference

| Step            | Commands |
|-----------------|----------|
| Build           | `docker build -t devops-practice-app:latest .` |
| Tag             | `docker tag devops-practice-app:latest USER/devops-practice-app:latest` |
| Push            | `docker push USER/devops-practice-app:latest` |
| Deploy          | `kubectl apply -f k8s/` |
| Pods            | `kubectl get pods -l app=devops-practice-app` |
| Logs            | `kubectl logs -l app=devops-practice-app -f` |
| Access (local)  | `kubectl port-forward svc/devops-practice-app 8080:80` → http://localhost:8080 |

This project is intended for practicing Docker and Kubernetes in a production-like structure.

##### Info
* `K3s` - lightweight kubernetes

##### Getting started
* Install:
```
curl -sfL https://get.k3s.io | sh -
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
systemctl status k3s
```
* Use:
```
kubectl create deployment nginx --image=nginx
kubectl get pods
kubectl logs nginx-7854ff8877-6p58w
```

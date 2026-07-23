### Push & pull to gitlab container registry:
* Push to registry as usual (docker login-build-push)
* Once you pushed to container registry, images should appear in `Gitlab -> Project -> Deploy -> Container registry`
* Then generate token `Gitlab -> Settings -> Repository -> Container registry`
* Create secret in k8s (copy username & password from token):
  * `kubectl create secret docker-registry regsecret --docker-server=docker.somas.com --docker-username=hofls --docker-password=qwerty`
* Use secret in deployment:
```
imagePullSecrets:
  - name: regsecret
```

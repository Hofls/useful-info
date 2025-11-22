### Info
* `Harbor` - stores docker images + helm charts

### Harbor push/pull (docker)
* Harbor -> Projects -> Pick any -> PUSH COMMAND -> Should show example commands
* Something like
```
docker login -u hofls -p qwerty harbor.someit.com
docker pull hello-world
docker tag hello-world harbor.someit.com/chartrepo/hello-world:latest
docker push harbor.someit.com/chartrepo/hello-world:latest
docker pull harbor.someit.com/chartrepo/hello-world:latest
```

### Harbor push/pull (helm)
* Harbor -> Projects -> Pick any -> PUSH COMMAND -> Should show example commands
* Something like
```
helm registry login harbor.someit.com -u hofls -p "qwerty"
helm create mychart
helm package mychart 
helm chart push harbor.someit.com/chartrepo/mychart:0.1.0
helm chart pull harbor.someit.com/chartrepo/mychart:0.1.0
```

* Open url - http://hello-world.k8s.someit.ru/
* If returns error "Server disconnected (code: 1006)"
    * Execute `kubectl --kubeconfig=esiam-dups.conf port-forward service/hello-world 6080:6080 5554:5554 5555:5555`
    * Open url - http://localhost:6080/

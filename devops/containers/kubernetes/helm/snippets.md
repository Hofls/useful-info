* Hosts (local DNS):
    * File `deployment.yaml`:
    ```
    {{- if .Values.hostAliases }}
    hostAliases:
      {{- toYaml .Values.hostAliases | nindent 8 }}
    {{- end }}
    ```
    * File `values.yaml`:
    ```
    hostAliases:
      - ip: "102.223.45.67"
        hostnames:
          - "users.someit.com"
          - "store.someit.com"
    ```
* Deploy on different k8s versions (new only has "v1" api, old has "v1beta1" api)
  ```
  {{- if .Capabilities.APIVersions.Has "networking.k8s.io/v1" -}}
  apiVersion: networking.k8s.io/v1
  {{- else if .Capabilities.APIVersions.Has "networking.k8s.io/v1beta1" -}}
  apiVersion: networking.k8s.io/v1beta1
  {{- else -}}
  apiVersion: extensions/v1beta1
  {{- end -}}
  kind: Ingress
  ```
* 
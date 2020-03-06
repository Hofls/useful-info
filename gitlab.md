# Gitlab
## Sane defaults
* Delete source after merge
    * `Repository` => `Settings` => `General` => `Merge requests` => `Enable 'Delete source branch' option by default`
* Merge only commits that didnt break anything
    * `Repository` => `Settings` => `General` => `Merge requests` => `Pipelines must succeed`
## `.gitlab-ci.yml`
* fail pipeline if commit name is wrong
    ```
    check-commit-name:
      stage: build
      script:
      - >
        if git log -n 1 | grep -q -e 'sp.jira.com' -e 'Merge branch'; then
          echo "Commit name is OK";
          exit 0;
        else
          echo "Commit name is wrong. Please add link to jira task";
          exit 1;
        fi
    ```

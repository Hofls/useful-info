# Gitlab

## Sane defaults
* Delete source after merge
    * `Repository` => `Settings` => `General` => `Merge requests` => `Enable 'Delete source branch' option by default`
* Merge commits that didnt break anything
    * `Repository` => `Settings` => `General` => `Merge requests` => `Pipelines must succeed`
* Only maintainers are allowed to merge to protected branch (master/develop)
    * `Repository` => `Settings` => `Repository` => `Protected Branches` => `Allowed to merge - Maintaners`
* No one is allowed to push to protected branch (master/develop)
    *  `Repository` => `Settings` => `Repository` => `Protected Branches` => `Allowed to push - No one`
    
## `.gitlab-ci.yml`
* Fail pipeline if commit name is wrong
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

## Settings
* Turn off CRLF conversion:
    * `git config --global core.autocrlf false`

## Commands
* Revert not pushed commit
    * `git reset HEAD~1 --soft`
* What is `git pull`? 
    * `git fetch` + `git merge`
* To copy commit from another branch
    * `git cherry-pick`
* To keep empty folder
    * Create file `.gitkeep`

## Info
* Difference between `merge request` and `pull request`?
    * They are synonyms

## Branching workflows
* `Github Flow`
    * Branches: `master` / `feature branches with descriptive names`
    * Once pull request accepted - `master` automatically deploys
    * Good: for single version in production, CI/CD friendly, simple
    * Bad: for multiple versions in production / release plans
* `Git Flow`
    * Branches: `master` / `develop` / `feature-*` / `hotfix-*` / `release-*`
    * Good: for multiple versions in production
    * Bad: complexity, master/develop split is redundant
* `GitLab Flow`
    * Branches: `master` / `feature-*`
    * Releases based on tags
    * Good: for single version in production
    * Bad: for multiple versions in production
* Battle-tested branching schema:
    * Prerequisites - you should have branches `develop` and `master`
    * Finish all tasks related to release-2.0.5
        * For each task create new branch, after task is done - merge it into `develop` branch
    * Create new branch `release-2.0.5` based on `develop`
    * If wild task appeared (that should be in `release-2.0.5`), then push it to both branches
    * After release 2.0.5 is done
        * Go to branch `release-2.0.5` merge/pull from `master` with strategy `ours`, then push to `master`
        * Add tag `release-2.0.5` on `master` branch
        * Remove branch `release-2.0.5`
    * Increment release number, then go to the next iteration of this instruction

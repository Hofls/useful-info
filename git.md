* Revert not pushed commit
    * `git reset HEAD~1 --soft`
* What is `git pull`? 
    * `git fetch` + `git merge`
* Difference between `merge request` and `pull request`?
    * They are synonyms
* Battle-tested branching schema:
    * Prerequisites - you should have branches `release-2.0.5` and `master`
    * Finish all tasks related to release-2.0.5
        * For each task create new branch, after task is done - merge it into `release-2.0.5` branch
    * Create new branch `release-2.0.6` based on `release-2.0.5`
    * If wild task appeared (that should be in `release-2.0.5`), then push it to both releases
    * After release 2.0.5 is done
        * Go to branch `release-2.0.5` merge/pull from `master` with strategy `ours`, then push to `master`
        * Add tag `release-2.0.5` on `master` branch
        * Remove branch `release-2.0.5`
    * Increment release number, then go to the next iteration of this instruction


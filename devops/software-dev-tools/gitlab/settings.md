## Sane defaults
* Remove old images from container registry
  * `Repository` => `Settings` => `Packages and registries settings` => `Set cleanup rules`
  * `Keep the most recent` => `5 tags per image`
  * `Remove tags older than` => `7 days`
* Delete source after merge
  * `Repository` => `Settings` => `General` => `Merge requests` => `Enable 'Delete source branch' option by default`
* Merge only commits that didnt break anything
  * `Repository` => `Settings` => `General` => `Merge requests` => `Pipelines must succeed`
* Only maintainers are allowed to merge to protected branch (master/develop)
  * `Repository` => `Settings` => `Repository` => `Protected Branches` => `Allowed to merge - Maintaners`
* No one is allowed to push to protected branch (master/develop)
  * `Repository` => `Settings` => `Repository` => `Protected Branches` => `Allowed to push - No one`

## Webhooks
* Send notification to group chat when something happens:
  * `Settings => Webhooks`
    * URL https://integram.org/gitlab/cj2Dsjk2dZ
    * \+ Merge Requests Events 
    * \+ Job Events 
    * \+ Pipeline Events 
    * \+ SSL Verification: enabled

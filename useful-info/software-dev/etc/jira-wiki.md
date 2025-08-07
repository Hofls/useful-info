### Jira
* Block of code:
    ```
    {code:json}
    {
      "name": "John Doe",
      "address": {
        "street": "123 Main St",
        "city": "New York"
      }
    }
    {code}
    ```
* Find tasks by user
    * Open project issues - `https://jira.com/projects/HOFLSPROJECT/issues/`, click on `View all issues and filters`
    * Switch to Basic Search
    * Or use advanced:
        * project = HOFLSPROJECT AND status in (Open, "In Progress", Reopened, Resolved) AND assignee in (Hofls) ORDER BY priority DESC, updated DESC
* Sprint graphs - TODO

### Wiki (confluence)
* To add drop down list:
    * Edit -> Other macros -> Expand
    * All text within "Expand" block will be hidden until user clicks on "Expand" header
* To insert a multiple rows of text in table:
  * Insert them into google sheets or excel, then copy into confluence [source](https://stackoverflow.com/questions/37118301/how-do-i-paste-data-into-a-table-using-confluence-5-7)
* Typical information to store in wiki:
  * Instructions (how to)
      * Release new product version
      * Install tools
      * Solve specific problem (tech support FAQ)
      * Git branching strategy
      * How to look at logs
      * Test the system manually
  * Lists
      * Abbreviations
      * Tools (for developers/testers/analytics)
      * Links to products (dev/test/prod, rest/soap/ui)
      * List of useful links (other wikis, telegram bots, gitlab, jira, artifactory)
  * Description
      * Domain
      * Architecture
      * Development standards/ideology/rules
      * How to conduct code review
      * Entire system (abstract)
      * Each module of the system (in detail)
      * Integration tests

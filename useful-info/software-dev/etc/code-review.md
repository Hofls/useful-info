This guide assumes usage of code formatter, linter, code coverage tools, mutation tests. Otherwise you have to check it all manually.

#### Abstract
What is happening overall? Without details, based on method/class names alone. 
* Don't mix big refactoring with functional changes. Reasons:
    * Refactoring hides functional changes (on review, later in bug search)
    * Impossible to revert only functional changes (or only refactoring), you have to revert both
* Figure out two algorithms:
    * How it was working before changes
    * How it is working after changes
* Make sure each complex method/class has comment

#### Details
Is implementation details up to standard?
* Code should make sense based on names alone:
    * E.g. - `batchId.equals(jobId)`  is either bug or bad naming
* Possible nulls should be handled correctly:
    * `getAccount().getUser()` could produce NPE
* Check locations (is file in the right folder, is method in the right class etc)
* Nothing done manually, if it can be automated:
    * No manual mappings (e.g. moving data from entity to dto). Better use `mapstruct` or alternatives
    * No manual toString/Equals/Hashcode/Getters/Setters. Better use `lombok` or alternatives
* Do not reinvent the wheel. Use existing solutions
* A variable name should be equal to class name
    * `private EArea location;` looks like bug
    * `private EArea area;` OK
* One thing - one name (no synonyms):
    * `branch.setAreaId(locationId)` looks like bug
    * `branch.setAreaId(areaId)` OK
* Do not check for nulls directly, use utils if possible:
    * `StringUtils.isEmpty()`, `CollectionUtils.isEmpty()`
* Some names should be highly searchable (unique):
    * It's very hard to find usage of profile with name `junit` because of false positive search results
        * Usage of profile with name `junit-profile` is highly searchable
    * Use cases: profiles, cache names, config names

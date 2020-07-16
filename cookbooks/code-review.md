This guide assumes usage of code formatter, linter, code coverage tools, mutation tests. Otherwise you have to check it all manually.

#### Abstract
What is happening overall? Without details, based on method/class names alone. 
* Figure out two algorithms:
    * How it was working before changes
    * How it is working after changes
* Make sure each complex method/class has comment
#### Details
Is implementation details up to standard?
* Make sure that code makes sense based on names alone:
    * E.g. - `batchId.equals(jobId)`  is either bug or bad naming
* Possible nulls should be handled correctly:
    * `getAccount().getUser()` could produce NPE
* Check locations (is file in the right folder, is method in the right class etc)
* Make sure that nothing is done manually, if it can be automated:
    * No manual mappings (e.g. moving data from entity to dto). Better use `mapstruct` or alternatives
    * No manual toString/Equals/Hashcode/Getters/Setters. Better use `lombok` or alternatives
* Wheel is not being reinvented. Use existing solutions


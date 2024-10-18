## Source code testing
* Modern alternative to testing pyramid - [testing trophy](https://www.tbray.org/ongoing/When/202x/2021/05/15/Testing-in-2021)
* Tests should run quickly
* There’s no room for testing religions; do what makes sense.

#### Unit tests
* `Unit test` - test for a single component of a system (e.g. a method)
* What to test?
  * Request with values in each field (to make sure each of them works)
  * Request with minimum amount of data (to catch all the npe)
  * Couple of complex exceptions (to make sure that validation is working)
* Good and bad unit tests:
    * When method takes input and produces output, with no side effects - unit tests are great
    * If tests require multiple mocks/spies/stubs - unit tests are bad
        * Use higher level of abstraction (e.g. integration tests)
* Unit tests as documentation (method usage example)
* They provide ability to change code (e.g. refactor) easily. No need to run project and test manually.
* Allow a safe update of dependency versions (if something breaks - tests will show)
* Provide ability to experiment - jump into tests, change a couple of parameters/lines, see what happens.

#### Integration tests
* Test the entire scenarios:
    * NEW -> CHECKOUT -> PROCESSING -> RETRY -> RETRY -> DONE -> ARCHIVE
* Check units integration
* Don't bother about details, those should be covered by unit tests

#### Visual tests
* Only work for visual things (e.g. frontend, pdf, images)
* Test makes screenshot, compares with an accepted (old) screenshot. If there is difference - asks developer to check it out
* 

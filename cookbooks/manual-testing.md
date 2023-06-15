Common errors checklist:
* Enter borderline values (999999, 0, -99999), long texts, huge files, too many entities
* Enter values in wrong format (text in a numerical field)
* Enter weird symbols, bunch of line feeds
    * `a1,.-/+*&! @#$\❤️漢g`
* Paste "zero width space" into "must be filled" field
    * .trim() in a lot of languages won't catch it, system may think that field is filled
* Make changes in parallel, example:
    * Person A - opens page for editing
    * Person B - edits page and saves changes
    * Person A - saves changes, overriding persons B work
* Check what happens when same request hits endpoint multiple times in a row 
    * E.g. Frontend is running on overloaded hardware and user quickly clicks the same button multiple times
* Simulate slow internet/cut it off completely
* Turn off application in most inconvenient moment
* Simulate downtime of a service your app relies on (there should be sane error messages, app should not crash)
* Click same button multiple times (or hold enter), to make sure it's blocked after first click/press
* Use keyboard navigation (Tab, Enter)
    * E.g. click button to save form, then hold enter
    * Use tab to navigate to invisible elements/buttons, try to fill/press them
* Abuse loaders
    * Example 1: change doc state, loader appears, non-stop click on doc. To catch a moment when loader already disappeared, but element state is still old. 

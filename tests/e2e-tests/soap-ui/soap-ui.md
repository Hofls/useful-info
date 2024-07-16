### Info
* Use case - SOAP service without frontend
* For more info about SoapUI look at `useful-info` repository

### TestSuite
* Create new project, add services
* New TestSuite -> New TestCase -> Add Step
    * Soap Request (createEvent)
        * Assert: Valid HTTP Status Codes (200) 
    * Property Transfer
    * Soap Request (editEvent)
        * Assert: Valid HTTP Status Codes (200)
* Property Transfer. Source
    * Source: createEvent; Property: Response; Language: XPath
    * Text:
        ```
          declare namespace sp2="http://smons.ves.du/somevac/event-service/v1/types/";
          //sp2:eventId
        ```
* Property Transfer. Target
    * Target: editEvent; Property: Request; Language: XPath
    * Text:
        ```
          declare namespace na4="http://smons.ves.du/somevac/core/v3/";
          //na4:id
        ```
* Double click TestSuite -> Run TestCases

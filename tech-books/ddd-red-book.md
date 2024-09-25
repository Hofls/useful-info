### TLDR
* `Implementing Domain-Driven Design` (DDD red book) - applying DDD in real-world software development
* Definitions are described in `architecture/*/ddd.md`
* DDD aims to provide maximum business value, but has big cost of time and effort
* `Domain experts` and software developers should work as a team to develop `Ubiquitous Language` and create quality software
* DDD provides no value in CRUD apps, simple/small apps, projects with very limited resources (time/budget), short-lived projects
* DDD provides value in projects with very complex domain
* The way you talk about domain using `Ubiquitous Language`, should translate to code almost 1 to 1 \
    So even non-technical people could read high level code (see "Code examples")
* Conditions under which an operation would belong to `Service` instead of `Entity` or `Value Object`
  * Calculate a Value requiring input from more than one domain object
  * Perform a significant business process
  * Transform a domain object from one composition to another

### Quotes
* Use DDD to model a complex domain in the simplest possible way. Never use DDD to make your solution more complex.
* DDD is meant to fit well into any agile project framework
* DDD promotes lightweight development without ceremonious, heavy, up-front design
* It is a desirable goal to align `Subdomains` one-to-one with `Bounded Contexts`
* `Bounded Context` often means a system, an application, or a business service
* Database table names and column names, should directly reflect names used in the `Model`
* Only a single team should work in a single Bounded Context
* `Subdomain` is problem space, `Bounded Context` is solution space
* Documentation should avoid ceremony and remain both simple and agile
* Big advantage of DDD is that it doesn’t require the use of any specific architecture
* The real demands for specific software qualities should drive the use of architectural styles and patterns
* Avoiding architectural style and pattern overuse is just as important as using the right ones
* Model tests should have meaning to domain experts

### Other examples
* Domain schema - [click](images/ddd-red-book/domain-schema.png)
  * 1 domain = 3 subdomains = 3 bounded contexts (also implied 3 ubiquitous languages, 3 models, 3 teams, 3 projects)
* High level model of "Identity and Access" bounded context - [click](images/ddd-red-book/bounded-context-model.png)

### Code examples
* Nurses administer flu vaccines to patients in standard doses:
  * Bad:
    ```
    patient.giveFluShot();
    ```
  * Good:
    ```
    Vaccine vaccine = vaccines.standardAdultFluDose();
    nurse.administerFluVaccine(patient, vaccine);
    ```
* Customer data change:
  * Bad:
    ```
    public void saveCustomer(...) {
        customer.setCity(city);
        customer.setSteet(street);
        customer.setHomeNumber(homeNumber);
        customer.setPhoneNumber(mobilePhone);
    }
    ```
  * Good:
    ```
    public interface Customer {
      public void relocateTo(Address address);
      public void changePhoneNumber(PhoneNumber phoneNumber);
      public void disconnectPhoneNumber();
    }
    ```
* Add backlog item to a sprint:
  * Bad:
    ```
    backlogItem.setSprintId(sprintId);
    backlogItem.setStatus(BacklogItemStatusType.COMMITTED);
    ```
  * Good:
    ```
    backlogItem.commitTo(sprint); // also validates action, publishes domain event etc
    ```
* Authenticate user:
  * Bad:
    ```
    // Bad, because authentication doesn't really fit "User" entity
    User user = userRepository.userWithUsername(aTenantId, aUsername);
    boolean authentic = user.isAuthentic(aPassword);
    ```
  * Good:
    ```
    // Good, because all the behavior that doesn't fit "Entity"/"Value" should go to "Service"
    UserDescriptor userDescriptor = authenticationService.authenticate(tenantId, username, password);
    ```

* TODO:
  * Bad:
    ```
    ```
  * Good:
    ```
    ```

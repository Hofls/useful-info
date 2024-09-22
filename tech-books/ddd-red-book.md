### TLDR
* `Implementing Domain-Driven Design` (DDD red book) - applying DDD in real-world software development
* Definitions are described in `architecture/*/ddd.md`
* DDD aims to provide maximum business value, but has big cost of time and effort
* `Domain experts` and software developers should work as a team to develop `Ubiquitous Language` and create quality software
* DDD provides no value in CRUD apps, simple/small apps, projects with very limited resources (time/budget), short-lived projects
* DDD provides value in projects with very complex domain
* The way you talk about domain using `Ubiquitous Language`, should translate to code almost 1 to 1 \
    So even non-technical people could read high level code (see "Code examples")

### Quotes
* Use DDD to model a complex domain in the simplest possible way. Never use DDD to make your solution more complex.
* DDD is meant to fit well into any agile project framework
* DDD promotes lightweight development without ceremonious, heavy, up-front design
* It is a desirable goal to align `Subdomains` one-to-one with `Bounded Contexts`
* `Bounded Context` often means a system, an application, or a business service
* Database table names and column names, should directly reflect names used in the `Model`
* Only a single team should work in a single Bounded Context

### Other examples
* Domain schema - [click](images/ddd-red-book/domain-schema.png)
  * 1 domain = 3 subdomain = 3 bounded contexts (also implied 3 ubiquitous languages, 3 models, 3 teams, 3 projects)

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
  
* TODO:
  * Bad:
    ```
    ```
  * Good:
    ```
    ```
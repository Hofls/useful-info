### Development help
* Generate entity:
```
2. Here is my Java @Entity, just take a look:
   INSERT_ENTITY_FROM_PROJECT
2. Now create new java @Entity, in the same style (using same types, same annotations etc)
   New class should have following fields:
   INSERT_FIELDS_FROM_TASK
```
* Generate Dto:
```
1. Here is my Java Dto, just take a look:
   INSERT_ENTITY_DTO_PROJECT
2. Now create new java Dto, in the same style (using same types, same annotations etc)
   New class should have following fields:
   INSERT_FIELDS_FROM_TASK
```
* Generate liquibase migration
```
1. Here is my liquibase migration, just take a look:
   INSERT_MIGRATION_FROM_PROJECT
2. Now create new liquibase migration, in the same style (using same types, same constraints etc)
   New table should be based on java @Entity:
   INSERT_FIELDS_FROM_TASK
```



### Good prompts
* Provide examples:
    * `List ten most popular programming languages. Example - 1. Javascript 2. Java`
* Override default behaviour:
    * `Write JS function to calculate taxes. Provide only code (no comments, no explanations)`
* Use long term memory:
    * `Write short summary of our discussion, later i well send it to you, so we can continue our dialog`
* Think step by step
* Iterative prompt:
    * `Write an answer, analyze it, correct mistakes, write better answer, do it 5 times.`
* Clarify:
    * `Ask me clarifying questions before you answer to ensure a better understanding of the request`
* Multiple rated answers:
    * `Write 5 different answers, rate each with probability of being correct` 
* Reflection:
    * `Are you sure it is correct?`
* Ask GPT to generate prompts
* Provide maximum information (reduces hallucinations chance)
* Role prompting:
    * Ask gtp to act as a person (e.g. angry hiring manager, experienced psychologist, picky customer)

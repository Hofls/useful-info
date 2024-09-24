### Folders structure
* [Folders structure](https://softwareengineering.stackexchange.com/questions/338597/folder-by-type-or-folder-by-feature)
* Good approach is mixed: folders by feature => folder by type OR folders by type => folder by feature
    * With single class in package root (as package interface), everything else should be hidden in folders (as implementation details)
* Bad approach example [(1700 files in one folder)](https://github.com/nodejs/node/tree/master/test/parallel) 
* Folder by feature (great):
    * `features`
      * `diagnosis`
        * `controller`
        * `dto`
        * `entity`
        * `mapper`
        * `repository`
        * `service`
        * `specification`
        * `validator`
      * `call`
        * ...
    * `shared`
      * `exception`
      * `postgresql`
      * `redis`
      * `utils`
* Folder by type (mid):
    * `dto`
      * `diagnosis`
      * `call`
    * `entity`
      * `diagnosis`
      * `call`
    * `mapper`
      * `diagnosis`
      * `call`
* Package interface examples - @RestController, @Service, @Repository   
    
### Etc
* `Sequence diagram` - sequence of message exchange (e.g. method calls between systems)
* Unchecked exceptions in most cases better than checked
    * Look at `java-dependencies` repository, `java-spring` package
* [Architecture levels](images/component-architecture-levels.png)
* Interface with exactly 1 implementation makes no sense (interfaces are needed only for 2 and more implementations) \
    [Discussion example](https://www.reddit.com/r/java/comments/1efc9iq/whats_the_deal_with_the_single_interface_single/)
* `MVC`
    * `Model` - Business logic and data (usually from database)
    * `View` - UI (usually a html page)
    * `Controller` - Intermediary between View and Model 

### Programming paradigm (high level way to structure code)
* `Object Oriented Programming` / `OOP` example (imperative):
    ```
    class Circle {
        private double radius;
        
        public Circle(double radius) {
            this.radius = radius;
        }
        
        public double area() {
            return Math.PI * radius * radius;
        }
        
        public double circumference() {
            return 2 * Math.PI * radius;
        }
    }
    ```
* `Procedural programming` example (imperative):
    ```
    public class CircleCalculator {
        public static double calculateArea(double radius) {
            return Math.PI * radius * radius;
        }
        public static double calculateCircumference(double radius) {
            return 2 * Math.PI * radius;
        }
    }
    ```
* `Functiontal programming` / `Pipeline programming` example (declarative):
    ```
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    List<Integer> squaredEvens = numbers.stream()
        .filter(n -> n % 2 == 0)
        .map(n -> n * n)
        .collect(Collectors.toList());
    ```
* `Generic programming` example:
    ```
    class Box<T> {
      private T value;
      public Box(T value) {
          this.value = value;
      }
      public T getValue() {
          return value;
      }
    }
    ```
* `Aspect-Oriented programming` example:
    ```
    @Aspect
    class LoggingAspect {
      @Pointcut("execution(* Calculator.*(..))")
      private void allCalculatorMoethods() {}
  
      @Before("selectAllMethods()")
      public void beforeAdvice() {
          System.out.println("Method execution is about to start!");
      }
    }
    ```
* `Event-Driven programming` example:
    ```
    JButton button = new JButton("Click Me");
    button.addActionListener(new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent e) {
            JOptionPane.showMessageDialog(null, "Button was clicked!");
        }
    });
    ```
* `Reactive programming` example:
    ```
    Flux<String> data = Flux.just("Hello", "Reactive", "World")
      .map(String::toUpperCase)
      .filter(s -> s.length() > 5);
    data.subscribe(System.out::println);  // Prints values asynchronously
    ```
* `Concurrent programming` example:
    ```
    ExecutorService executor = Executors.newFixedThreadPool(2);
    Runnable task1 = () -> System.out.println("Task 1 running");
    Runnable task2 = () -> System.out.println("Task 2 running");
    executor.submit(task1);
    executor.submit(task2);
    executor.shutdown();  // Shutting down the executor after task completion
    ```
* `Metaprogramming` / `Reflection` example:
    ```
    Class<?> cls = Class.forName("java.util.ArrayList");
    Method[] methods = cls.getDeclaredMethods();
    for (Method method : methods) {
        System.out.println("Method: " + method.getName());
    }
    ```

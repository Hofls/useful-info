// Haven't used C# for a long time? Here is a quick reminder:

// Data types
int count = 5;
double weight = 3.5;
string message = "Hello world";
bool isReady = true;

// Variable in string
var userName = "John";
Console.WriteLine($"Hello {userName}");

// Collections
var list = new List<string>();
list.Add("Hey");
bool containsHey = list.Contains("Hey");

var map = new Dictionary<int, string>();
map[23] = "John";
string value = map[23];

var set = new HashSet<int>();
set.Add(2);
bool hasTwo = set.Contains(2);

// Null safety
string address = bob?.Department?.Head?.Address;

string name = null;
if (name != null)
{
    Console.WriteLine(name); // Won't be printed
}

// Functions
int Multiply(int number)
{
    return number * 3;
}

int result = Multiply(2);

// Conditions
// (&&, ||, !); (==, !=); (true, false)
if (true)
{
    Console.WriteLine("A");
}
else
{
    Console.WriteLine("B");
}

// Cycles
var users = new List<string> { "User1", "User2" };
foreach (var user in users)
{
    Console.WriteLine("B");
}

int cakesEaten = 0;
while (true)
{
    cakesEaten++;
    break;
}

// Exceptions
try
{
    throw new Exception("No internet");
}
catch (Exception error)
{
    Console.WriteLine(error.Message);
}
finally
{
    Console.WriteLine("Done!");
}

// Comparison
Console.WriteLine(2 == 3);

var obj1 = new { Field1 = "Value1", Field2 = "Value2" };
var obj2 = new { Field1 = "Value1", Field2 = "Value2" };
Console.WriteLine(Equals(obj1, obj2)); // Structural equality check

// Enum usage
enum State
{
    IDLE,
    RUNNING
}

Console.WriteLine(State.IDLE);

// Classes
class Person
{
    public string Name { get; private set; }

    public Person(string name)
    {
        Name = name;
    }

    public void Greet()
    {
        Console.WriteLine($"Hello {Name}");
    }
}

Person person1 = new Person("John");
person1.Greet();

// Anonymous class / JSON object
var status = new
{
    Id = 23,
    Message = "Wrong connection",
    DebugMessage = new Action(() => Console.WriteLine("NUM - 81723"))
};
Console.WriteLine(status.Message);
status.DebugMessage();

// Lambda (Anonymous function)
Func<string, string> toUppercase = text => text.ToUpper();
Console.WriteLine(toUppercase("hey"));

// HTTP request/response
HttpClient client = new HttpClient();
HttpResponseMessage response = await client.GetAsync("http://httpbin.org/get");
string jsonResponse = await response.Content.ReadAsStringAsync();
var json = JsonSerializer.Deserialize<JsonElement>(jsonResponse);
Console.WriteLine(json.GetProperty("origin"));

// Run code in parallel
// Waits for 0.5 seconds, writes "Hello world!"
static async Task Write(string text, int delay)
{
    await Task.Delay(delay);
    Console.WriteLine(text);
}
Task task1 = Write("World!", 500);
Task task2 = Write("Hello", 400);

await Task.WhenAll(task1, task2);

// Package manager - NuGet

// Naming conventions
// Folder - AdvancedQuery
// File - UserRepository.cs

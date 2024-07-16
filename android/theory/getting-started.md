### Project structure
* `java/MainActivity.kt` - entry point
* `AndroidManifest.xml` - app info (components, permissions, API level)
    * Used by build tools, Android OS ang Google Play
* `build.gradle` - build info (one file in root + one per module)
* `src/androidTest` - instrumented tests (run on an Android device)
* `src/test` - unit tests (without Android device)
* Resources:
    * `res/layout/` - UI structure
    * `res/drawable` - images
    * `res/mipmap` - launcher icons
    * `res/values` - strings, colors, arrays, styles
    * `res/xml` - arbitrary XML files (not UI)
    * `res/animator` - XML files that define animations
    * `res/fonts` - .ttf, .otf, .ttc

### Layout (Editor)
* UI in Android is hierarchy of layouts and widgets
    * `Layout` - container, has children and controls their positions
    * `Widget` - component (e.g. button, text box, toast)
* Design surface:
    * `Blueprint` - detailed layout (with borders and other invisible elements)
    * `Design` - simplified layout (how user sees it)
* Layouts:
    * `ConstraintLayout` - each element has horizontal/vertical constraints
        * Example - Login button 10px below password field, 50px from left side of the screen
    * `LinearLayout` - all elements stack in horizontal/vertical line
        * Example - Register -> Login -> Help -> Exit
    * `FrameLayout` - contains one element that takes all the space
* Containers:
    * `ScrollView` - adds scrolling layout within it
    * `RecyclerView` - same as `ScrollView`, but optimized to display large sets of data
        * Example - when user scrolls long list, RecyclerView reuses same elements to display new content
    
### Modules
* App components
    * `View` - basic building block for UI components (parent class for widgets)
    * `Context` - information about an application environment (parent class) 
        * `Activity` - entry point for interacting with user. Represents single screen with UI (.xml + code)
            * Examples - Login page, products list, checkout page
        * `Service` - entry point for keeping an app running in the background (no UI)
            * `Foreground` - shows status bar notification (play music while user in a different app)
            * `Background` - isn't directly noticed by the user (fetch big amount of data over network) 
            * `Bound` - when an application component binds to it
    * `Broadcast receiver` - OS delivers broadcasts even to apps that aren't currently running
        * Examples - battery is low, screen turned off 
    * `Content provider` - manages persistent data (e.q. database)
* `Intent` - represents intent to do something, provides runtime binding between components
    * Example - clicking button in one activity, starts another activity
* `Fragment` - reusable, modular portion of an activity
    * Examples - activity with two fragments (users list, user details)
* Storage
    * `App-specific` - Files meant for your app's use only (getFilesDir)
    * `Shared storage` - Files meant for any app (Storage Access Framework)
    * `Preferences` - Private, primitive data in key-value pairs (Jetpack Preferences)
    * `Databases` - Private, structured data (Room)
* `Activity/Fragment Lifecycle`
    * Main stages:
        * `Created` - invisible, but ready to go (e.g. user switched to another app)
        * `Started` - visible (e.g. user focus is in "share" dialog)
        * `Resumed` - visible and has focus
    * Cycles:
        * Creation: `Initialized` - onCreate() - `Created` - onStart()/onRestart() - `Started` - onResume() - `Resumed`
        * Destruction: `Resumed` - onPause() - `Started` - onStop() - `Created` - onDestroy() - `Destroyed`
        
### Architecture
* Layers:
    * `UI Layer`- display the application data on the screen
        * `UI elements` - render data on the screen (View / Jetpack Compose)
        * `Sate holders` - hold data, expose it to the UI, handle logic
    * `Domain Layer (Optional)` - business logic (UseCase)
        * Reusable code, calls to different repositories
    * `Data Layer` - business logic (Repository, Model, Data Source)
    
### Libraries
* `Android Jetpack` - collection of libs that follow best practices (with backward compatibility)
    * `androidx.*` - technical foundation
    * `WorkManager` - schedules and executes code in background (even if app not running)
    * `Room` - data storage persistence
    * `Navigation` - app navigation flow
    * `Compose` - declarative functions for UI building (modern alternative to XML and Layout Editor)
    * `Preferences` - key-value storage
* `Retrofit` - http client (built on top of okhttp)
    
### Android studio
* Don't do stuff manually:
    * Instead of manually writing XML for layout
        * Use GUI editor (Design tab)
    * Instead of manually adding Activity class, related xml and line to AndroidManifest.xml
        * Use (Right-click on package -> New -> Activity)
        * Same goes for fragments, folders, services, etc
    * Instead of manually rewriting java code as kotlin 
        * Try to paste it in studio, it will convert code automatically
* `App Inspection`:
    * `Database Inspector` - look at DB tables (Room)
    * `Background Task Inspector` - check WorkRequest status (WorkManager)
* `Layout Inspector` - check component tree (Activity)
    
### Android OS
* Android OS is Linux in which each app is a different user
    * App files accessible only by one user
* Each process has its own virtual machine (VM), so an app's code runs in isolation from other apps

### Etc
* `Inflate` - build View objects from XML file
    * Most of the time done implicitly (by OS), can be done explicitly (using `LayoutInflater`)
## SDUI
* `SDUI` - Server driven UI / Backend driven UI
  * Frontend sends "what to render?" request to the backend. Backend responds with fields, their values and validation rules
* Advantages:
  * Dynamic UI changes 
    * E.g. in CRM users can configure forms on the fly
    * Also useful for app stores, where each update has to go through review process
  * No need to reimplement same UI on different platforms (iOS, Android, Web)
  * Allows easy A/B testing
  * Useful if you have a lot of simple forms that consist of standard UI elements (without any unique features)
* Disadvantages:
  * Limited flexibility and creativity. Each form should be standard, no unique elements are allowed
  * High complexity, bad dev experience (harder to write, debug and test)
  * No offline mode
  * Bad performance, high network load (responses from server are usually ~10 times bigger, compared to standard approach)
  * Won't work in case if different clients should display same data differently
* Sources:
  * https://github.com/MobileNativeFoundation/discussions/discussions/47
  * https://medium.com/justeattakeaway-tech/backend-driven-ui-on-native-ios-apps-613c3e8c579f
  * https://medium.com/movile-tech/backend-driven-development-ios-d1c726f2913b
  * https://www.reddit.com/r/softwarearchitecture/comments/1f8s741/architectural_dilemma_who_should_handle_ui/
  * https://www.youtube.com/results?search_query=backend+driven+ui
  * https://www.reddit.com/r/androiddev/comments/1ejngo9/server_driven_ui_is_this_really_worth_it/

### Example
```
{
    "type": "form",
    "fields": [
      {
        "id": "username",
        "type": "text",
        "value": "john_doe",
        "placeholder": "Enter your username",
        "validation": {
          "required": true,
          "minLength": 3,
          "maxLength": 20,
          "pattern": "^[a-zA-Z0-9_]+$",
          "errorMessage": "Username must be 3-20 characters, with letters, numbers, or underscores."
        }
      },
      {
        "id": "email",
        "type": "email",
        "value": "john@example.com",
        "placeholder": "Enter your email",
        "validation": {
          "required": true,
          "pattern": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
          "errorMessage": "Please enter a valid email address."
        }
      },
      {
        "id": "age",
        "type": "number",
        "label": "Age",
        "value": 30,
        "placeholder": "Enter your age",
        "validation": {
          "required": false,
          "min": 1,
          "max": 120,
          "errorMessage": "Age must be a number between 1 and 120."
        }
      },
      {
        "id": "bio",
        "type": "textarea",
        "value": "",
        "placeholder": "Tell us about yourself",
        "validation": {
          "required": false,
          "maxLength": 500,
          "errorMessage": "Bio cannot exceed 500 characters."
        }
      }
    ],
    "submitButton": {
      "label": "Save",
      "action": {
        "type": "POST",
        "url": "/user/update-profile"
      }
    }
}
```
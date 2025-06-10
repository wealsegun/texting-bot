# OPTIONAL Question: 🗺️ Address

There are a lot of places in our Angular application where we need to ask the user for a physical address such as this one:

*Example Address*

```javascript
123 Main St
New York, NY 18814
```

In order to add an address field to many parts of our application to minimize code duplication, you would:
- Build a reusable address form component
- Possibly use an API or library to help with address validation / autocomplete
- Properly organize address logic/formatting/validation
- Include tests, etc.

## We will use the address control like this

```javascript
export class AppComponent {

	mainForm = new FormGroup({
		accept: new FormControl(), // true; false;
		address: new FormControl()
 	})
    }
}


----app-component.html
<form [formGroup]="mainForm">
    <mat-checkbox [formControlName]="accept"></mat-checkbox>
    <app-address [formControlName]="address"></app-address>
</form>
```

## 🤔⁉️ Question

How will your component interact with parent form groups? How will it share data with them? Please include detailed information about this.

## 🫵 Write your answer here

## Interaction of the Address Component with Parent Form Groups
The reusable address form component will interact with the parent form group using Angular's reactive forms approach, specifically through the ControlValueAccessor interface. This allows the address component to function seamlessly as a custom form control within a reactive form.

## Data Sharing Mechanism

  ### ControlValueAccessor Implementation:
	The address component will implement the ControlValueAccessor interface, which requires defining methods such as writeValue, registerOnChange, and registerOnTouched. This implementation will enable the component to communicate its value to the parent form.

  ### FormControl Binding:
	When the address component is used within the parent form, it will receive a FormControl instance via the formControlName directive. This binding allows the component to automatically sync its value with the parent form control, ensuring that any updates to the address field are reflected in the parent form's state.
  
  ### Value Changes:
	The address component will listen for changes in its internal form fields (e.g., street, city, state, zip code). When a user modifies any field, the component will call the registered change function (obtained from registerOnChange) to notify the parent form of the new value.
  
  ### Validation:
	The address component can also handle its own validation logic. It can use Angular's built-in validators or custom validators to ensure the address format is correct. If validation fails, the component will update the parent form's status (e.g., dirty, touched, valid, invalid) accordingly.
  ### Error Handling:

	Any error messages related to the address input can be communicated to the parent form. The component can expose an error state that the parent can use to display validation messages to the user, ensuring a cohesive user experience.
  
  ### Organizing Logic:
	The address formatting, validation, and any API interactions (e.g., for address autocomplete) will be encapsulated within the address component. This separation of concerns minimizes code duplication across the application and allows for easier maintenance.


## 🧐️ FAQs

### Do I have to write any code for the question above?

No need to write code. Just a detailed answer is all we're looking for.

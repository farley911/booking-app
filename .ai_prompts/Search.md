  
foundation

# Search Section

## Description  

I need to build the search section for the application that will replace the current placeholder for that section.
  
## Tech Spec  

### Tasks  

* Create the search section
* The section consists of two inputs
* The first input is "Stay Dates" which opens a date picker allowing the user to choose a from date and a to date
	* Once both dates are selected the search is submitted.
  * Beside the date picker should be a dropdown to choose the number of guests.
	  * The range is 1-4
	  * Changing this value also submits the search
  * The search area is centered in the browser window 
 

## Acceptance Criteria  

* The search is displayed for all routes, existing and to be defined
*  A user must select both from and to dates to search for rooms
* The date picker should be expanded on page load
* Default guest value should be 2
* Inputs should use validation with immediate feedback for any issues
* Accessibility best practices must be followed
* This should use the API that has been developed in the app for all requests
* Console log the response from the API for now
  
## Gherkin Scenarios  
```gherkin  
Scenario: Search is shown  
	When the User loads the app  
	Then the user sees the search in the associated section.  
```  
```gherkin  
Scenario: Datepicker is expanded onLoad  
	When the User loads the app  
	Then the datepicker should be expanded prompting the user to select a date range    
```  
```gherkin  
Scenario: Selecting a date range queries the API  
	When the User selects a valid date range  
	Then the API is queried for stays  
	And the API responds with the expected mock  
```   
```gherkin  
Scenario: Selecting an invalid date range triggers validation errors  
	When the User selects an invalid date range  
	Then the view displays approprate error messages to the User  
	And the API is not queried
	And the user is able to correct the error removing the error message and validation
	Then the API is queried
```  
```gherkin  
Scenario: Selecting a guest value queries the API  
	When the User selects a guest value  
	Then the API is queried for stays  
	And the API responds with the expected mock  
```   

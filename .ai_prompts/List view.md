  
# List Section

## Description  

I need to build the list view to show the stays returned by the API
  
## Tech Spec  

### Tasks  

* Create the stay list section
* This section will be blank on load with placeholder text saying "Please select a data range to view available stays"
* Once the user searches for stays and the data is available the content should be replaced with a grid showing the results.
* The stays should use a loading spinner as needed while data is retrieved
* The items should wrap to the next row to handle responsive requirements.
* Accessibility best practices must be followed.
* Clicking on the "Select Room" button should not submit an API request
* Clicking on the details button should do nothing at this time.
* Stay prices are per day and need to be added up to display the full booking price
* Search previously logged the response to the console, remove that log and use the response.
 

## Acceptance Criteria  

* Placeholder is displayed until the stays have been queried
* Stays are shown once the query has been made
* Stays are updated when the search changes
* Clicking "Select Room" adds the stay to the shopping cart.
	* The cart will be built as a separate feature, but do show the item count.
	* Do this by storing the data that will be needed to submit the request to the API from the cart view feature in a way that both the cart icon and cart feature can share a single source of truth.
* The grid view wraps to another row as needed
* Below the MD breakpoint each row of the grid should be a single item.
  
## Gherkin Scenarios  
```gherkin  
Scenario: Placeholder is shown  
	When the User loads the app  
	And a search query hasn't been made
	Then the user sees the placeholder informing them to enter a date range
```  
```gherkin  
Scenario: Search results are displayed  
	When the User submits a search  
	Then the results of the search are displayed in a grid
```  
```gherkin  
Scenario: Loaders displayed  
	When the User submits a search  
	Then loading spinners are displayed to inform the user that their request is processing
	And when the API request resolves the loading spinner is removed, replaced by the content.
```  
```gherkin  
Scenario: Responsive updates
	When the User views the app above the MD breakpoint
	Then the grid view shows multiple items per row
	And Overflow items are wrapped onto new rows as needed 
```   
```gherkin  
Scenario: Clicking Select Room Button  
	When the User clicks on "Select Room" for a particular room
	Then the cart icon is updated to show a count of "items" in the cart 
```  

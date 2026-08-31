  
# Cart/Checkout Section

## Description  

I need to build a shopping cart and checkout workflow
  
## Tech Spec  

### Tasks  

* The cart should list all rooms that we selected by the user
* The cart should tally all totals up and show a summary of the room items
* A checkout button will take the user to a checkout flow in a future task

## Acceptance Criteria  

* Clicking on the cart icon expands the right pane cart view
	* Click the close icon in the right pane collapses the view
* All stays are itemized
* All prices are broken down and displayed
* No trip enhancements are offered
* Clear all option is present to clear the cart
* The Checkout button is a placeholder
  
## Gherkin Scenarios  
```gherkin  
Scenario: Cart is expanded  
	When the User clicks on the cart icon
	Then the cart side pane is expanded showing the cart
```
```gherkin  
Scenario: Cart is collapsed  
	When the User clicks on the close cart icon
	Then the cart side pane is collapsed hiding the cart
```
```gherkin  
Scenario: Stay is removed
	When the User clicks on the remove link associated with a room
	Then that room is removed from their cart
```

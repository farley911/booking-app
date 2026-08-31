  
# Detail Section

## Description  

I need to build the details section for a particular room.
  
## Tech Spec  

### Tasks  

* Create a new route for /details/{room_type}
* The view should show all of the details about the room including images and reviews.
* The page should have a section that both displays existing reviews as well as allows users to submit their own review via a text area.
* The score for the review should be converted into stars (1-5) using StarIcon and StarBorderIcon from '@mui/icons-material/Star'; 
* Adding a room to your booking so follow the same approach as you current find in the list view when a room is added to the booking.
	* i.e. the cart icon reflects the item count and data is prepped for the cart feature
* Update the list view so that the details link is connected to this view.
* The detail view should have a share option provided using ShareIcon from '@mui/icons-material/Share';
 

## Acceptance Criteria  

* The details are shown in full
* Images have a carousel to scroll between them
	* Images should use the full width (minus padding)
* Users can select their date range and book the stay directly from the details view, without using the global "search"
	* This is mainly used for deep linking
* Resort fees are always a flat $0.00
* Clicking "Select room" follows the same pattern established on the list view.
* A back button is available to returns the user to the list view.
	* Their previous search should still be active, they should not be forced to start over.
  
## Gherkin Scenarios  
```gherkin  
Scenario: Details route is defined  
	When the User navigates either from the list or a shared link  
	Then the User sees the details of the associated room type
```  
```gherkin  
Scenario: Images are displayed in a carousel  
	When the User views the details  
	Then only one image should be shown at a time
	And clicking the previous/next arrows cycle through the images
```  
```gherkin  
Scenario: Loaders displayed  
	When the User loads the route  
	Then loading spinners are displayed to inform the user that their request is processing
	And when the API request resolves the loading spinner is removed, replaced by the content.
```  
```gherkin  
Scenario: Clicking Select Room Button  
	When the User clicks on "Select Room"
	Then the cart icon is updated to show a count of "items" in the cart 
```  

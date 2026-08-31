  
foundation

# API  

## Description  

I need to build a very simple API for the backend of my application. It should be built as a simple proof of concept and does not need to be production ready. 

It will serve up established mocks based on the swagger for the endpoint.  
  
## Tech Spec  

### Tasks  

* Set up simple Node backend that can serve HTTP requests for the application.
* The API must live in the same repo as the app.
* The API should not have any auth, logging, validation, etc.
* The API must reflect a real world API in implementation and design.  
* POST requests can store the data in memory, the data does not need persist a page refresh if it's adds notable complexity.
  
### Swagger 
```swagger
/stays:
	get:
		summary: Get available stays
		parameters:
			- name: from_date
				in: query
				required: true
				schema:
					type: string
					format: date 
				example: "2026-09-01"
			
			- name: to_date
				in: query
				required: true
				schema:
					type: string
					format: date 
				example: "2026-09-01"
			
			- name: guests
				in: query
				required: true
				schema:
					type: integer
					minimum: 1
				example: 2
		resonses:
			"200":
				description: Stays returned successfully
				content:
					application/json:
						schema:
							type: array
							items:
								$ref: "#/components/schemas/Stays
			"400":
				description: Invalid stay parameters
			"500":
				description: Server error
```  
```swagger
/stays/:
	get:
		summary: Get available stays
		parameters:
			- name: from_date
				in: query
				required: true
				schema:
					type: string
					format: date 
				example: "2026-09-01"
			
			- name: to_date
				in: query
				required: true
				schema:
					type: string
					format: date 
				example: "2026-09-01"
			
			- name: guests
				in: query
				required: true
				schema:
					type: integer
					minimum: 1
				example: 2
		resonses:
			"200":
				description: Stays returned successfully
				content:
					application/json:
						schema:
							type: array
							items:
								$ref: "#/components/schemas/Stays
			"400":
				description: Invalid stay parameters
			"500":
				description: Server error
```  
```swagger
/stays/{room_type}/reviews:
	get:
		summary: Get reviews for a particular room type
		parameters:
			- name: room_type
				in: path
				required: true
				schema:
					type: string
		resonses:
			"200":
				description: Room reviews returned successfully
				content:
					application/json:
						schema:
							type: array
							items:
								$ref: "#/components/schemas/Review
			"400":
				description: Invalid room type
			"500":
				description: Server error
```  
```swagger
/stays/{room_type}/reviews:
	post:
		summary: Post review for a room type
		parameters:
			- name: room_type
				in: path
				required: true
				schema:
					type: string
		requestBody:
			required: true,
			content: application/json,
				schema: $ref: "#/components/schemas/AddRoomReview"
		resonses:
			"200":
				description: Review added successfully
				content:
					application/json:
						schema:
							type: object
							items:
								$ref: "#/components/schemas/Review
			"400":
				description: Invalid parameters
			"500":
				description: Server error
```  
```swagger
/bookings:
	post:
		summary: Submit a booking request
		requestBody:
			required: true,
			content: application/json,
				schema: $ref: "#/components/schemas/CreateBooking"
		resonses:
			"200":
				description: Booking successfully reserved
				content:
					application/json:
						schema:
							type: array
							items:
								$ref: "#/components/schemas/Booking
			"400":
				description: Invalid booking
			"500":
				description: Server error
```  
```swagger
components:
	schemas:
		Stays:
			type: object
			required:
				- id
				- room_type
				- name
				- description
				- photos
				- price
			properties:
				id:
					type: integer
				room_type:
					type: integer
				name:
					type: string
				description:
					type: string
				photos:
					type: array
				price:
					type: number
					format: double
		Review:
			type: object
			required:
				- id
				- room_type
				- review
				- rating
			properties:
				id:
					type: integer
				room_type:
					type: integer
				review:
					type: string
				rating:
					type: integer
		Booking:
			type: object
			required:
				- id
				- room_type
				- from_date
				- to_date
				- guests
				- name
				- address
				- confirmationNumber
			properties:
				id:
					type: number
				room_type:
					type: integer
				from_date:
					type: date
				to_date:
					type: date
				guests:
					type: integer
				name:
					type: string
				address:
					type: string
				confirmationNumber:
					type: integer
```

## Mocks
**stays.json**
```json
[{
"id": 1,
"room_type": "king_suite",
"name": "Premier King Suite",
"description": "725 sq ft・1 King Bed・3 guests max",
"price": 538,
"photos": [
"https://static.mgmresorts.com/transform/oJaHWphcM5w4/MGM_Delano_King_Suite_Room_Pano_closed_002.tif",
"https://static.mgmresorts.com/transform/3n2z35OY757/WLV84615147.jpg",
"https://static.mgmresorts.com/transform/wVpgtaZTehe6/MGM_Delano_King_Suite_Living_Room_Pano_Closed_002.tif"
]
}, {
"id": 2,
"room_type": "strip_view_king_suite",
"name": "Escape Strip View King Suite",
"description": "725 sq ft・1 King Bed・3 guests max",
"price": 596,
"photos": [
"https://static.mgmresorts.com/transform/c0AcIOCdGiv3/MGM_Delano_King_Suite_Room_Pano_open_002.tif",
"https://static.mgmresorts.com/transform/U29I6n3mTyj1/MGM_Delano_King_Suite_Living_Room_Pano_Open_002.tif",
"https://static.mgmresorts.com/transform/AYhuQv3DM6v6/MGM_Delano_Suite_Bath_Pano_003.tif"]
}, {
"id": 3,
"room_type": "queen_suite",
"name": "Premier Queen Suite",
"description": "725 sq ft・2 Queen Beds・4 guests max",
"price": 538,
"photos": [
"https://static.mgmresorts.com/transform/oJaHWphcM5w4/MGM_Delano_King_Suite_Room_Pano_closed_002.tif",
"https://static.mgmresorts.com/transform/3n2z35OY757/WLV84615147.jpg",
"https://static.mgmresorts.com/transform/wVpgtaZTehe6/MGM_Delano_King_Suite_Living_Room_Pano_Closed_002.tif"
]
}, {
"id": 4,
"room_type": "strip_view_queen_suite",
"name": "Escape Strip View Queen Suite",
"description": "725 sq ft・2 Queen Beds・4 guests max",
"price": 596,
"photos": [
"https://static.mgmresorts.com/transform/c0AcIOCdGiv3/MGM_Delano_King_Suite_Room_Pano_open_002.tif",
"https://static.mgmresorts.com/transform/U29I6n3mTyj1/MGM_Delano_King_Suite_Living_Room_Pano_Open_002.tif",
"https://static.mgmresorts.com/transform/AYhuQv3DM6v6/MGM_Delano_Suite_Bath_Pano_003.tif"]
}]
```

**Reviews mock**
```json
[{
"id": 1,
"room_type": "king_suite",
"review": "This room is amazing! The bed is super comfortable and the view is perfect.",
"rating": 5
}, {
"id": 2,
"room_type": "queen_suite",
"review": "This room is great! The bed is super comfortable and the view is perfect.",
"rating": 4
}, {
"id": 3,
"room_type": "strip_view_king_suite",
"review": "This room is amazing! The bed is super comfortable and the view is perfect.",
"rating": 5
}]
```

## Acceptance Criteria  

* The provided values for toDate, fromDate, and guests should be ignored on the API with the mock response provided regardless or params.  
* Bookings and Reviews mocks are an empty array unless a value has been stored from a POST
* Backend can be started and run
* React application can make requests to the API through future features without additional wiring.
* How to run the server documentation is provided in the output.
* Any typescript types have been defined in the /src/types directory so the React app has them available
  

## Gherkin Scenarios  

```gherkin  
Scenario: API is available  
	When the React app makes an API request  
	Then the API should respond with the correct response   
```  
```gherkin  
Scenario: User search from stays
	When the User submits a request to /stays or /stays  
	Then the API respondes with the mocked stays.json data      
```  
```gherkin  
Scenario: User submits an invalid search for stays  
	When the User submits a request to /stays or /stays
	And the request is invalid  
	Then the API respondes with a 400      
```  
```gherkin  
Scenario: User requests reviews for a stay with reviews
	When the User submits an API request to /reviews  
	And the room_type does have associated reviews 
	Then the API returns the reviews for the associated room_type   
```
```gherkin  
Scenario: User submits an invalid request for stay reviews  
	When the User submits a request to /reviews
	And the request is invalid  
	Then the API respondes with a 400      
```   
```gherkin  
Scenario: User requests reviews for a stay without reviews
	When the User submits an API request for reviews
	And the room_type doesn't have any associated reviews  
	Then the API returns and empty array
```   
```gherkin  
Scenario: User submits a review
	When the User submits an API request to post a review  
	Then the API stores and returns the review
```   
```gherkin  
Scenario: User submits an invalid request to add a review
	When the User submits a post request to /reviews
	And the request is invalid  
	Then the API respondes with a 400      
```   
```gherkin  
Scenario: User submits a booking request
	When the User submits an API request for /bookings  
	Then the API stores and returns the booking
```   
```gherkin  
Scenario: User submits an invalid booking request
	When the User submits an API request for /bookings 
	And the request body is invalid 
	Then the API responds with a 400
```   

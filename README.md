# Hawaii Pig Visualization

Hi there! Welcome to my Pig Visualization project, done with d3.js + React. 
It was my first time using d3 with react, and after a lot of reading and searching, I made this project based it was better for me and my experience. I'm going to explain a little bit how I did it. 
Hope you'll enjoy it! 

## Interaction d3 and React 

I read a lot of articles and tutorials about how to work with react and d3 at the same time. All of them shared the two options to go: 

1. **Using D3 for math and React render method for updating.** This was by far, the most used one, and better for people like me, newbies to d3. 
  - **Pros**
    - Best for simple charts.
    - Simpler code.
    - It takes full advantages of React rendering.
  - **Cons**
    - Cannot use D3 functions that need access to DOM (transitions).
    - Goes through lifecycle for every tick, so it is poor in scaling. 
2. **Using D3 for rendering and math, React only for structure**. 
  - **Pros**
    - Use all the d3 functions, using all d3 power.
  - **Cons**
    - Cannot take full advantages of react. 
    - Messy code. 


I ended up using way 1, because I wanted to understand the basics of d3 without loosing control of what I know with React: manipulate the DOM. However, I really enjoyed working with d3 and I want to keep learning how to use the best of it. So, the next time I update this challenge, I hope I can do it with all d3 power! 

## Goals: 

* [X] Animation that steps through the data, displaying each year for 2 seconds
      before proceeding to the next year.

* [X] A progress bar that shows the currently displayed year's relationship to
      the other years in the dataset.

* [X] A play/pause button which enables and disables the animation, pausing on
      whichever year is currently being shown

* [X] Year and play/paused state are persisted as query parameters in the URL.
      For example, `http://localhost:3000/?paused=true&year=2002` should load
      the page with the animation already paused and the year set to 2002

## Pending: 

* [ ] Deploy it to heroku. 

* [ ] Better chart visualization, with transitions.

* [ ] Make the barChart component reusable. 

* [ ] Use D3 for math and DOM updates.


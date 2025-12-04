# To preface this, apologies for the casual Monty Python quirks sprinkled about but I got really excited when I saw the API name - I guess the person reading this doesn't expect anyone under the age of 35 to even know much about it but Romania is 10 years in the past and I had to do my homework on floppy disks, my first computer was a Compaq and I still say "Kids these days". Now in terms of the code...

# External libraries

- Tailwind.css - Is my prefered css framework which came in handy here since I wanted to style my components quickly.
- Axios - I have used it to fetch the data from the API since it provides out of the box json parsing. It also comes with the very useful shorthand axios.post which was a saving grace here for getting the data.
- Lucide React - React library that I use on my personal projects as well for quick and easy access to beautiful icons.

# Code considerations

- I have split my code into different folders and filed so it's more readable. What I would add if I had extra time would be a folder for each component (so the structure would be components/ProductCard/ProductCard.tsx for example) which would contain a separate css file for the styles and a storybook file for the story associated with the component.
- I like to design my components in the atom/molecule/organism pattern, but since this is a fairly small project, I thought of at least separating my ProductCard and my Filters from the dashboard (otherwise it would have been 500 lines and would induce a headache)
- In terms of separation of concerns, I like to keep as little logic as possible in my components which is why I have created a separate hooks file to handle filtering the data and a listings.ts file which deals with fetching the data from the API. I have also added a separate file for my interfaces.
- I would also have used Zod for schema validation since we are dealing with a complex API and it can be difficult to type everything appropriately.
- My first approach to this code was doing client-side filtering but due to the size of the data, server-side filtering was the best approach which is why I'm dealing with this inside the useListings hook (where we are getting the data back from the APi) and not on the Product Dashboard (where we are rendering the data).
- Responsiveness and accessibility can be improved, I would also add a11y plugins to Storybook and Chromatic for UI testing

# Starting the project

- Make sure to use node version 20 or higher
- When cloning the project run npm i to install the packages
- Run npm run dev to run the project

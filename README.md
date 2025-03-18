# Metavoid Dashboard
A user management dashboard with other worldly theming. Made with love, Vue 3, Composition API, Tailwind, Typescript &amp; Pinia 💛 The app allows admin users to view (search, filter, sort), edit, create and delete new Avatars (users). I use a mockApi that simulates a REST API. I fetch and handle all user data inside a Pinia store.

<br>

Install Packages


```npm install```

<br>

Run App


```npm run dev```

<br>

**📁 Component Architecture**

**Views**

• AvatarDashboard: 
this is where AvatarList gets imported and other future dashboard components will be imported.

• AvatarProfile: 
this is the user details page where you can edit the user information as well as delete the specific user.

• SpawnAvatar: 
a form to create a new user (spawn an avatar)

**Components**

• AvatarList: 
A table displaying all users and all its data. Pagination component and filtering and sorting files get added here.

• Pagination: 
Here I setup pagination for the AvatarList component. Buttons contain first, last, previous, next and visible pages. Here I implemented error handling.

<br>

**🚀 Features**

• Utils to translate role and status into cool themed names 
(eg. admin => 🔮 Overseer of Realities / active => 🔴 inactive => Offline, Link Severed)

• Composables to use debounce on search and another that holds the filtering / sorting

• Directive to focus on mount

• 🌙 Dark / ☀️ Light theme switcher with Tailwind

• Language switcher with i18n supporting English, German and French (implemented only on AvatarList component

• Route guards (Vue router)

• Confirmation dialog for deleting an avatar 

• TypeScript throughout the app (including Interfaces)

• Loading states for API calls

• Simulation delay for API

• Unit test for deleteing a user (purging an avatar)

• Cool Metaverse styling (very basic) with transition effects on hover

<br>

**⛏️ Additional features I'd add if I had more time / will add in the future**

• Many more Unit tests (eg. test debounce search / users display correctly)

• End-to-end testing with Cyprus 

• Tests for my Pinia stores

• User avatars (profile pics) using an external api

• Bulk select and delete users

• Dashboard cards that display user metrics such as a pie chart that shows the amount of users active vs inactive. 

• More advanced styling

• Role based rendering and more...


_PS: I like to write well defined code and I think comments in the code can be messy but I am more than happy to add comments or explain my code in more depth_

<br>

# Architectural Questions

**1. How would you optimize API calls in this application for performance?**

I already added debounce to the search to reduce requests. The pagination also reduces the amount of data being fetched. To further optimize API calls I would add custom caching in Pinia.

**2. Describe your approach to handling shared logic between components.**

DRY (Dont Repeat Yourself). For the search debounce I used a composable so that it can be used in all future inputs that may require it. I also stored all filtering logic in a composable for re-usability and to keep my code cleaner. I could also add a useTheme composable to handle the dark / light theming.

**3. How would you implement client-side data caching for this dashboard?**

One could use expired timestamps for data responses. Can also use other caching libraries like Vue Query.

**4. What strategy would you use to scale this application if it needed to support hundreds of different user permission types?**

I certainly would not hard code the permissions. It would have to be a dynamic centralized system that connects each of the roles to permissions. We can then do the neccessary checks in the api and/or UI. I also came across something called micro frontends but I am not too familiar with the concept.

**5. Explain your testing strategy and how you decided what to test.**

Because it's a small application testing will not need to be complex. If I had more time I would've added extensive testing to all the components and wish to do so in the future. I would use a combination of unit tests with Jest and E2E tests with Cyprus to ensure components work well together and all logic flows.

**6. How would you handle offline capabilities in this application?**

I would use caching with Cache API to store important data. I would also take advantage of localstorage to allow the app to continue working without network connection.

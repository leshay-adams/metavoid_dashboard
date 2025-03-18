# Metavoid Dashboard
A user management dashboard with other worldly theming. Made with love, Vue 3, Composition API, Tailwind, Typescript &amp; Pinia 💛 The app allows admin users to view (search, filter, sort), edit, create and delete new Avatars (users). I use a mockApi that simulates a REST API. I fetch and handle all user data inside a Pinia store.

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

• Dark / Light theme switcher with Tailwind

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

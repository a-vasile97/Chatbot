# Run the application
After opening a terminal and entering the folder of the project, make sure you have npm installed(preferably Node20 or above to avoid runtime errors), then run `npm run dev` and access `http://localhost:5173/` in the browser, as it is displayed in the terminal.

# About the application
Core functionality:
- navigate through stock options and the stock names from the selected option in order to display the current value;
- return to previous options or to the 'Main Menu' using the navigation buttons(Go back and Main Menu)

# Application structure
Since all stock options share the same structure, a new component(`ChatMessage`) has been created to take advantage of React's reusable components, which makes the code easier to read. 
Inside this component conditional rendering has been used in order to avoid cluttering option types with unnecessary segments, such as the navigation buttons for the initial option.
Conditional rendering has also been used in order to prevent errors when loading the page, such as trying to render chat messages which would contain information that has not yet been added to the state.
All messages are added in an array where the type of the chosen option is saved, which is then used to display the proper components, and the content is saved with the `useState` hooks.
The `goBack` and `reset` functions also utilise the `useState` hooks, and depending on the current component they will push a new element in the `messages` array with the corresponding value, in order to load the new message.
For the messages that are 'sent' by the user, apart from the `message type` that is saved in the state, a content key is added that stores the clicked value, in order to reflect the chosen option without needing to save with the useState, as that would also change previous messages when selecting a new option

# Improvements and limitations
Better error handling for data import should be added, as right now only the structure of the json is tested when loading the application, not the contents, so if one of the objects miss the necessary fields the app would break.
Better error handling for data rendering and navigation should be added, as the only checks present are related to the state, and previous options can be selected in order to generate new output.

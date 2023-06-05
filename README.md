# emotedl | Discord Emoji Downloader

This is a Node.js application that allows you to mass download Discord emojis using a command-line interface (CLI). The application utilizes the `node-fetch` and `inquirer` libraries to interact with the Discord API and provide a user-friendly interface for selecting and downloading emojis.

## Prerequisites

- Node.js installed on your system
- npm (Node Package Manager) installed on your system

## Installation

1. Clone this repository or download the script file.
2. Open a terminal or command prompt and navigate to the project directory.
3. Install the required dependencies by running the following command:

```
npm install
```

## Usage

1. Obtain your Discord token by following these steps:
- Open Discord in your browser or desktop application.
- Press `Ctrl+Shift+I` (or `Cmd+Option+I` on macOS) to open the developer console.
- Go to the "Network" tab in the developer console.
- Reload the Discord page.
- Look for a request starting with "https://discord.com/api/v10/users/@me/guilds".
- Click on the request, and in the "Headers" section, find the "authorization" header.
- Copy the value of the "authorization" header (excluding the "Bearer " part).

2. Run the application by executing the following command:

```
npm start
```
OR
```
node index.js
```

3. The application will prompt you to enter your Discord token. Paste the token you obtained in the previous step and press Enter (This will not be saved).

4. You will then be presented with a list of guilds (servers) that you are a member of. Select the desired guild from the list.

5. Depending on your choice, you will be prompted with different options:
- If you choose "Download all emojis," the application will download all emojis from the selected guild and save them in a directory named "dl" (created automatically in the current directory). Each emoji will be saved with its name and file extension (`.gif` for animated emojis and `.png` for static emojis).
- If you choose "Download individual emoji," you will be prompted to select a specific emoji from the guild. The selected emoji will be downloaded and saved in the "dl" directory.

6. The downloaded emojis can be found in the "dl" directory in the same location where the script is located.

****Note:**** The `node-fetch` and `inquirer` libraries are already imported and used in the provided script, so you don't need to install them separately.


## Disclaimer - Self bots
**This application could be categorised a self bot**, which technically goes against Discord's Terms of Service (TOS). Discord explicitly prohibits the use of self bots.

While the likelihood of being caught and facing consequences for using a self bot is low, it is important to note that there is still a risk involved. Discord actively monitors and enforces their TOS, and using self bots can result in penalties such as account suspension or termination.

Using self bots or any application that violates Discord's TOS is done at your own risk. I will not be responsible for any consequences that may arise from the use of this application.

## Disclaimer - Legal stuff

Please ensure that you have the necessary permissions and rights to download emojis from the Discord servers you are a member of. 

Please respect the intellectual property rights of others and only use this application in compliance with Discord's terms of service and the guidelines set by the server administrators.
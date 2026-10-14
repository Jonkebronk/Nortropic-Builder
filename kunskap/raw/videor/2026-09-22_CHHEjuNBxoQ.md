---
id: CHHEjuNBxoQ
titel: "This New Open Source Tool Just Fixed Your Claude Code Workflow"
kanal: "AI LABS"
datum: 2026-09-22
url: https://www.youtube.com/watch?v=CHHEjuNBxoQ
langd: "12:25"
typ: videotranskript
kalla: "automatiska engelska undertexter (yt-dlp, en-orig), rensade från dubbletter"
---

# This New Open Source Tool Just Fixed Your Claude Code Workflow

## Beskrivning (från YouTube)

Claude Code workflow is stuck: every session lives in one folder with one agent. This Claude Code tutorial covers Agit, the Claude Code setup, the Claude Code tips we use daily, and how Claude Code agents hand sessions to each other.

Try Runable at https://runable.com/?utm_source=ytlong&utm_medium=AILABS-393 and turn your next idea into a real, live product from a single prompt.

Agit on GitHub: https://github.com/Einsia/agent-git

Community with All Resources: https://ailabspro.io/?v=CHHEjuNBxoQ

The Roundup, our daily newsletter covering the AI stories that matter. Join now: https://www.theroundup.so/

What we cover

- The gap in every Claude Code workflow: your conversation is stuck to one agent in one folder, so sharing it means writing it out by hand
- What Agit is, and how it points the Git model at your conversations instead of your code
- Git from scratch for anyone who has never used it: commits, branches, push, reviewing changes
- Why this matters if you are vibe coding with Claude and have never touched version control

Storing and sharing sessions

- Multiple conversations on one project, each on its own branch, so they stay separate
- Commits save your prompts and the agent's response, and going back changes what the agent sees, not your app
- 1 GB storage on private repos, no limit on public ones, and why public is one way
- Profiles, collaborators and pull requests, plus read-only links with an open limit
- Cherry-pick a message and its response into your current session, so context moves between conversations instead of being rewritten

A Claude Code agents workflow across two tools

- Forking a session into Codex, the coding agent from the makers of ChatGPT, with no handoff document
- What carries over, messages and tool records, and what does not, the model's thinking
- The dynamic workflow Claude Code does not give you on its own: picking up the same conversation in a different agentic AI tool
- Why we need this daily working in both Codex and Claude Code

Install and setup

- Both install commands, which one we used, and why the other failed for us
- Account, browser login, init, repo name and auto push
- agents.md or claude.md, and why we added both
- Where Agit stores everything, in the .agit folder in your home folder
- The full vibe coding setup for the demo, built on the web app template from our community

Keys and passwords

- Agit replaces recognised keys with placeholders when saving and checks again before pushing
- The gap: a password made of ordinary words has no pattern, so it can slip through
- The skill we built to register passwords first, and why it has to be added at the start

Vibe coding with Claude

- New to vibe coding? Vibe coding is building software by describing what you want to an agent instead of writing code, and this is the session layer most vibe coding tools leave out
- Claude Code tips for anyone running more than one conversation on the same project
- These workflows apply in Claude AI, Claude Code, Codex or any AI coding tool that reads a project instructions file
- The skill, the starter pack and the rest of our resources are in AI Labs Pro

00:00 Intro
00:56 Git basics
02:06 How Agit works
04:02 Sponsor
04:58 Install & setup
06:02 Creating a repo
07:34 Rewind & revert
08:54 Cherry-pick
09:44 Fork to another agent
10:39 Handling secrets

Hashtags:
#ai #claude #ClaudeCode #vibecoding #agenticai #git #ClaudeAI #aicoding #claudecodeworkflow #claudecodetips #Codex #ChatGPT

## Kapitel

- 0:00 Intro
- 0:56 Git basics
- 2:06 How Agit works
- 4:02 Sponsor
- 4:58 Install & setup
- 6:02 Creating a repo
- 7:34 Rewind & revert
- 8:54 Cherry-pick
- 9:44 Fork to another agent
- 10:39 Handling secrets

## Transkript

The biggest problem with working with multiple sessions is sharing context between them. This is because your session is limited to the same agent working in the same folder. So, when you need to move to another session or share that context with someone else, you need to write it out into files so that other agents can continue from where you left off. And we run into this a lot ourselves because when we're discussing something with an agent and need to share it with someone else, the file it writes just keeps the key points and misses the details. But there's a tool called Agent Git that solves exactly this problem. And not only does it let you manage the sessions inside one agent, it also makes moving them across different agents easier, which no other tool does as cleanly. And you can share your sessions with other people as well, so they can carry on from the discussions you've already had. So, if you're new here, we're a software company and this is AI Labs. And in this video, we're going over what A Git is, how it actually solves this problem, and the one problem the tool itself had and how we solved it. So, before [snorts] we get into A Git, you need to know about Git because A Git borrows the whole idea from it. If you already know about it, you can skip straight to the next section from the timestamps below. Git is actually a tool that basically tracks the changes in your projects. When you let it track a project, not only can you see exactly which lines were changed, but you can also see who made those changes. Each saved version of your project is called a commit and Git keeps it under your name. So, if a change breaks something, you can go back to the previous commit that was working. You can also work on a separate version of your project called a branch, so you can experiment with a completely different direction. And if you don't want the changes you made in that branch, you can delete that branch and nothing in your main project would be affected at all. Now, those commits are saved on your computer. When you send them to a site like GitHub to save them online, that's called a push. That way, your teammates can get the versions you've saved and work on the project, too. Now, when multiple people work on the same project, each person can make changes on their own branch without changing the main version. Their commits show what they changed and once they push those commits, their teammates can review the changes and combine them with the main version. So, you can use this for the projects you build together or a shared second brain or knowledge base where everyone adds their own information. A get takes the same idea from get and uses it on the conversations you have with your agents. In get, your project and its history are kept in one place called a repo. In A get, the repo holds your agents conversations instead of code and file along with its saved memory and skills. Each session gets its own branch inside that repo. So, you can have multiple conversations about the same project and each one stays separate. And a commit in A get saves the messages and what the agent did in response. This gives you a record of the conversation that you can go back to later. But, if you go back in the conversation, it doesn't undo changes to your app. The app stays the same, just the conversation that the agent sees is changed. You can share these sessions with other people as well. For that, you need a profile so people know who had the session and you can control who gets access to it. The profile works the same as your own get hub one does. When you save a session on your computer, it doesn't appear on your profile though. You need to push it and then it appears there. Your repos are private by default, which means other people can't view the sessions inside them unless you give them access. But, there's a limit worth knowing before you start. You only get 1 GB of storage for storing all the conversations in your private repos. But, if you want anyone to be able to view your conversations, you can make the repo public. A get runs multiple checks and then asks you to confirm if you want convert to public. Once you confirm it, will be public. People can copy that history and you can't make the repo private again. And when you want to share a conversation with particular people, there are two ways to do it. The first is adding them to the repo itself. You need to go to the settings pane, look for collaborators, and add whoever you want to work with. They can continue from where you stopped then send a request to add their work back to your repo, which is called a pull request. The second way is creating a read-only link so whoever you send it to can read the conversation without changing it. You can set how many times the link can be opened. Once that limit is reached, the link stops working and no one will be able to access that session using the link you gave. But before we install it, let's have a word by our sponsor, Runnable. Building real products usually means juggling a whole stack of separate tools that barely talk to each other and paying for a new subscription every time you add one. Runnable is one AI agent that builds all of it from a single prompt. We asked it for a landing page that could take real payments. It asked a couple of quick questions about our product and pricing, then started building. First, it laid out the page on the canvas, a hero, a features row, and a three-tier pricing table, each section appearing as it wrote it. Then it filled in the copy, the headline, the descriptions, the button text. For checkout, it set up the payments itself, created the plans, spun up a live checkout, and wired every pricing button to it with no dashboard and no keys to paste. When it finished, it deployed and handed us a real URL. We opened it, clicked a plan, and a working checkout loaded on a page that didn't exist 10 minutes earlier. Building real products doesn't get any easier than this. So, try Runnable and build yours today. Links in the description below. So, in order to install this tool, you need to go to their GitHub repo, where there are two install commands. The create A Git command installs the tool and sets it up for your coding tool in one go. You can use that if you want the one command installer. The other command installs the same tool through another installer, and it's an alternative if the first installer doesn't work for you. Both install it for your whole computer. We went with NPM because the other installer couldn't install when we ran it. You just need to copy the install command and run it in your terminal. Once it's installed, you can check which version you have by running the version command. Now, you might think that since it is installed on all of your computer, it will start saving everything that you're working on, but it won't be saving everything and it will only save where you ask it to. You need to create an account on their site, then run the login command in your terminal to connect A Git to that account. You need to choose the browser login option, then approve the login on the page that opens. You can check which account you're logged into by using the who am I command and your email and account will be shown. Once you're logged in, you're ready to create a repo for your project. Now, we're [snorts] testing it on a demo event management app. We use the web app template that we have in our community to make that build easier, downloaded it, and open the project folder in the terminal. You need to run the init command to make this project ready for A git. When you do that, it opens up an interface. The first option is the name, which will be unnamed by default, and you need to give it whichever name you want for your repo. Then, you need to check that if it's using the right project folder. After that, you can choose to review the instructions and skills that the setup is saving. There's also auto push, which lets the agent push your conversation automatically without you asking for it. If you leave that off, you can still push it yourself later. Then, you need to select which file should hold the instructions. The first option it gave was agents. md, which coding tools like Codex use for project instructions. The other is Claude.md, which Claude code uses. You need to select the file for the coding tool you're using. Since we work in both Codex and Claude code, we added both. So, in our project folder, both files contain the instructions the agent needs to use A git. A git also keeps a separate folder for the repo inside the .a git folder in your home folder. That's where it stores your conversations, memory, and skills. Memory holds saved facts and decisions, and skills is where it keeps any skills that it created and would be used in the future sessions. Once you've run init, you can prompt the agent about your task. As it finishes each turn, A git saves the conversation on your computer. But, before we explore more features of A git, it would be great if you subscribe to the channel and hit the like button. This small gesture of support goes a long way for us. Now, there are times [snorts] when the agent does something wrong and you need to go back a step in the conversation. You might think that it's the same as the rewind command that a lot of agents already have and does exactly this. But that's different with A get because you can rewind not only your conversations, but the conversations that somebody else shared with you as well. But this only changes the conversation. It doesn't take your app back to an earlier version. But before you run rewind, you need to run the log command first and it will list your sessions so you can choose the conversation you want to change. You can select the session you want and it will show the prompts you gave and what the agent did in response. The numbers next to those prompts identify each turn, which is your prompt and the agent's response to it. If you want to take a session back to an earlier point, you need to use the revert command and use the number you saw in the log to tell agent which prompt you want to go back to. In the command, the turn number goes after the session name with a hash symbol before the number. But you don't give it the number of turn you want to return to. Instead, you need to tell it what number of turns that are needed to go to the point you want to revert to and mention the numbers from the end back to that point. You can include all of them in one command. Now, those turns don't disappear from the log. The record of what happened stays there, but the agent no longer sees the turns you removed. You need to run the resume command to continue that conversation. And if you want the version on your profile updated as well, you can use the push command. Now, with A get, you can also take a message from one conversation and bring it into a different one. When you do that, the agent's response and the record of everything it did come along with it as well. So, if there's something useful in another conversation, you can pull that part into the session you're currently working in and continue from there. To do this, you'll first need to use the log command to find the message in the conversation you want to copy from. Once you found it, you can use the cherry pick command, provide that session's name and the message number, and tell it to add the message to your current session. The message and the agent's response will be added to the end of your current session, which means you can keep working with all of that context available. And if you need more than one message, you can include multiple message numbers in the same command. One thing to keep in mind is that this only copies the conversation history. It doesn't apply any of the app changes that were made or described in those messages. Now, with A Git, you can also continue a conversation that you're having in one agent in another agent as well. This is something that none of the coding agents let you do by default. We often need this because we use both Codex and Claude code. When we're deep in a conversation with Claude code and want Codex to continue the work, we normally ask Claude to write down what it's done and what Codex needs to know. Then we ask Codex to read that before giving it the next task. But A Git lets you bring the conversation into Codex directly, so you don't have to write that handoff yourself. You need to use the fork command and choose Codex. This creates a new session from the conversation you've already had, converts it into the format Codex reads, and opens it there. Your original conversation stays available, too. You can ask your current agent to write the command for you, so you don't have to remember all the options. But you need to run it in your terminal instead of asking the agent to do that for you, so that you can continue the conversation in another terminal. Agents [snorts] often handle things like API keys and passwords that you wouldn't want other people to have access to, and once the agent reads that information, it becomes part of the conversation. So, if you push that conversation, you could end up sharing those secrets as well. To prevent that, A Git checks for secrets when it saves the conversation and replaces any recognized keys with placeholders. These placeholders show where the key was without including the actual value. We tested this with some made-up API keys, and when we checked the saved history, those keys had been replaced with placeholders. A Git also checks the history again before pushing it, but there's a limitation here because API keys usually have a recognizable pattern, like a specific beginning and a fixed length. A password made up of ordinary words doesn't necessarily have any of those patterns. So, A Git can miss it even if the conversation explicitly says that it's a password. That's why we built a skill that registers passwords with A Git before the conversation gets saved. It starts by registering the secrets that are already in your project and then it tells the agent to register any new password you give it before continuing. Once a password is registered, A Git knows to replace that value with a placeholder when it saves the conversation. You don't need to add this skill when you start the session because once A Git has already saved a password in the history, adding the skill later won't remove it. Even if you remove the message, the password will still remain in the history. Now, this skill that we made along with the starter pack we showed you here and all the other resources are all available in AI Labs Pro. So, if you found value in what we do and want to support the channel, this is the best way to do it. The link's in the description. That brings us to the end of this video. If you'd like to support the channel and help us keep making videos like this, you can do so by using the Super Thanks button below. As always, thank you for watching and I'll see you in the next one.

---
id: 5lycYTOYbPM
titel: "3 Design Levels For a Free Claude Code Boost (People Stop At Level 1)"
kanal: "AI LABS"
datum: 2026-05-24
url: https://www.youtube.com/watch?v=5lycYTOYbPM
langd: "11:07"
typ: videotranskript
kalla: "automatiska engelska undertexter (yt-dlp, en-orig), rensade från dubbletter"
---

# 3 Design Levels For a Free Claude Code Boost (People Stop At Level 1)

## Beskrivning (från YouTube)

Get a Free Claude Code Boost in this Claude Code tutorial: how to use Claude Code across 3 levels of design that stop your output from looking AI-generated.
Get $100 in free credits with a business email: https://tinyurl.com/zilliz-AI-Labs

Links:
Milvus on GitHub (44k+ stars): https://github.com/milvus-io/milvus

Community with All Resources 📦: https://ailabspro.io/?v=5lycYTOYbPM
Video Code: V61

We're building The Roundup — a daily newsletter covering the AI stories that actually matter.  
Join now at: https://www.theroundup.so/

Vizzly: https://github.com/vizzly-testing/cli
Web Design Guidelines Skill: https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines

Why the same model gives one person a custom-looking site and another pure AI slop. It comes down to three levels of design, and most people never get past level one. This is the full breakdown of how to use Claude Code for design that actually looks built, not generated.

Level 1: Designing a single page
- The one thing most people skip that makes every output look generic
- Why Opus 4.7 still converges to one safe style, and how to spot it
- Prompt structure: intent, non-negotiables, then the color system
- Why we use OKLCH instead of RGB or HSL for smoother gradients and real contrast
- Banning AI-slop fonts like Inter and Geist so the model looks elsewhere
- Symmetry vs asymmetry, negative space, and the anti-patterns that scream AI (centered CTA, Lucide icons, glassmorphism)
- The same prompt principles apply across agents, so the codex vs claude code choice matters less than your setup

Level 2: Designing systems, not pages
- Why agent-built apps fall apart the moment you leave the landing page
- Splitting CLAUDE.md (project info only) and design.md (the full visual system)
- Why design content in CLAUDE.md distracts the agent and how to keep it lean
- Making design.md self-refining so every session starts more polished
- Using Google's open-sourced design.md template to cross-verify and flag errors
- Auditing with an open-source design skill (Vercel Labs) that points to a live, maintained source

Level 3: Testing designs like code (TDD for UI)
- Why design is subjective but still testable, and how pins replace inputs/outputs
- Turning every anti-pattern in design.md into a programmatic test case
- Static checks plus Playwright visual regression for incremental improvement
- Using the Visly Test CLI to run local TDD, review real diffs, and approve or reject each pass
- How rejected diffs become feedback so the design converges to what you actually want

How to use Claude Code (free or paid)
- These workflows are tool and plan agnostic: the setup is what changes your results, not the tier
- How to use Claude Code for free or paid, the three levels apply either way
- Whether you run Claude Code free, claude code free unlimited setups, or a paid plan, the design system is identical
- Notes for anyone searching how to get Claude Code for free, how to use Claude Code for free unlimited, or how to use Claude Code for free: the level system is what matters, not how you access the model
- The same design principles carry over if you build with ChatGPT or wire steps into an n8n automation
- Related Claude skills like the design-audit skill follow the same install-and-run pattern

This is practical AI automation for design: real ai tools, real vibe coding, and a Claude AI tutorial approach that holds up on actual projects.



00:00 Intro
00:37 Level 1
03:34 Level 2
06:25 Sponsor
07:31 Level 3

Hashtags
#ai #claudeCode #claudeAi #n8n #chatgpt #claudeSkills #vibeCoding #claudeCodeTutorial #aiAutomation #howToUseClaudeCode #claudeCodeFree #claudeAiTutorial

## Kapitel

- 0:00 Intro
- 0:37 Level 1
- 3:34 Level 2
- 6:25 Sponsor
- 7:31 Level 3

## Transkript

If you've been watching this channel for some time, you probably know that we've covered a lot of design workflows and tools. We've been testing all of them for months and we finally figured out why the same model can give you something that looks completely custom or something that immediately screams AI-generated. It comes down to three levels. Level one is designing a single page and there's one thing most people skip that's the entire reason their output looks generic. Level two is where you stop designing pages and start designing systems and the workflow here is completely different. And level three is how we test designs against each other to find the version that actually works, which is the part we use on every real project now. So, level one is about creating a good design for a single page. This is the level that most people teach because it's the foundation of every good design. We talked in our previous video about how Opus 4.7's design capability has gotten so much better and a lot of the AI slop we used to see is gone. Earlier, when we used to give it a simple prompt like creating a landing page, it would just straight up take the purple and white theme and build everything around it. That specific pattern has gotten better. But, just like any other AI model, this one also converges to safe patterns. And from all our testing and experimenting with it, we have found that it defaults to one particular style every time. So, now whenever we see that style, it's a dead giveaway that the site came from Opus 4.7 and it's only a matter of time before it becomes the next AI slop. So, we need other ways to make this website look better. Now, this level mostly comes down to prompt engineering and how we specify the app. Because if you structure your prompt properly, you can just one-shot the app entirely. The prompt should start with the intent of the website you are aiming to build, then mention the non-negotiables like the exact things you want in the app and how you want the UI elements to look. After that, you specify the color system. Now, here we use OKLCH, which is basically a measure of lightness, chroma, and hue. Using OKLCH instead of the usual RGB or HSL is better because it represents colors the the the human eye actually perceives them. So, it handles lightness and balance better. It also creates smoother gradients, unlike hex codes which can produce ones that look uneven. Now, once you have set the color scheme, you also need to mention the contrast flows. Contrast is a very important factor of UI design because it actually creates a hierarchy that guides your eyes toward the things that matter. Without explicit contrast, the model treats every element as equally important, which makes it hard to form the visual hierarchy. And to make sure the website doesn't look like AI slop, you also have to control the typography from the prompt. So, you define which fonts are banned because of AI slop and which ones to use in different areas of the design. Fonts like Inter and Geist have become AI slop giveaways because every agent reaches for them by default. So, calling them out explicitly forces the model to look elsewhere. Then, you define the layout and rhythm of the website. But first, you need to know about symmetry and asymmetry. Symmetric layouts have components evenly placed on the grid with a balanced look, which is more suited toward professional and straight designs. But for a more artistic look, go for asymmetry because that gives you more room to experiment. It is especially good when you need to use negative space since that lets the design breathe. The kind of product you are building decides which one fits better. Then, define all the sections that you want, the materials you'll use, and how the website should behave responsively. And the most important part is mentioning the anti-patterns. These are the hallmarks of AI slop like the simple centered CTA, Lucid icons, and gradients with glassmorphic design. So, once you give this prompt to Claude Code or whichever agent you are using, it will analyze your app and go through the implementation details. Then, it will build the app just like the prompt described with asymmetry because of the artistic goal and proper use of negative space. So, level two is about keeping the same design across every page of the site because most agent-generated apps fall apart the moment you leave the landing page. Often, when generating whole apps with agents, you might have encountered exactly this. The landing page is mostly pretty good, but when you go to the other pages, they don't follow the UI style as coherently as they should. The dashboard ends up with different button styles, different spacing, different typography, almost like the agent forgot it was building the same app. The other pages end up looking like they're not even a part of the same site, and it gives away that the site was generated by an agent. Sometimes the design does hold on the auth pages, but then on the dashboard, the style breaks completely. So, for that, you need to create two of the most important files, Claude.md and design.md. These two files are what keep the design consistent across the whole site. In Claude.md, as we've talked about many times, you only put your project information, not the design. This is because the file stays loaded in the session all the time, and design content there will just distract the agent when it's working on something else. But, it's still the key file because it keeps the context of the project, which informs good design. For the design itself, we need a separate file, which mentions everything for the visual system, the layout, the colors, the typography, and all the details we covered in level one. The design.md should be the kind of file that any agent could pick up and immediately understand what the visual system is. And just like in the previous level, you need to define the color system in OKLCH here, too. To create these two files, we gave Claude Code a detailed prompt covering what each file needs, and it generated both files for us. The Claude.md is short, just containing the project's details. The design.md is longer with each and every detail, including color codes, typography choices, and everything else. But, that isn't the end of the design.md. We need to keep refining it over time. So, we put a line at the start telling the agent to add any new design value it finds to this file. That way, every session starts from a more refined version of the design system than the one before it. But, just letting Claude create the design.md isn't enough because what it generates doesn't follow best practices properly. Google has open-sourced their template for the design.md file. The template also contains commands to cross-verify your design.md against it and flag any errors. So, you can just prompt your agent to iterate using those commands to perfect the design.md. And this still isn't the end of level two. To generate good enough designs at this level, you also need to audit them against existing design principles. For that, there are many open-source skills that do exactly this. You can use any of them, but we use Versal Labs skill because instead of hardcoding all the principles inside the skill, it points to an external source that they're actively maintaining. So, the principles stay up to date with current best practices instead of being frozen at whatever was state of the art when the skill was first written. You install this skill in the project, run it, and your design comes out in way better shape than it was before. But before we move forwards, let's have a word by our sponsor. So, I recently started using Zilliz Cloud, and let me tell you why. Most rag apps work fine with a handful of docs, but the moment you throw in real data, they start falling apart because the setup just wasn't designed to handle that kind of load. Milvus is the most starred open-source vector database on GitHub with over 44,000 stars, and it's built to handle that kind of load. But self-hosting means managing infrastructure yourself. So, that's where Zilliz Cloud comes in, the fully managed version with the same API that's up to 10 times faster, and you can set it up in minutes without changing a single line of code. So, we ran a semantic search query on Zilliz Cloud, and the results are actually relevant because it understands meaning, not just keywords, and the response time is almost instant even with a large data set. We also ran a recommendation query given one article, it found the five most similar ones across the entire data set ranked by similarity in under a second. And the dashboard tracks your cluster performance, storage usage, and data metrics including collection and entity counts in real time. No credit card needed, just click the link in the pinned comment and try Zilliz Cloud for free. So, level three is about testing the design programmatically the same way engineers verify code with TDD. Now, we know you can't visually write tests the way you do with code. With code, there are clear inputs and outputs for everything. Design doesn't have that because it's more subjective and can't be quantified like code can, but just because it's subjective doesn't mean we can't write tests for it. The reason TDD works for code is that the test pins down what the behavior should be and the implementation has to satisfy that pin. The same idea applies to design just with different kinds of pins. In the app we were building, the first step was the same as before to create the claw.md and design.md files before even thinking about implementation. Now, tests should always be written before the code. That way the implementation can actually be tested against them. If we write tests after the implementation, the agent slacks off. It just writes test cases that optimize toward the existing code because that code is already in its context. Writing the test first forces the implementation to fit the test instead of the test fitting the implementation. So, we use the design files as the source of truth for the test because these files contain all the anti-patterns that we can programmatically verify against. Every anti-pattern in design.md becomes a test case. Every color rule, every spacing constraint, every typography choice gets a programmatic check. We gave Claude code a detailed prompt to write the test cases specifying every section it should focus on. Also, if you are enjoying our content, consider pressing the hype button because it helps us create more content like this and reach out to more people. With your prompt, it will write all the test cases for the design of the app. It writes multiple types of tests. the static tests which directly check for the anti-patterns we mentioned in the prompt. Then there's the visual testing which basically uses Playwright underneath and runs regression testing to make the site incrementally better. It will also write test cases for other components and helper functions like scan and report. Now, these tests check for the static anti-patterns, but design testing needs something else. For that, there is another tool called Visly Test which is basically a CLI that conducts TDD for UI. The way it works is that it runs local TDD where you can check the design as the code changes. So, you can monitor the diffs yourself instead of relying on the agent's self-monitoring. You also get a better diff with metadata and other details, which makes review faster. Without that metadata, you are just comparing two screenshots side by side and hoping you spot the difference. With it, Visly tells you exactly which pixels changed and by how much. To use it, first install the CLI by running the install command from the docs. Once it's set up and initialized, it's ready to go. Now, just open Claude code and tell it to use TDD and implement whichever part of the UI you want using the Visly CLI as the testing medium. When you run the Visly TDD command, a local server starts and monitors the screenshot changes. To send the screenshots, Claude basically writes separate tests with the name Visly. These tests use Playwright screenshotting mechanisms to push the images to the viewer on the server. From there, you can approve or deny the design and view diffs comparing it to the previous version. Each rejected diff becomes feedback the agent uses to adjust the next pass. Over a few iterations, the design converges to what you actually want instead of what the agent thinks you want. Now, the prompts used here can be found in AI Labs Pro for this video and for all our previous videos from where you can download and use it for your own projects. If you found value in what we do and want to support the channel, this is the best way to do it. The link's in the description. That brings us to the end of this video. If you'd like to support the channel and help us keep making videos like this, you can do so by using the Super Thanks button below. As always, thank you for watching and I'll see you in the next one.

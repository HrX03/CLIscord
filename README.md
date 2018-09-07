CLIscord
======
A lightweight Discord client that can run into your cmd. Features an handy selector for guilds and channels and a main menu whit an info box, a message box and an input box

Commands:
```
    Control + n: Opens the guild and channel selector. It opens by default at startup;
    Control + s: Switches focus from input box to messages box. It's a bit confusing but i tried to make it the less buggy and confusing possible;
    Control + c: Stops the execution anytime;
```

Necessary installed packages:
```
nodejs: from nodejs official site;
npm: should be bundled with nodejs, eitherway search up how to install it, it's necessary;
discord.js: run a cmd in the same folder where you downloaded the client and run "npm install discord.js --save" ;
blessedjs: same as the discord.js method but run "npm install blessed --save" ;
```

For using the client you need to get your token (i can't and will not guide you how to get it, google online the **new** method) and put it on a file called **config.json** on the same folder as the client that is structured like this:
```
{
    "token": "your token here without spaces of any kind"
}
```

Finally, for running the client run a cmd in the same folder as the js file and type in "node CLIscord.js"

Warning: it could still have bugs i was unable to find, tell me if that's your case! Also it can randomly disconnect throwing an Unknown Error; this error is not predictable and i still cant understand how it happens. The execution can be a bit laggy when you start the client, i don't know why but if anyone knows feel free to tell me.

Enjoy!

<img src="https://i.imgur.com/2zboH8h.png">

***

<p align="center">A system that sends a card whenever someone join or leave your discord server.</p>

<p align="center">
    <a href="https://github.com/BebanCode"><b>Github</b></a> •
    <a href="https://discord.gg/9eCgpGuZAa"><b>Support</b></a>
</p>

<div align="center">
  <a href="https://github.com/unburn/greetify"><img src="https://img.shields.io/badge/Made%20using%20Greetify%20package-02589C" />
</div>
<p align="center">*Command handler is not included!</p>

***

# Installation
```
npm i discord.js greetify
```

# Usage
## **Welcome or Goodbye card**
<img src="https://i.imgur.com/2ALeGgf.png" />

```javascript
const { Minimal } = require("greetify");

    const welcomecard = await Minimal({
        backgroundImage: 'https://cdn.discordapp.com/attachments/1249246189065601044/1249248421475385417/folmlyl.png?ex=66669cc1&is=66654b41&hm=bd4b616bc338656ba0dfd63796737807dbb335d065c67e6b129d44a1a76497c4&',
        name: member.user.username,
        nameColor: '#254EAE'
        avatar: member.user.displayAvatarURL({
            size: 4096 
        }),
        type: "WELCOME",
        typeColor: '#4B71CB',
        message: 'test',
        messageColor: '#4B71CB',
    })
```
## **MongoDB Connection**
```javascript
const { connect } = require('mongoose')
const MONGO_URI = 'mongodb+srv://'
    
    
    await connect(MONGO_URI)
      .then(() => {
        console.log(`Successfully connected to MongoDB!`);
      })
      .catch((err) => {
        console.log(err);
      });


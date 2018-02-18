# arduino-tablature

Node.js project that makes a web scraping to get some guitar tablature and transform
it to an Arduino Program compatible with the tone() Function.

## About the project

### What is a tablature?

Tablature (or tabulature, or tab for short) is a form of musical notation indicating instrument fingering rather than musical pitches. _- Wikipedia words_

And it looks like this:

![](https://i.imgur.com/5tiTV8J.png)

#### Nice, but what can i do with this project?

So, with a circuit like that:

![](https://i.imgur.com/wP9z0lu.png)

Using this project you can play your favorite songs in your own Arduino.

## How to use it

### 1. Installation

1. First of all, make sure you have [npm and node](https://www.npmjs.com/get-npm) installed.
2. Then [clone/download](https://github.com/ThiagoAugustoSM/arduino-tablature/zipball/master) this repository. _if you download a .zip or .tar.gz file, unzip the file._ 
3. In the terminal navigate to the folder, then run:

> npm install

After it all the dependencies packages are all set.

### 2. Running the Code

#### Picking your tablature

- Go to [CifraClub's WebSite](https://www.cifraclub.com.br "CifraClub's Website") and search for your song, **which has a tablature on it.**

##### Example:

> https://www.cifraclub.com.br/natiruts/andei-so/

#### Running the code
Then execute in the terminal, with your url in the url param:

> node index.js --url=https://www.cifraclub.com.br/natiruts/andei-so/

### 3. Uploading

After that a **music.ino** file will be generated, inside the music folder, and you will be able to [upload it to your arduino](https://www.arduino.cc/en/Guide/HomePage) using the Arduino IDE or others.

## Broken Musics and Bugs

Some music is not working? We have a [thread issue](https://github.com/ThiagoAugustoSM/arduino-tablature/issues/5) open to report bugs in specific musics, report in the issue following the report example, and soon as possible the community will fix it.

Some bug? You can also open your own issue to report a bug. 

_tip: It is a good idea, when you find a bug, open a issue to report it, and make a pull request with the solution, becomin a contributor of the project_

## Contributors
**Thiago Augusto** ([GitHub :octocat:](https://github.com/ThiagoAugustoSM))
<br>
![](https://github.com/ThiagoAugustoSM.png?size=230)<br>
**Idealization and coding**

**Otacilio Maia** ([GitHub :octocat:](https://github.com/OtacilioN))
<br>
![](https://github.com/OtacilioN.png?size=230)<br>
**Documentation and coding**

<br>

**Yourself**

![](https://i.imgur.com/G1mfFQT.png)

Become a contributor, fork this repository, make your modifications and submit a pull request. See the complete list of [contributors](https://github.com/ThiagoAugustoSM/arduino-tablature/graphs/contributors).

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

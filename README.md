# arduino-tablature
Node.js project that makes a web scraping to get some guitar tablature and transform
it to an Arduino Program compatible with the tone() Function.

## How to use it

#### 1. Installation

First of all, make sure you have npm and node installed.

After that open a terminal on the directory and execute:

> npm install

After it all the dependencies packages are all set.

#### 2. Running the Code

Go to [CifraClub's WebSite](https://www.cifraclub.com.br "CifraClub's Website") and search for your song, which has a tablature on it.

Example:

> https://www.cifraclub.com.br/natiruts/andei-so/

After, paste your link into the **index.js** file on the line 14.

> url = 'https://www.cifraclub.com.br/natiruts/andei-so/';

Save the file and execute in the terminal:

> node index

#### 3. Uploading

After that a **music.ino** file will be generated and you will be able to upload it to your arduino using the Arduino IDE or others.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

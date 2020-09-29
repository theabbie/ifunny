const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
var cheerio = require("cheerio");
const util = require("util");
var url = require("url");
var devRant = require("rantscript");
const save = util.promisify(fs.writeFile);
var imgur = require("imgur");

(async function() {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  var page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36');
  await page.setCookie(...[
  {
    name: 'urlgen',
    value: '"{\\"1.186.110.133\\": 45769}:1kNGGB:IRlL7EwssOy0oohHfhoOYlLe9rU"',
    domain: '.instagram.com',
    path: '/',
    expires: -1,
    size: 69,
    httpOnly: true,
    secure: true,
    session: true
  },
  {
    name: 'shbts',
    value: '1601388336.701335',
    domain: '.instagram.com',
    path: '/',
    expires: 1601993137.511523,
    size: 22,
    httpOnly: true,
    secure: true,
    session: false
  },
  {
    name: 'sessionid',
    value: '8047292047%3AcSFRI6LvAEq7Yd%3A3',
    domain: '.instagram.com',
    path: '/',
    expires: 1632924336.540958,
    size: 40,
    httpOnly: true,
    secure: true,
    session: false
  },
  {
    name: 'shbid',
    value: '4688',
    domain: '.instagram.com',
    path: '/',
    expires: 1601993137.511479,
    size: 9,
    httpOnly: true,
    secure: true,
    session: false
  },
  {
    name: 'rur',
    value: 'ASH',
    domain: '.instagram.com',
    path: '/',
    expires: -1,
    size: 6,
    httpOnly: true,
    secure: true,
    session: true
  },
  {
    name: 'csrftoken',
    value: 'uEsM1nmPdRHPBWeIerjFm5nHeRajfPHT',
    domain: '.instagram.com',
    path: '/',
    expires: 1632837939.678891,
    size: 41,
    httpOnly: false,
    secure: true,
    session: false
  },
  {
    name: 'mid',
    value: 'X3M_HQALAAHVbyLBr570SAMGRli6',
    domain: '.instagram.com',
    path: '/',
    expires: 1916748317.516303,
    size: 31,
    httpOnly: false,
    secure: true,
    session: false
  },
  {
    name: 'ds_user_id',
    value: '8047292047',
    domain: '.instagram.com',
    path: '/',
    expires: 1609164339.679007,
    size: 20,
    httpOnly: false,
    secure: true,
    session: false
  },
  {
    name: 'ig_did',
    value: 'BA1AAA04-C324-4D5D-9AF6-79ED8C88320E',
    domain: '.instagram.com',
    path: '/',
    expires: 1916748317.159145,
    size: 42,
    httpOnly: true,
    secure: true,
    session: false
  }
]);
  
  try {
  await page.goto("https://instagram.com/",{waitUntil: 'networkidle0'});
    
  await page.screenshot({path: 'ss.png'});
  var link = (await imgur.uploadFile('ss.png')).data.link;
  console.log(link);
  }
  catch (e) {
  console.log(e.message);
  await page.screenshot({path: 'ss.png'});
  var link = (await imgur.uploadFile('ss.png')).data.link;
  console.log(link);
  }
  await browser.close();
})();

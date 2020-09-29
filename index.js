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
  var google = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36');
  await page.setCookie(...[
  {
    name: 'm-b_lax',
    value: 'M1yGXDgodU99InCeLlzN4w==',
    domain: '.quora.com',
    path: '/',
    expires: 1664450875.584464,
    size: 31,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'Lax'
  },
  {
    name: 'm-s',
    value: 'gkQonK5vg6PDb0AilbFL0g==',
    domain: '.quora.com',
    path: '/',
    expires: 1664450875.584554,
    size: 27,
    httpOnly: true,
    secure: true,
    session: false
  },
  {
    name: 'm-lat',
    value: 'b08Vh2DhLKsLGdvkOtit5A==',
    domain: '.quora.com',
    path: '/',
    expires: 1664450869.308044,
    size: 29,
    httpOnly: true,
    secure: true,
    session: false
  },
  {
    name: 'm-uid',
    value: '1307125887',
    domain: '.quora.com',
    path: '/',
    expires: 1664494069.670865,
    size: 15,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-css_v',
    value: 'main-5208944b2829bb2c',
    domain: '.quora.com',
    path: '/',
    expires: 1632914855,
    size: 28,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-tz',
    value: '-330',
    domain: '.quora.com',
    path: '/',
    expires: 1632914871,
    size: 8,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-b',
    value: 'M1yGXDgodU99InCeLlzN4w==',
    domain: '.quora.com',
    path: '/',
    expires: 1664450875.584386,
    size: 27,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'None'
  },
  {
    name: 'm-early_v',
    value: '57f768eb9618f0e6',
    domain: '.quora.com',
    path: '/',
    expires: 1664494054.491351,
    size: 25,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-ans_frontend_early_version',
    value: '608eb973920cb9b6',
    domain: '.quora.com',
    path: '/',
    expires: 1664494054.491314,
    size: 44,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-login',
    value: '1',
    domain: '.quora.com',
    path: '/',
    expires: 1664494069.308139,
    size: 8,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'G_ENABLED_IDPS',
    value: 'google',
    domain: '.www.quora.com',
    path: '/',
    expires: 253402257600,
    size: 20,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-b_strict',
    value: 'M1yGXDgodU99InCeLlzN4w==',
    domain: '.quora.com',
    path: '/',
    expires: 1664450875.584509,
    size: 34,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'Strict'
  }
  ]);
  
  try {
  /*await page.type('input[tabindex="1"][name="email"]', "assmaster@srvrr.tk");
  await page.type('input[tabindex="2"][name="password"]', process.argv[2]);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');*/
    
  var q = "If X/10+29=39, what is the value of x";
    
  await page.goto('https://google.com/search?q='+q+" quora", {
    waitUntil: 'networkidle0',
  });
    
  await page.evaluate(function() {
  	document.querySelectorAll("div.r a")[0].click();
  });
    
  await page.waitForNavigation();
  
  var question = await page.evaluate(function() {
  	return document.querySelector("title").innerHTML.slice(0,-8);
 })
    
  await google.goto('https://google.com/search?q='+question, {
    waitUntil: 'networkidle0',
  });
    
  await google.evaluate(function() {
  	document.querySelectorAll("div.r a")[0].click();
  });
  
  await google.waitFor(5000);
  
  var content = await google.evaluate(function() {
  	document.body.querySelectorAll("script").forEach(x=>x.remove())
  	document.body.querySelectorAll("style").forEach(x=>x.remove())
  	return [...new Set(Array.from(document.body.querySelectorAll("*")).filter(x=>x.textContent.length/x.innerHTML.length>0.5).map(x=>(x.textContent.match(/\w+/g) || []).join(" ")).filter(t=>t.length>150).filter(a=>{len = a.length/a.split(" ").length; return len>3 && len<10}))].join("\n");
  })

  await page.evaluate(function() {
  	document.querySelectorAll("button[tabindex='0']")[2].click();
  });

  await page.waitFor(2500);

  await page.evaluate(function(content) {
  	document.querySelector(".doc").innerHTML=content;
  },content);

  await page.waitFor(1500);

  await page.evaluate(function() {
  	document.querySelectorAll("button[tabindex='0']")[9].click();
  });
    
  await page.waitFor(1500);
    
  await page.screenshot({path: 'ss.png'});
  var link = (await imgur.uploadFile('ss.png')).data.link;
  console.log(link);
  }
  catch (e) {
  console.log(e.message);
  await page.screenshot({path: 'ss.png'});
  var link = (await imgur.uploadFile('ss.png')).data.link;
  console.log(link);
  await google.screenshot({path: 'gss.png'});
  var glink = (await imgur.uploadFile('gss.png')).data.link;
  console.log(glink);
  }
  await browser.close();
})();

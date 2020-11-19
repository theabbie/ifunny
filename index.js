var axios = require("axios");
var fs = require("fs");
var fd = require("form-data");

headers = {
    'Host': 'api.ifunny.mobi',
    'accept': 'application/json',
    'applicationstate': '1',
    'authorization': 'Basic NjUzNjM0MzQ2MzM4MzI2MjJENjQ2NTY1NjMyRDM0MzAzMjM4MkQ2MTMxNjYzMzJEMzEzMzMxMzAzMzM0MzQzMzMzNjQ2MzM0X01zT0lKMzlRMjg6Y2Y2Njc5OTdiY2U5MTJhOTc1MDZhMmFlYjM0ZTI0MWI5NjZiNTdlZQ==',
    'accept-language': 'en-IN',
    'ifunny-project-id': 'iFunny',
    'content-type': 'application/x-www-form-urlencoded',
    'content-length': '72',
    'accept-encoding': 'application/json',
    'user-agent': 'iFunny/6.16.1(1119178) Android/10 (Xiaomi; Redmi Note 7 Pro; Xiaomi)'
};

module.exports = class Ifunny {
  constructor() {
    this.root = 'https://api.ifunny.mobi';
  }
  
  async login(email,password) {
    this.email = email;
    this.password = password;
    var auth = await axios({
      url: this.root+'/v4/oauth2/token',
      method: 'POST',
      headers: headers,
      data: 'grant_type=password&username='+encodeURIComponent(this.email)+'&password='+encodeURIComponent(this.password)
    });
    this.token = auth.data["access_token"]
    return this.token
  }

  addToken(token) {
    this.token = token;
  }

  async load(url,name) {  
    const writer = fs.createWriteStream(name);
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    response.data.pipe(writer)
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }

  async postimg(url,desc,tags) {
    await this.load(url,"meme.jpg");
    var data = new fd();
    data.append("type","pic");
    data.append("description",desc || "");
    data.append("tags",tags?JSON.stringify(tags):"[]");
    data.append("image", fs.createReadStream('meme.jpg'));
    var res = await axios({
      url: "https://api.ifunny.mobi/v4/content",
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.token,
	...data.getHeaders()
      },
      data: data
    });
    return res.data;
  }

  async postvid(url,desc,tags) {
    await this.load(url,"meme.mp4");
    var data = new fd();
    data.append("type","video_clip");
    data.append("description",desc || "");
    data.append("tags",tags?JSON.stringify(tags):"[]");
    data.append("video", fs.createReadStream('meme.jpg'));
    var res = await axios({
      url: "https://api.ifunny.mobi/v4/content",
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.token,
	...data.getHeaders()
      },
      data: data
    });
    return res.data;
  }
}

var axios = require("axios");

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
}

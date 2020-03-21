const nodemailer = require('nodemailer');
const fs = require("fs");
const colors = require('./colors.js');
const express = require('express');
const app = express();
const port = 3000;
var stringify = require('json-stringify-safe');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gpgcgt@gmail.com',
    pass: '326514789'
  }
});

// console.log(transporter);
// transporter.sendMail({
//   from: 'gpgcgt 1',
//   to: 'abdmyd@gmail.com',
//   subject: 'Sending Email using Node.js',
//   html: '<div style="color:#0099ff">your activation code is </div>'
// },(err,info)=>console.log(err?err:info));

// console.log("@[red]MyDABD".parse());
// console.log("@[blue]MyDABD".parse());
// console.log("@[bg-cyan]MyDABD".parse());
// console.log("@[fg-#ff9966]MyDABD".parse());
// console.log("@[bg-#ff9966]MyDABD".parse());
// console.log("@[black]@[bg-white]MyDABD".parse());
function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

//
// console.log(`@[blink]MyD`.parse());
// console.log(`@[reverse]MyD`.parse());
// console.log(`@[Underscore]MyD`.parse());
// console.log(`@[dim]MyD`.parse());
// console.log(`@[bright]MyD`.parse());
//
//
// console.log(`@[bold]MyD`.parse());
// console.log(`@[italic]MyD`.parse());
// console.log(`@[StrikeThrough]MyD`.parse());
//
// console.log(`@[framed]MyD`.parse());
// console.log(`@[Encircled]MyD`.parse());
//

var bodyParser = require('body-parser')
app.use( bodyParser.json() );

app.get('/',(req,res)=>{
  console.log(req.query);
  fs.readFile('form.html', (err, data)=>{
    if(err)console.log(`@[red]Err: ${err}`.parse());
    res.send(data.toString());
  });
});

app.get('/post',(req, res)=>{
  fs.readFile('emailContent.html', (err,data)=>{
    transporter.sendMail({
      from: req.query.from,
      to: req.query.to,
      subject: req.query.subject,
      html: data.toString().replace(/\$content/g, req.query.content).replace(/\$subject/g, req.query.subject)
  },(err,info)=>{
    console.log(
      err?err:`@[green]Message sent successfully to:`.parse() + `@[blue] ${info.accepted.join(" & ")}`.parse()+`@[green] in :`.parse() +`@[red] ${info.envelopeTime}ms`.parse());
  });

});

  res.send(`
    <center>
      <h1 style='color:#0000dd'>Message sent successfully!</h1>
      <a href="../">Home</a>
      </center>
    `);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

// fs.readFile('MyD.txt',(err,data)=>{
//   if(err)console.log(`@[red]${err}`.parse());
//   console.log(`@[fg-#0099ff]${data.toString().split("\n").map((a,i)=>(i%2==0?colors.FgGreen:colors.FgYellow)+a).join("\n")}`.parse());
// });
// fs.readFile('test.txt',(err,data)=>{
//   if(err)console.log(`@[red]${err}`.parse());
//   // console.log(`@[fg-#0099ff]${data.toString().split("\n").map((a,i)=>(i%2==0?colors.FgGreen:colors.FgYellow)+a).join("\n")}`.parse());
//   console.log(`@[fg-#0099ff]${data.toString().split("█").map((a,i)=>`@[fg-${hslToHex(map(i,0,data.toString().split("█").length,0,360),100,50)}]`+a).join("█")}`.parse());
// });

// fs.readFile('emailContent.html', (err,data)=>{
//   transporter.sendMail({
//     from: 'gpgcgt 1',
//     to: 'abdmyd@gmail.com',
//     subject: 'Sending Email using Node.js #Template',
//     html: data.toString(),
//     attachments: [{
//        filename: 'Logo.png',
//        path: __dirname +'/misc/Logo.png',
//        cid: 'logo' //my mistake was putting "cid:logo@cid" here!
//   }]
// },(err,info)=>console.log(err?err:`Message sent successfully to:`.green() + ` ${info.accepted.join(" & ")}`.blue()+` in :`.green() +` ${info.envelopeTime}ms`.red()));
//
// });
// transporter.sendMail({
//   from: 'gpgcgt 1',
//   to: 'abdmyd@gmail.com',
//   subject: 'Sending Email using Node.js #images',
//   html: '<p style="color:#0099ff">hello MyD! testing images</p><br><center><img src="cid:logo"></center>',
//   attachments: [{
//      filename: 'Logo.png',
//      path: __dirname +'/misc/Logo.png',
//      cid: 'logo' //my mistake was putting "cid:logo@cid" here!
// }]
// },(err,info)=>console.log(err?err:info));




// var mailOptions = {
//   from: 'gpgcgt@gmail.com',
//   to: 'abdmyd@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };
//
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

let colors = {
  Reset : "\x1b[0m",
  Bright : "\x1b[1m",
  Dim : "\x1b[2m",
  Underscore : "\x1b[4m",
  Bold : "\x1b[1m",
  StrikeThrough : "\x1b[9m",
  Italic : "\x1b[3m",
  Blink : "\x1b[5m",
  Reverse : "\x1b[7m",
  Hidden : "\x1b[8m",

  Framed : "\x1b[51m",
  Encircled : "\x1b[52m",

  FgBlack : "\x1b[30m",
  FgRed : "\x1b[31m",
  FgGreen : "\x1b[32m",
  FgYellow : "\x1b[33m",
  FgBlue : "\x1b[34m",
  FgMagenta : "\x1b[35m",
  FgCyan : "\x1b[36m",
  FgWhite : "\x1b[37m",

  BgBlack : "\x1b[40m",
  BgRed : "\x1b[41m",
  BgGreen : "\x1b[42m",
  BgYellow : "\x1b[43m",
  BgBlue : "\x1b[44m",
  BgMagenta : "\x1b[45m",
  BgCyan : "\x1b[46m",
  BgWhite : "\x1b[47m"
};


String.prototype.parse = function(){
  return this.replace(/@\[hidden\]/gi,colors.Hidden  )
  .replace(/@\[Reset\]/gi,colors.Reset  )
  .replace(/@\[bright\]/gi,colors.Bright  )
  .replace(/@\[dim\]/gi,colors.Dim  )
  .replace(/@\[Underscore\]/gi,colors.Underscore  )
  .replace(/@\[bold\]/gi,colors.Bold  )
  .replace(/@\[StrikeThrough\]/gi,colors.StrikeThrough  )
  .replace(/@\[italic\]/gi,colors.Italic  )
  .replace(/@\[Blink\]/gi,colors.Blink  )
  .replace(/@\[Reverse\]/gi,colors.Reverse  )
  .replace(/@\[framed\]/gi,colors.Framed  )
  .replace(/@\[Encircled\]/gi,colors.Encircled  )

  .replace(/@\[black\]/gi,colors.FgBlack  )
  .replace(/@\[red\]/gi,colors.FgRed  )
  .replace(/@\[green\]/gi,colors.FgGreen  )
  .replace(/@\[yellow\]/gi,colors.FgYellow  )
  .replace(/@\[blue\]/gi,colors.FgBlue )
  .replace(/@\[magenta\]/gi,colors.FgMagenta  )
  .replace(/@\[cyan\]/gi,colors.FgCyan )
  .replace(/@\[white\]/gi,colors.FgWhite  )

  .replace(/@\[bg-black\]/gi,colors.BgBlack  )
  .replace(/@\[bg-red\]/gi,colors.BgRed  )
  .replace(/@\[bg-green\]/gi,colors.BgGreen  )
  .replace(/@\[bg-yellow\]/gi,colors.BgYellow  )
  .replace(/@\[bg-blue\]/gi,colors.BgBlue  )
  .replace(/@\[bg-magenta\]/gi,colors.BgMagenta  )
  .replace(/@\[bg-cyan\]/gi,colors.BgCyan  )
  .replace(/@\[bg-white\]/gi,colors.BgWhite  )

  .replace(/@\[(f|b)g\-#(\w{6})\]/gi,(c, a,b)=>hex2code(b,a) )

  + colors.Reset;

}


function hex2code(hex, fb){
  if(hex[0] == "#")hex = hex.substr(1,hex.length);
  let red = parseInt(hex.substr(0, 2), 16);
  let green = parseInt(hex.substr(2, 2), 16);
  let blue = parseInt(hex.substr(4,2), 16);

  let fgColorString = `\x1b[38;2;${red};${green};${blue}m`;
  let bgColorString = `\x1b[48;2;${red};${green};${blue}m`;
  return ((fb.toUpperCase() == "B")?bgColorString:fgColorString);

}


module.exports = colors;

/*!
 * Sound of random JavaScript Library v1.0
 * https://github.com/jdoleczek/Sound-of-Random
 *
 * Copyright PROMYK Jan Doleczek
 * Released under the MIT license
 * https://raw.githubusercontent.com/jdoleczek/Sound-of-Random/master/LICENSE
 *
 * Date: 2016-05-03
 */

var SoR = (function(){
  function uStr(u)
  {
  	var s = '',
        n = 4;

  	while (!!n--)
    {
  		s += String.fromCharCode(u & 255);
  		u = u >> 8;
  	}

  	return s;
  }

  return {
    isPlaying: function()
    {
      return document.getElementById('SoR') !== null;
    },

    play: function(){
      var el = document.getElementById('SoR');

      if (el === null)
      {
          el = document.createElement('audio');
          el.id = 'SoR'
          document.getElementsByTagName('body')[0].appendChild(el);
      }

      var ref = 1382 * Math.exp([0, 2, 4, 5, 7, 9, 11, 12][~~(Math.random() * 7.99)] / 12 * Math.log(2)) / 22050,
          data = [],
          i = 0,
          amp = 0x3f;

      while (true)
      {
        data.push(String.fromCharCode(0x7f + Math.round(amp * Math.sin(ref * i))));

        if (i++ > 10000)
        {
          amp--;
        }

        if (amp < 1)
        {
          break;
        }
      }

      el.src = 'data:audio/wav;base64,' + btoa(([
        'RIFF',
        uStr(data.length + 36),
        'WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00\x44\xac\x00\x00\x44\xac\x00\x00\x01\x00\x08\x00data',
        uStr(data.length)
      ].concat(data)).join(''));

      el.onended = function(){
        SoR.play();
      };

      el.play();
    },

    stop: function(){
      var el = document.getElementById('SoR');

      if (el !== null)
      {
        document.getElementsByTagName('body')[0].removeChild(el);
      }
    }
  }
})();

import React from 'react';

//themes
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/liquibyte.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/night.css';
import 'codemirror/theme/oceanic-next.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/paraiso-dark.css';
import 'codemirror/theme/paraiso-light.css';
import 'codemirror/theme/pastel-on-dark.css';
import 'codemirror/theme/railscasts.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/seti.css';
import 'codemirror/theme/shadowfox.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/theme/vibrant-ink.css';
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/yeti.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/zenburn.css';


const styleOptions = ['3024-day','3024-night','abcdef','ambiance','base16-dark','base16-light','bespin',
  'blackboard','cobalt','colorforth','darcula','dracula','duotone-dark','duotone-light','eclipse','elegant',
  'erlang-dark','gruvbox-dark','hopscotch','icecoder','idea','isotope','lesser-dark','liquibyte','lucario',
  'material','mbo','mdn-like','midnight','monokai','neat','neo','night','oceanic-next','panda-syntax',
  'paraiso-dark','paraiso-light','pastel-on-dark','railscasts','rubyblue','seti','shadowfox','solarized dark',
  'solarized light','the-matrix','tomorrow-night-bright','tomorrow-night-eighties','ttcn','twilight','vibrant-ink',
  'xq-dark','xq-light','yeti','zenburn'];

function StyleList({ changeDisplayTheme }) {

  let styleElems = styleOptions.map((style) => {
    let styleSplit = style.split('');
    let propNoun = styleSplit[0].toUpperCase().concat(styleSplit.slice(1)).split(',');
    console.log(typeof propNoun);
    let capitalized = propNoun.join('');
    console.log(capitalized);

    return (<option key={style} className={`editor-style-${style} style-option`}>{capitalized}</option>);
  });

  return (
    <select className="theme-select" defaultValue='dracula' onChange={ changeDisplayTheme } id='theme-select'>
      {styleElems}
    </select>
  );
  
}

export default StyleList;
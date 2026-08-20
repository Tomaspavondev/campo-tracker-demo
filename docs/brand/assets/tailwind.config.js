// tailwind.config.js — AccesoTDF
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { azul:'#1735AC', celeste:'#179ED9', teal:'#16ADB0', tealPrint:'#159DAA', navy:'#071028' },
        bg:    { base:'#010B1A', sunken:'#040F22', surface:'#071028', elevated:'#0D1A33' },
        ink:   { 1:'#F2F5FA', 2:'#A8AEC0', 3:'#4A5266' },
        line:  { DEFAULT:'#17233C', strong:'#1B2942' },
        state: {
          done:'#2FBF71', doneBg:'#06231A',
          deviation:'#E8963A', deviationBg:'#251A0F',
          idle:'#7C8296', idleBg:'#141A26',
          reassigned:'#3B6BE0', reassignedBg:'#0A1836',
          alert:'#E4585B', alertBg:'#2A1116'
        }
      },
      fontFamily: {
        display: ['Archivo','sans-serif'],
        body: ['"Source Sans 3"','sans-serif'],
        mono: ['"IBM Plex Mono"','monospace']
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(100deg,#1735AC 0%,#179ED9 52%,#16ADB0 100%)'
      },
      borderRadius: { card:'12px', field:'10px', pill:'20px' }
    }
  }
};

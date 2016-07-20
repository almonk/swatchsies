webpackJsonp([2,0],{0:function(o,e,t){"use strict";function n(o){return o&&o.__esModule?o:{"default":o}}var s=t(47),a=n(s),i=t(98),l=n(i);new a["default"]({el:"body",components:{App:l["default"]}})},50:function(o,e,t){"use strict";function n(o){return o&&o.__esModule?o:{"default":o}}Object.defineProperty(e,"__esModule",{value:!0});var s=t(99),a=n(s);e["default"]={components:{Composer:a["default"]}}},51:function(o,e,t){"use strict";function n(o){return o&&o.__esModule?o:{"default":o}}Object.defineProperty(e,"__esModule",{value:!0});var s=t(52),a=n(s),i=t(66),l=n(i),r=t(62),c=n(r),d=t(47),p=n(d),u=t(59);e["default"]={data:function(){return{isChrome:!0,showModal:!1,colors:[{hex:"#F41C54"},{hex:"#FF8919"},{hex:"#FBDF06"},{hex:"#73BF12"},{hex:"#009AC7"}]}},created:function(){p["default"].filter("nameColor",function(o){var e=ntc.name(o);return e[1]}),window.chrome||this.$set("isChrome",!1)},methods:{download:function(){var o={name:"Swatchsi.es generated palette",modificationTime:Date.now()},e=new l["default"];e.file("metadata.json",(0,a["default"])(o)),e.file("README.md","Created with Swatchsi.es - http://swatchsi.es"),this.colors.forEach(function(o,t){var n=u(o.hex),s=ntc.name(o.hex),i=n[0]/255,l=n[1]/255,r=n[2]/255,c={color:{r:i,g:l,b:r,a:1},name:s[1],index:t};e.file("COLOR-"+t+".color/metadata.json",(0,a["default"])(c))}),e.generateAsync({type:"blob"}).then(function(o){saveAs(o,"swatchies.library.zip")}),this.$set("showModal",!0)},addColor:function(){this.colors.push({hex:"#ffffff",name:""}),p["default"].nextTick(function(){(0,c["default"])(".row input").last().select()})},removeColor:function(o){this.colors.splice(o,1)},closeModal:function(){this.$set("showModal",!1)}}}},58:function(o,e){},96:function(o,e){o.exports=" <div id=app> <composer></composer> </div> "},97:function(o,e){o.exports=' <div class=banner v-if=!isChrome>This tool has only been tested on Google Chrome and may not work in other browsers</div> <div class=page> <div class=intro> <p class=headline> Swatchsies let\'s you compose colour palettes for <a href=https://labs.invisionapp.com/craft>InVision\'s Craft</a> &mdash; quickly, simply and in the browser. </p> <p> Create your own below using hex codes&hellip; <template v-if="colors.length == 0"><span transition=expand>you\'ll need at least one color</span></template> </p> </div> <template v-for="(index, color) in colors"> <div class=row transition=expand> <div class=droplet v-bind:style="{ backgroundColor: color.hex }"></div> <input class=hex type=text limit=7 v-model=color.hex :value=color.hex> <label class=color-name>{{color.hex | nameColor}}</label> <button class=remove v-on:click=removeColor(index) tabindex=-1>Remove</button> </div> </template> <button class=add v-on:click=addColor>Add another</button> <button v-if="colors.length > 0" v-on:click=download class=download> Download </button> <div class=footer> <p> A thing by <a href=http://alasdairmonk.com>Alasdair Monk</a> </p> </div> <div class=modal-bg v-if=showModal transition=pop v-on:click=closeModal> <div class="modal intro"> <img src=/static/images/download-img.png width=265 height=274 style=margin-bottom:20px> <p class=headline>Your Craft library is downloading</p> <p>Unzip the file, put it somewhere safe<br> and then import it into Craft</p> <button class=woop v-on:click=closeModal>Woop</button> </div> </div> </div> '},98:function(o,e,t){var n,s;n=t(50),s=t(96),o.exports=n||{},o.exports.__esModule&&(o.exports=o.exports["default"]),s&&(("function"==typeof o.exports?o.exports.options||(o.exports.options={}):o.exports).template=s)},99:function(o,e,t){var n,s;t(58),n=t(51),s=t(97),o.exports=n||{},o.exports.__esModule&&(o.exports=o.exports["default"]),s&&(("function"==typeof o.exports?o.exports.options||(o.exports.options={}):o.exports).template=s)},102:function(o,e){},103:function(o,e){}});
//# sourceMappingURL=app.629a070c17dc48771207.js.map
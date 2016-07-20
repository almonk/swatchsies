<template>
  <div class="banner" v-if="!isChrome">This tool has only been tested on Google Chrome and may not work in other browsers</div>
  <div class="page">
    <div class="intro">
      <p class="headline">
        Swatchsies let's you compose colour palettes for <a href="https://labs.invisionapp.com/craft">InVision's Craft</a> &mdash; quickly, simply and in the browser.
      </p>
      <p>
        Create your own below using hex codes&hellip;
        <template v-if="colors.length == 0"><span transition="expand">you'll need at least one color</span></template>
      </p>
    </div>

    <template v-for="(index, color) in colors">
      <div class="row" transition="expand">
        <div class="droplet" v-bind:style="{ backgroundColor: color.hex }"></div>
        <input class="hex" type="text" limit="7" v-model="color.hex" :value="color.hex">
        <label class="color-name">{{color.hex | nameColor}}</label>
        <button class="remove" v-on:click="removeColor(index)" tabindex="-1">Remove</button>
      </div>
    </template>

    <button class="add" v-on:click="addColor">Add another</button>

    <button v-if="colors.length > 0" v-on:click="download" class="download">
      Download
    </button>
    <button v-if="colors.length > 0" v-on:click="savePalette" class="share">
      Share
    </button>



    <div class="footer">
      <p>
        A thing by <a href="http://alasdairmonk.com">Alasdair Monk</a>
      </p>
    </div>

    <div class="modal-bg" v-if="showModal" transition="pop" v-on:click="closeModal">
      <div class="modal intro">
        <img src="/static/images/download-img.png" width="265" height="274" style="margin-left: auto; margin-right: auto; margin-bottom:20px;">
        <p class="headline">Your Craft library is downloading</p>
        <p>Unzip the file, put it somewhere safe<br> and then import it into Craft</p>
        <button class="woop" v-on:click="closeModal">Woop</button>
      </div>
    </div>

    <div class="modal-bg" v-if="showShare" transition="pop">
      <div class="modal intro">
        <p class="headline">Share the link below</p>
        <p>Anyone with the link will be able to<br>download and view your palette</p>
        <input type="" v-model="shareUrl" disabled>
        <button class="woop" v-on:click="closeModal">Got it!</button>
      </div>
    </div>
  </div>
</template>

<script>
import JSZip from 'jszip'
import $ from "jquery" 
import Vue from 'vue'

var hexRgb = require('hex-rgb');

export default {
  data: function() {
    return {
      isChrome: true,
      showModal: false,
      showShare: false,
      shareUrl: "",
      colors: [
        {
          hex: '#F41C54',
        },
        {
          hex: '#FF8919',
        },
        {
          hex: '#FBDF06',
        },
        {
          hex: '#73BF12',
        },
        {
          hex: '#009AC7',
        }
      ],
    }
  },

  created: function() {
    Parse.initialize("swatchsies");
    Parse.serverURL = 'http://swatchsies-api.herokuapp.com/parse';

    Vue.filter('nameColor', function (value) {
      var n_match  = ntc.name(value);
      return n_match[1]; 
    })

    if (!window.chrome) {
      this.$set('isChrome', false)
    }
  },

  route: {
    data() {
      if (this.$route.params.id != null) {
        console.log(this.$route.params)

        var ColorPalette = Parse.Object.extend("ColorPalette");
        var query = new Parse.Query(ColorPalette);
        query.equalTo("objectId", this.$route.params.id);
        query.first({
          success: function(object) {
            this.$set('colors', JSON.parse(object.get('colors')))
          }.bind(this),
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
      }
    }
  },

  methods: {
    download: function() {
      var metadata = {
        "name" : "Swatchsi.es generated palette",
        "modificationTime": Date.now()
      }

      var zip = new JSZip();
      zip.file("metadata.json", JSON.stringify(metadata));
      zip.file("README.md", "Created with Swatchsi.es - http://swatchsi.es");

      this.colors.forEach( function(element, index) {
        var hexAsArray = hexRgb(element.hex)
        var n_match  = ntc.name(element.hex);
        var red = hexAsArray[0] / 255
        var green = hexAsArray[1] / 255
        var blue = hexAsArray[2] / 255

        var colorMetadata = {
          "color": {
            "r": red,
            "g": green,
            "b": blue,
            "a": 1
          },
          "name": n_match[1],
          "index": index
        }

        zip.file(`COLOR-${index}.color/metadata.json`, JSON.stringify(colorMetadata));
      });


      zip.generateAsync({type:"blob"}).then(function (blob) {
        saveAs(blob, "swatchies.library.zip");
      });

      this.$set('showModal', true)
    },

    addColor: function() {
      this.colors.push({hex: '#ffffff', name: ''})
      
      Vue.nextTick(function () {
        $('.row input').last().select()
      })
    },

    removeColor: function(index) {
      this.colors.splice(index, 1)
    },

    closeModal: function() {
      this.$set('showModal', false)
      this.$set('showShare', false)
    },

    savePalette: function() {
      this.$set('showShare', true)
      console.log('Click')
      console.log(JSON.stringify(this.colors))

      var ColorPalette = Parse.Object.extend("ColorPalette");
      var c = new ColorPalette();
      c.save({colors: JSON.stringify(this.colors)}).then(function(object) {
        console.log(object.id)
        this.$set('shareUrl', `http://swatchsi.es/p/${object.id}`)
      }.bind(this));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #303E4D;
}

::selection {
  background: #0F73EE;
  color: white;
}

.page {
  padding-top: 80px;
}

.banner {
  background-color: #222C36;
  text-align: center;
  left: 0;
  right: 0;
  padding: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.2;
  color: #ACB1B7;
}

.intro {
  padding-bottom: 40px;
}

.footer {
  margin-top: 40px;
  padding-bottom: 40px;
}

.intro p.headline {
  color: #f1f1f1;
  font-size: 18px;
  width: 90%;
  margin-bottom: 10px;
  line-height: 24px;
}

.intro p,
.footer p {
  font-size: 15px;
  color: #ACB1B7;
  line-height: 21px;
}

.intro p a,
.footer p a {
  color: #ACB1B7;
  text-decoration: none;
  border-bottom: 1px solid #ACB1B7;
}

.intro p.headline a {
  color: #fff;
  border-color: #fff;
}

.page {
  max-width: 520px;
  margin: 0 auto;
}

.row {
  display: flex;
  position: relative;
}

.droplet {
  height: 38px;
  width: 38px;
  margin-right: 10px;
  border-radius: 50%;
  border: 4px solid white;
  background-color: white;
  transition: background 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.hex {
  flex: 1;
  margin-right: 10px;
  z-index: 10;
}

.color-name {
  position: absolute;
  color: white;
  right: 75px;
  top: 15px;
  font-size: 15px;
  opacity: 0.8;
  z-index: 9;
}

.row input {
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  border-radius: 50px;
  border: 0px solid;
  color: white;
  transition: all 200ms cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: rgba(0,0,0,0.3);
  padding-left: 20px;
  text-transform: uppercase;
}

.modal input {
  font-size: 16px;
  border-radius: 50px;
  border: 0px solid;
  color: white;
  margin-top: 20px;
  transition: all 200ms cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: rgba(0,0,0,0.3);
  padding: 15px 20px;
  outline: none;
  flex: 1;
}

.row input:focus {
  background-color: white;
  border: 0px;
  color: black;
  outline: none;
}

.expand-transition {
  transition: all 200ms cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 1;
  height: 46px;
  padding-bottom: 20px;
}

.expand-enter, .expand-leave {
  opacity: 0;
  padding-bottom: 0;
  height: 0;
}

.pop-transition {
  transition: all 200ms cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 1;
  transform: scale(1);
}

.pop-enter, .pop-leave {
  opacity: 0;
  transform: scale(0.9);
}

.add {
  width: 46px;
  height: 46px;
  opacity: 1;
  border: 0;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  text-indent: -999px;
  background-color: transparent;
  background-image: url('/static/images/add.svg');
  background-position: center center;
  background-repeat: no-repeat;
  outline: none;
  cursor: pointer;
}

.download,
.share,
.woop {
  border: 4px solid #0F73EE;
  background-color: transparent;
  border-radius: 50px;
  height: 46px;
  float: right;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0px 30px;
  color: #0F73EE;
  line-height: 36px;
  cursor: pointer;
}

.share {
  float: right;
  margin-right: 10px;
}

.woop {
  float: none;
  margin-top: 20px;
  flex: 1;
}

.remove {
  width: 46px;
  height: 46px;
  opacity: 0.4;
  border: 0;
  border-radius: 50%;
  overflow: hidden;
  text-indent: -999px;
  background-color: transparent;
  background-image: url('/static/images/remove.svg');
  background-position: center center;
  background-repeat: no-repeat;
  outline: none;
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.modal-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #303E4D;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #1F2A33;
  width: 380px;
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  color: white;
  border-radius: 20px;
  box-shadow: 0px 5px 16px rgba(0,0,0,0.1);
}

.modal p.headline {
  width: 100%;
}

</style>

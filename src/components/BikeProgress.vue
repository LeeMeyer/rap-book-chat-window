<template>
<div>    
    <progress-bar style="position: absolute; left: calc(50vw - 70px); bottom:15px; z-index: 1; margin-left: 10px;" :options="options" :value="progress"/>    
    <div class="r_flex_container">        
            <div style="display: flex; flex-flow: row; align-self:center;">
                <transition enter-active-class="animate__animated animate__fadeInDownBig"
                leave-active-class="animate__animated animate__lightSpeedOutLeft">
                    <h1 v-if="showNextScreen && !smile" style="margin-top: 50%; margin-bottom: 30px;">Choose a framework</h1>
                </transition>
            </div>            
            <div style="display: flex; flex-flow: row; align-self:center;">
                <transition enter-active-class="animate__animated animate__rollIn" leave-active-class="animate__animated animate__lightSpeedOutLeft" @after-enter="showCircle2 = true">
                    <img style="align-self: center; margin: 10px; border-radius: 50%; margin-right: 50px; background: #fff; cursor: pointer; border: 1px solid;" width="200" height="200" v-if="showNextScreen && !smile" :src="dantoon" v-popover:foo.right  @mouseover="hoverCircle1 = true"/>
                </transition>
                <transition enter-active-class="animate__animated animate__rollIn animate__delay-half-s" leave-active-class="animate__animated animate__lightSpeedOutLeft" @after-leave="showFirstCodeSample = true">
                    <img style="align-self: center; margin: 10px; border-radius: 50%; background: #fff; cursor: pointer; border: 1px solid;" width="200" height="200" v-if="showNextScreen && !smile" :src="stoon"  v-popover:foo.right  @mouseover="hoverCircle2 = true"/>
                </transition>                
            <div style="display: flex; flex-flow: row; align-self:center; justify-content: center;">
                <transition enter-active-class="animate__animated animate__animated animate__lightSpeedInRight" leave-active-class="animate__animated animate__lightSpeedOutLeft" @after-enter="nextIsCli = true" @after-leave="showCli = true" >
                    <div v-if="showFirstCodeSample && !showingCli" style="padding-left: 10px;">
                        <pre v-html="firstCodeSample"></pre>  
                    </div>
                </transition>
                <transition enter-active-class="animate__animated animate__animated animate__lightSpeedInRight" leave-active-class="animate__animated animate__lightSpeedOutLeft" @after-leave="showSecondCodeSample = true" @after-enter="showWow = true">
                    <img v-if="showCli && !showingSecondCodeSample" :src="cliScreenshot"/>
                </transition>
                <transition enter-active-class="animate__animated animate__animated animate__lightSpeedInRight" 
                  leave-active-class="animate__animated animate__lightSpeedOutLeft" 
                  @after-leave="showThirdCodeSample = true">
                    <div style="height: 70vh; width: 90vw; overflow: scroll; background: white; padding-left: 10px;" v-if="showSecondCodeSample && !showingThirdCodeSample">
                        <pre v-html="secondCodeSample"></pre>  
                    </div>
                </transition>

                <transition enter-active-class="animate__animated animate__animated animate__lightSpeedInRight" leave-active-class="animate__animated animate__lightSpeedOutLeft" @after-leave="gameovercomplete = true">
                    <div v-if="(showThirdCodeSample || showForthCodeSample) && !isgameover" style="width: 90vw;  background: white; max-height: 85vh;">
                        <pre><TransitionedWords :transitionedHtml="showThirdCodeSample ? forthCodeSample : thirdCodeSample" :allowHtml="true" /></pre>
                    </div>
                </transition>

                <transition enter-active-class="animate__animated animate__animated animate__lightSpeedInRight" leave-active-class="animate__animated animate__lightSpeedOutLeft">
                    <div v-if="gameovercomplete" style="width: 90vw; max-height: 85vh; display: flex; align-content: center; justify-content: center; padding-top: 10px;">
                        <img :src="gameover" style="align-self: center;"/>
                    </div>
                </transition>

                
            </div>   
                <popover name="foo" event="hover">
                    <div style="font-family: 'Rock Salt', cursive; font-size: 38px; padding: 10px; display: flex; justify-content: center; align-content: center;">
                        <div>React!</div>
                    </div>
                </popover>
                <div>
                </div>
            </div>         
            <div style="display: flex; flex-flow: row; align-self:center; z-index: 1;">
                <transition leave-active-class="animate__animated animate__lightSpeedOutLeft">
                    <m-button 
                        v-if="hoverCircle1 && hoverCircle2 && !isgameover"
                        class="emoji-button"
                        @click="clickEmoji()"
                        style="--mdc-theme-primary: #fff;" 
                        ref="test"
                        :style="getStyle()"
                        unelevated 
                       ><span slot="icon" class="emoji" :class="{ cry: !smile, smile: smile || nextIsCli, wow: showWow, bigSmile: showBigSmile }" />
                        <span v-if="!smile">FML</span>
                        <span style="white-space: nowrap;" v-if="nextIsCli && !showCli">CLI<div style="display: inline-block;" class="animate__animated animate__heartBeat animate__infinite animate__slower">➜</div></span>
                        <span style="white-space: nowrap;" v-if="showCli && !showSecondCodeSample">SFC<div style="display: inline-block;" class="animate__animated animate__heartBeat animate__infinite animate__slower">➜</div></span>
                        <span style="white-space: nowrap;" v-if="showSecondCodeSample && !showThirdCodeSample && progress < 87.5">NEXT <div style="display: inline-block;" class="animate__animated animate__heartBeat animate__infinite animate__slower">➜</div></span> 
                        <span style="white-space: nowrap;" v-if="showSecondCodeSample && !showThirdCodeSample && progress >= 87.5">DEPLOY <div style="display: inline-block;" class="animate__animated animate__heartBeat animate__infinite animate__slower">➜</div></span> 
                        <span style="white-space: nowrap;" v-if="showThirdCodeSample && progress < 100">MIGRATE <div style="display: inline-block;" class="animate__animated animate__heartBeat animate__infinite animate__slower">🛠️</div></span>
                        <span v-if="smile && !nextIsCli">VUE!</span>
                    </m-button>
                </transition>
            </div>
                <div class="welcome-container">
                    <transition 
                      appear
                      enter-active-class="flags"
                      leave-active-class="flags-exit"
                      @after-enter="showParagraph1 = true"
                      @before-leave="showButton = false"
                      @after-leave="showNextScreen = true"
                    >
                        <div v-if="showFlags" class="welcome" :style="{ backgroundImage: `url(${flags})`}">
                                <div>
                                    <transition 
                                       appear 
                                       enter-active-class="animate__animated animate__zoomIn"
                                       leave-active-class="animate__animated animate__zoomOut animate__faster"
                                       @before-leave="showFlags = false">
                                        <div v-if="showTitle" class="welcome-text">Vue this!</div>
                                    </transition>
                                </div>    
                        </div>
                    </transition>
                </div>
            <div class="r_flex_expand_child">
                <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut animate__faster" @after-enter="showParagraph2 = true" @after-leave="showTitle = false">
                    <p v-if="showParagraph1">Congrats on overengineering your onboarding with React!</p>
                </transition>
                <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut animate__faster" @after-enter="showButton = true" @after-leave="showParagraph1 = false">
                    <p v-if="showParagraph2">Would you like to make life easier for yourself?</p>
                </transition>
                <br>
                <transition enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__bounceOutUp">
                    <m-button ref="button" v-if="showButton"
                        :class="{ 'has-error': showError, spinning: showingNextScreen }"
                        :style="getSpinnerStyle()" 
                        unelevated 
                        @click="onclick()" >
                            <iframe id="buttonIcon" ref="buttonIcon" slot="icon" :src="thumbsup"/>
                            <span v-if="!showError && !showingNextScreen" > 
                                Let's do it!
                            </span>
                            <span v-if="showError && showParagraph2">
                                <span>Go back to 2018</span>
                            </span>                                                               
                    </m-button>
                </transition>
                <transition name="errorMessage"
                      enter-active-class="animate__animated animate__flipInY"
                      leave-active-class="animate__animated  animate__flipOutY animate__faster"
                      @after-leave="showParagraph2 = false">
                    <p v-if="showError" class="error">You use too many frameworks on your site already!</p>
                </transition>                                   
            </div>
        <div class="r_flex_fixed_child">
            <div class="grass">
 
                <div style="position: absolute; bottom: -45px;"></div>
                <div class="biker" :style=" { background: `transparent url(${biker}) 0 0`, ...bikerStyle }">
                </div>
                <div style="position: absolute; bottom: -45px">
             
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>


import "material-components-vue/dist/card/card.min.css";
import card from "material-components-vue/dist/card";
import "material-components-vue/dist/button/button.min.css";
import button from "material-components-vue/dist/button";
import "material-components-vue/dist/icon-button/icon-button.min.css";
import iconbutton from "material-components-vue/dist/icon-button";
import Vue from 'vue';
import fab from 'material-components-vue/dist/fab';
import "material-components-vue/dist/fab/fab.min.css";
import flags from '../assets/Vue_js_flags.png'
import thumbsup from '../assets/thumbsup.svg';
import dantoon from '../assets/dan toon.gif';
import stoon from '../assets/stoon.png';
import Popover from 'vue-js-popover';
import Prism from 'prismjs';
import cliScreenshot from "../assets/cli-select-features.png"
import TransitionedWords from './TransitionedWords'
import ProgressBar from 'vuejs-progress-bar';
import biker from "../assets/biker.png";
import gameover from '../assets/s-l300.jpg';

const c = require('./sample1')
const c2 = require('./sample2')
const c3 = require('./sample3')

Vue.use(Popover, { tooltip: true })
Vue.use(iconbutton);
Vue.use(button);
Vue.use(card);
Vue.use(fab);
Vue.use(ProgressBar);

let code2 = c.code;
let code3 = c2.code;

export default{
  name: 'BikeProgress',
   components: {
    TransitionedWords
  },
  data() {
      return  {
          flags,
          hideProceedButton: true,
          thumbsup,
          firstButtonClicks: 0,
          allowTimeTravel: false,
          message: 'let\'s do it!',
          showTitle: true,
          showFlags: true,
          showParagraph1: false,
          showParagraph2: false,
          showButton: false,
          showError: false,
          showingNextScreen: false,
          showNextScreen: false,
          dantoon,
          stoon,
          showCircle2: false, 
          hoverCircle1: false,
          hoverCircle2: false,
          smile: false,
          showFirstCodeSample: false,
          showingCli: false,
          showCli: false, 
          firstCodeSample: Prism.highlight(code2, Prism.languages.html, 'html'),
          nextIsCli: false,
          cliScreenshot,
          showWow: false,
          secondCodeSample: Prism.highlight(code3, Prism.languages.html, 'html'),
          showingSecondCodeSample: false,
          showSecondCodeSample: false,
          showBigSmile: false,
          showingThirdCodeSample: false,
          showThirdCodeSample: false,
          thirdCodeSample: Prism.highlight(c3.code1.replaceAll("=>", "=˃"), Prism.languages.javascript, 'javascript'),
          forthCodeSample: Prism.highlight(c3.code2.replaceAll("=>", "=˃"), Prism.languages.javascript, 'javascript'),
          showForthCodeSample: false,
          progress: 0,
          biker,
          gameover,
          isgameover: false,
          gameovercomplete: false,
          bikerStyle: {},
          options: {
  text: {
    color: '#FFFFFF',
    shadowEnable: true,
    shadowColor: '#000000',
    fontSize: 14,
    fontFamily: 'Helvetica',
    dynamicPosition: false,
    hideText: false
  },
  progress: {
    color: '#2dbd2d',
    backgroundColor: '#333333'
  },
  layout: {
    height: 35,
    width: '100%',
    verticalTextAlign: 61,
    horizontalTextAlign: 43,
    zeroOffset: 0,
    strokeWidth: 30,
    progressPadding: 0,
    type: 'line'
  }
}
      };
  },  
  methods: {
    onclick() {
        if (!this.showError) {
            this.showError = true;
            this.$refs.buttonIcon.contentDocument.querySelector('svg').dispatchEvent(new Event('click'));
        }
        else if (!this.showinNextScreen) {
            this.showError = false;
            this.showingNextScreen = true;
        }
        else if (!this.showingSecondCodeSample) {
            this.showingSecondCodeSample = true;
        }

        this.updateProgress();
    },
    getSpinnerStyle() {
        if (!this.showParagraph2) {
            let r = this.$refs.button.$el.getBoundingClientRect();
            return { position:  'absolute', bottom: r.bottom + 'px', top: r.top + 'px', right: r.right + 'px', left: r.left + 'px' }; 
        }

        return {};
    },
    getStyle() {
        if (((this.smile && !this.showFirstCodeSample) || this.showingCli || this.showingSecondCodeSample)) {
            let r = this.$refs.test.$el.getBoundingClientRect();
            var s = { position:  'absolute', bottom: r.bottom + 'px', top: r.top + 'px', right: r.right + 'px', left: r.left + 'px' };
            
            if (this.showThirdCodeSample) {
                s.width = '180px';
            }
            else if (this.showSecondCodeSample) 
            {
                s.width = '150px';
            }

            if (this.progress >= 87.5) {
                s.width = "180px";
            }

            return s;
        }
        
        if (this.showThirdCodeSample) {
                s.width = '180px';
        }
        else if (this.showSecondCodeSample) 
        {
            return { width: '150px' };
        }

        return {};
    },
    clickEmoji() {
        if (this.nextIsCli)
            this.showingCli = true;
        else if (!this.smile)
            this.smile = true;
        
        if (!this.showingSecondCodeSample && this.showCli)
            this.showingSecondCodeSample = true;

            
        if (this.showSecondCodeSample && !this.showingThirdCodeSample) {
            this.showingThirdCodeSample = true;
        }

        if (this.showThirdCodeSample) {
            this.showThirdCodeSample = false;
            this.showForthCodeSample = true;
        }

        this.updateProgress();
    },
    updateProgress() {
        if (this.progress < 100)
        {
            this.progress += 12.5;

            this.bikerStyle = { 'animation-play-state': 'running' };
            setTimeout(() => this.bikerStyle = { 'animation-play-state': 'paused' }, 600);
        }
        else {
            
            this.isgameover = true;
        }
    }
  } 
}
</script>

<style scoped lang="scss">

.welcome-container {

    display: flex; 
    justify-content: center; 
    width: 100vw;

    .welcome {
        width: 500px; 
        height: 200px; 
        display: flex; 
        justify-content: center; 
        background-size: contain; 
        background-repeat: no-repeat;

        div {
            max-width: 250px;
        }
    }
}

.error { 
    color: red;
}

button {  
   transition: background-color 1s;
   --mdc-theme-primary: #42b883;
   height: 45px;

   #buttonIcon {
       width: 50px; 
       height: 50px; 
       border: none;
   }

   &.has-error {
       --mdc-theme-primary: #EE4C4C;  
   }

   &.spinning {
        --mdc-theme-primary: #bdbdbd;  

       #buttonIcon {
            animation: antiClockwiseSpin .5s infinite linear;
            margin-right: -4px;
       }
   }
}

.biker {
  animation: ride 4.9s steps(43) 1 forwards; 
  animation-play-state: paused;
  background-position: 0 0;
  width: 506px;
  height: 417px;
  position: relative;
  top: -370px;
}

@keyframes ride {

  85% {
      margin-left: 70vw;
  }
  100%  
  {
      margin-left: 70vw; 
      background-position: 0 -18705px; 
  }
}

.flags {
    background-position-y: -182px;
    animation: flags-entrance 1s 1 forwards;
}

.flags-exit {
    animation: flags-exit 1s 1 forwards;
}

@keyframes flags-entrance {
  100%  { background-position-y: 0; }
}

@keyframes flags-exit {
   100% { background-position-y: -185px; } 
}

.r_flex_container{
    display: flex;
    flex-direction: column;
    margin: 0;
    background:  lightblue;
}

.r_flex_container {
    height: 95vh;
	display:flex;
	flex-flow: column nowrap;
}

.r_flex_fixed_child {
	flex:none;
	color:white;
    border-bottom: solid 40px black;
}

.r_flex_expand_child {
  flex:auto;
  font-size: 20px;
  text-align: center;
}

.grass {
  background: lightgreen; 
  height:40px;
  font-size: 50px;
}

.welcome-text {
    margin-top: 30px;
    font-family: 'Rock Salt', cursive;
    font-size: 40px;
}


@keyframes antiClockwiseSpin {
	0%  {transform: rotate(360deg);}
	100% {transform: rotate(0deg);}	
}

.emoji {
    background: transparent url(https://user-images.githubusercontent.com/18104679/100203760-1f605800-2f57-11eb-839b-a39800cecdd9.gif) 0 -1250px no-repeat;
    height: 50px;
    width: 50px;
    animation-delay: .5s;
}

.emoji.cry {
    animation: cry-emoji .2s steps(2) forwards;
}

.emoji.smile {
   animation: smile-emoji .3s steps(3) forwards;
}

.emoji.wow {
   background-position: 0 0;
   animation: wow-emoji 1s steps(10) forwards;
}

.emoji.bigSmile {
   background-position: 0 -500px;
   animation: big-smile 1s steps(3) forwards;
}

@keyframes big-smile {
  0%  { background-position: 0 -500px; }
  100%  { background-position: 0 -800px; }
}

@keyframes wow-emoji {
  0%  { background-position: 0 0; }
  100%  { background-position: 0 -500px; }
}

@keyframes cry-emoji {
  0%  { background-position: 0 -1250px; }
  100%  { background-position: 0 -1350px; }
}

@keyframes smile-emoji {
  0%  { background-position: 0 -1350px; }
  96%  { background-position: 0 -1500px; }
  100%  { background-position: 0 0; }
}

body {
  background-color: lightblue;
}

.emoji-button {
    height: 80px;
    color: #2c3e50;
    width: 130px;
    border: 1px solid;
    border-color: black;
}

.emoji {
    margin: 0;
    padding: 0;
    width:100px;
}

.animate__delay-half-s {
    animation-delay: 0.5s;
}
</style>
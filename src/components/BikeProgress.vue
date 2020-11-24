<template>
<div>
    <div class="r_flex_container">        
                <div class="welcome-container">
                    <transition 
                      appear
                      enter-active-class="flags"
                      leave-active-class="flags-exit"
                      @after-enter="showParagraph1 = true"
                    >
                        <div v-if="showFlags" class="welcome" :style="{ backgroundImage: `url(${flags})`}">
                                <div>
                                    <transition 
                                       appear 
                                       enter-active-class="animate__animated animate__zoomIn"
                                       leave-active-class="animate__animated animate__zoomOut"
                                       @before-leave="showFlags = false">
                                        <div v-if="showTitle" class="welcome-text">Vue this!</div>
                                    </transition>
                                </div>    
                        </div>
                    </transition>
                </div>
            <div class="r_flex_expand_child">
                <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" @after-enter="showParagraph2 = true" @after-leave="showTitle = false">
                    <p v-if="showParagraph1">Congrats on overengineering your onboarding with React!</p>
                </transition>
                <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" @after-enter="showButton = true" @after-leave="showParagraph1 = false">
                    <p v-if="showParagraph2">Would you like to make life easier for yourself?</p>
                </transition>
                <br>
                <transition enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__animated animate__zoomOut">
                    <m-button ref="button" v-if="showButton"
                        :class="{ 'has-error': showError, spinning: showNextScreen }"
                        :style="getSpinnerStyle()" 
                        unelevated 
                        @click="onclick()" >
                            <iframe id="buttonIcon" ref="buttonIcon" slot="icon" :src="thumbsup"/>
                            <span v-if="!showError && !showNextScreen" > 
                                Let's do it!
                            </span>
                            <span v-if="showError && showParagraph2">
                                <span>Go back to 2018</span>
                            </span>                                                               
                    </m-button>
                </transition>
                <transition name="errorMessage"
                      enter-active-class="animate__animated animate__flipInY"
                      leave-active-class="animate__animated  animate__flipOutY"
                      @after-leave="showParagraph2 = false">
                    <p v-if="showError" class="error">You use too many frameworks on your site already!</p>
                </transition>                                   
            </div>
        <div class="r_flex_fixed_child">
            <div class="grass">
                <div style="position: absolute; bottom: -45px;"></div>
                <div class="biker"></div>
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


Vue.use(iconbutton);
Vue.use(button);
Vue.use(card);
Vue.use(fab);

export default{
  name: 'BikeProgress',
   components: {
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
          showNextScreen: false
      };
  },  
  methods: {
    onclick() {
        if (!this.showError) {
            this.showError = true;
            this.$refs.buttonIcon.contentDocument.querySelector('svg').dispatchEvent(new Event('click'));
        }
        else {
            this.showError = false;
            this.showNextScreen = true;
        }
    },
    getSpinnerStyle() {
        if (!this.showParagraph2) {
            let r = this.$refs.button.$el.getBoundingClientRect();
            return { position:  'absolute', bottom: r.bottom + 'px', top: r.top + 'px', right: r.right + 'px', left: r.left + 'px' }; 
        }

        return {};
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
            animation: antiClockwiseSpin 1s infinite linear;
            margin-right: -4px;
       }
   }
}

.sun {
 /* display: inline-block;*/
}

.biker {
  background: transparent url('https://user-images.githubusercontent.com/18104679/99868859-7a721200-2c1a-11eb-8f2d-b9dce937ee9a.png') 0 0;
  animation: ride 5s steps(43) 1 forwards; 
  background-position: 0 0;
  width: 506px;
  height: 417px;
  position: relative;
  top: -370px;
}

@keyframes ride {
  100%  { background-position: 0 -18705px; }
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

</style>
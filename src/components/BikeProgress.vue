<template>
<div>
    <div class="r_flex_container">            
            <div style="display: flex; justify-content: center; width: 100vw;">
            <div :class="{ flags: !firstButtonClicks, 'flags-exit': firstButtonClicks > 1 }" :style="{ backgroundImage: `url(${flags})`, width: '500px', height: '200px', display: 'flex', justifyContent: 'center',  backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}">
                    <div style="max-width: 250px;">
                        <div class="stuff animate__animated" :style="{ 'animation-delay': !firstButtonClicks ? '0s' : '1.5s' }"  :class="{ animate__zoomIn: !firstButtonClicks, animate__zoomOut: firstButtonClicks > 1 }">Vue this!</div>
                    </div>    
            </div>
            </div>
            <div class="r_flex_expand_child">
                <p class="animate__animated animate__fadeIn" :class="firstButtonClicks > 1 ? 'animate__fadeOut' : ''" style="animation-delay: 0.5s;">Congrats on overengineering your onboarding with React!</p>
                <p class="animate__animated animate__fadeIn" :class="firstButtonClicks > 1 ? 'animate__fadeOut' : ''" :style="{ 'animation-delay': !firstButtonClicks ? '1s' : '0s' }" @animationend="hideProceedButton = false">Would you like to make life easier for yourself?</p>
                <br>
                <div class="animate__animated">
                        <m-button 
                            :class="{ 'has-error': firstButtonClicks == 1, animate__zoomIn: !firstButtonClicks, spinning: firstButtonClicks > 1 }" 
                            class="animate__animated" 
                            :style="{ 'animation-delay': firstButtonClicks ? '0s' : '1.5s' }" 
                            unelevated 
                            @click="onclick()" >
                                <iframe id="buttonIcon" ref="buttonIcon" slot="icon" style="width: 50px; height: 50px; border: none;" :src="thumbsup"/>
                                <span v-if="firstButtonClicks == 1">
                                    <span>Go back to 2018</span>
                                </span> 
                                <span v-if="!firstButtonClicks">{{message}}</span>                                                               
                        </m-button>
                </div>
                <transition name="errorMessage"
                      enter-active-class="animate__animated animate__flipInY"
                      leave-active-class="animate__animated  animate__flipOutY">
                    <p v-if="firstButtonClicks == 1" style="color: red;">You use too many frameworks on your site already!</p>
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
          message: 'let\'s do it!'
      };
  },
  methods: {
      onclick() {
          this.firstButtonClicks++;
      }
  },
  watch: {
    firstButtonClicks(newValue, oldValue) {
        if ((!oldValue && newValue) || (!newValue && oldValue))
        {
            this.$refs.buttonIcon.contentDocument.querySelector('svg').dispatchEvent(new Event('click'))
        }

        if (newValue == 1) {
            this.message = `go back to 2018`;            
        }
    }
  } 
}
</script>

<style scoped lang="scss">
button { 
 
   transition: background-color 1s;


   --mdc-theme-primary: #42b883;
   height: 45px;

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
   100% { background-position-y: -182px; } 
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

.stuff {
    margin-top: 30px;
    font-family: 'Rock Salt', cursive;
    font-size: 40px;
}


@keyframes antiClockwiseSpin {
	0%  {transform: rotate(360deg);}
	100% {transform: rotate(0deg);}	
}

</style>
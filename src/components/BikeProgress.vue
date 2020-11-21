<template>
<div>
    <div class="r_flex_container">            
            <div style="display: flex; justify-content: center; width: 100vw;">
            <div class="flags" :style="{ backgroundImage: `url(${flags})`, width: '500px', height: '200px', display: 'flex', justifyContent: 'center',  backgroundSize: 'contain', backgroundRepeat: 'no-repeat'} ">
                    <div style="max-width: 250px;">
                        <div class="stuff animate__animated animate__zoomIn">Vue this!</div>
                    </div>    
            </div>
            </div>
            <div class="r_flex_expand_child">
                <p class="animate__animated animate__fadeInUpBig" style="animation-delay: 0.5s;">Congrats on overengineering your onboarding with React!</p>
                <p class="animate__animated animate__fadeInUpBig" style="animation-delay: 1s;" @animationend="hideProceedButton = false">Want to make life easier for yourself next time?</p>
                <br>
                <m-fab :exited="hideProceedButton">Let's do it!</m-fab>
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


Vue.use(iconbutton);
Vue.use(button);
Vue.use(card);
Vue.use(fab);

export default{
  name: 'BikeProgress',
  data() {
      return  {
          flags,
          hideProceedButton: true 
      };
  }
}
</script>

<style scoped>
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

@keyframes flags-entrance {
  100%  { background-position-y: 0; }
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
</style>
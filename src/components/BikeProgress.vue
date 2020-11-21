<template>
<div class="r_flex_container">
    <div class="r_flex_expand_child">
        <div style="position: absolute">
             <pre>
                                    <div class="sun animate__infinite animate__animated  animate__pulse animate__slow">☀️</div>
             </pre>
        </div>
    </div>
    <div class="r_flex_fixed_child">
        <div class="grass">
            <div style="position: absolute; bottom: -45px;"></div>
            <div class="biker"></div>
        </div>
    </div>
</div>
</template>

<script>
export default{
  name: 'BikeProgress'
}
</script>

<style scoped>
.sun {
  display: inline-block;
}

.biker
{
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

html, body, .r_flex_container{
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    background-image: linear-gradient(to bottom, white, lightblue);
}

.r_flex_container {
    height: 100vh;
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
  font-size: 50px;
}

.grass {
  background: lightgreen; 
  height:40px;
  font-size: 50px;
}
</style>
<template>
  <div id="fail-container">
    <p class="fixed-center">
      <!--span class="emoji">&#128542;</span-->
      <img id="icon" src="data:image/svg+xml;base64,
      PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQy
      AnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5v
      cmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaW
      dodD0iMzJweCIgaWQ9IlNhZCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5k
      Om5ldyAwIDAgMzIgMzI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMC
      AzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHht
      bG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbm
      s9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFk
      aWVudCBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9IlNWR0
      lEXzFfIiB4MT0iMjQuMDAxIiB4Mj0iNy45OTg0IiB5MT0iMi4xNDE2IiB5
      Mj0iMjkuODU4OSI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2
      xvcjojRkZFMjU0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1j
      b2xvcjojRkZCMjU1Ii8+PC9saW5lYXJHcmFkaWVudD48Y2lyY2xlIGN4PS
      IxNiIgY3k9IjE2IiByPSIxNiIgc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF8x
      Xyk7Ii8+PGNpcmNsZSBjeD0iOSIgY3k9IjE2IiByPSIyIiBzdHlsZT0iZm
      lsbDojMjEyNzMxOyIvPjxjaXJjbGUgY3g9IjIzIiBjeT0iMTYiIHI9IjIi
      IHN0eWxlPSJmaWxsOiMyMTI3MzE7Ii8+PHBhdGggZD0iTTIxLDI0Yy0yLj
      IxMS0yLjIxMi03Ljc4OS0yLjIxMi0xMCwwIiBzdHlsZT0iZmlsbDpub25l
      O3N0cm9rZTojMjEyNzMxO3N0cm9rZS13aWR0aDoxLjI4MDQ7c3Ryb2tlLW
      1pdGVybGltaXQ6MTA7Ii8+PHBhdGggZD0iTTI1LDI3YzAsMS4xMDQtMC44
      OTYsMi0yLDJzLTItMC44OTYtMi0yczItNCwyLTRTMjUsMjUuODk2LDI1LD
      I3eiIgc3R5bGU9ImZpbGw6IzI2NjdDNjsiLz48cGF0aCBkPSJNMjcsMTRj
      LTEtMi0zLTMtNS0zIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMjEyNz
      MxO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIvPjxwYXRoIGQ9Ik01LDE0YzEt
      MiwzLTMsNS0zIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMjEyNzMxO3
      N0cm9rZS1taXRlcmxpbWl0OjEwOyIvPjwvc3ZnPg==">
      <br/>
      <span id="message">El usuario no pudo ser identificado.</span>
      <br/>
      <q-btn
        round
        class="text-blue"
        color="white"
        size="18px"
        @click="$router.push('/')">
        <q-icon name="replay" />
      </q-btn>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Fail',
};
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables.styl'
#fail-container
  position: relative
  min-height: 100vh
  display: block
  padding: 15px
  background-image: linear-gradient(hsla(5, 70%, 54%, 1.0), hsla(5, 70%, 60%, 0.9))
#icon
  width: 150px
p
  font-weight: bolder
  text-align: center
  color: white
#message
  display: inline-block
  width: 100%
  margin-top: 15px
  margin-bottom: 15px
.separator
  display: block
  height: 10px
</style>

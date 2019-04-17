<template>
  <div id="container">
    <div>
      <canvas id="preview" ref="preview"></canvas>
    </div>
    <div id="content">
      <header>
        <img src="statics/icon-qr.png">
        <span>{{ step }} de 2</span>
        <p><b>Verificación de identidad</b><br/>
          Escanea el código QR
        </p>
      </header>
      <img id="thumbnail" :src="preview">
      <footer>
        <q-btn
          color="primary"
          class="full-width">
          {{ message }}
        </q-btn>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      step: 1,
      alert: false,
      message: 'Paso 1',
      preview: null,
      scan: {
        isScanning: true,
        scanningPreview: false,
        timer: null,
      },
    };
  },
  mounted() {
    qrcode.callback = (data) => {
      if (typeof data === 'string') {
        console.log(data);
        if (!data.includes('Error')) {
          console.log('QR data found!');
          console.log(data);
          this.stopScanning();
          this.message = data;
          if (!this.alert) {
            this.alert = true;
            this.$q.dialog({
              title: 'QR Info',
              message: data,
              preventClose: true,
              ok: true,
            }).then(() => {
              this.alert = false;
              this.startScannign();
            });
          }
        }
      }
    };
    this.startCamera();
    this.startScannign();
  },
  methods: {
    startCamera() {
      console.log('startCamera');
      CanvasCamera.initialize(this.$refs.preview);
      CanvasCamera.start({
        fps: 20,
        use: 'data',
        onAfterDraw: ((frame) => {
          this.preview = frame.renderer.data.data;
        }),
      }, (err) => {
        console.log('CanvasCamera.start() error');
        console.log(err);
      });
    },
    stopCamera() {
      console.log('startCamera()');
      CanvasCamera.stop((err) => {
        console.log('CanvasCamera.stop() error');
        console.log(err);
      });
    },
    startScannign() {
      console.log('startScannign');
      this.scan.timer = setInterval(() => {
        qrcode.decode(this.preview);
      }, 250);
    },
    stopScanning() {
      console.log('stopScanning()');
      clearInterval(this.scan.timer);
    },
  },
  beforeDestroy() {
    this.stopScanning();
    this.stopCamera();
  },
};
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables.styl';
#container
  position: relative
  width: 100vw
  height: 100vh
  overflow: hidden
  #preview
    position: absolute
    top: 0
    left: 0
    width: 100vw;
    height: 100vh;
    background-color: #333c
  #content
    z-index: 1
    position: relative
    top: 0
    left: 0
    width: 100vw
    min-height: 100vh
    #thumbnail
      margin-top: 150px;
      width: 150px
      border: 1px solid red
header, footer
  padding: 15px
  background-color: white
header
  position: absolute
  top: 0
  display: block
  width: 100%
  min-height: 90px
  padding-bottom: 0px
  img
    float: left
    height: 60px
    vertical-align: top
  span
    float: right
    color: $primary
    font-weight: bolder
  p
    display: block
    padding-left: 70px
footer
  position: absolute
  bottom: 0
  width: 100%
</style>

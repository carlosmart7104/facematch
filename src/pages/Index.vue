<template>
  <div id="container">
    <div>
      <canvas id="preview" ref="preview"></canvas>
    </div>
    <div id="content">
      <header>
        <img :src="icon">
        <span>{{ step + 1 }} de 2</span>
        <p><b>{{ title }}</b><br/>
          {{ subtitle }}
        </p>
      </header>
      <img id="thumbnail" :src="preview">
      <footer>
        {{ message }}
      </footer>
    </div>
  </div>
</template>

<script>
const stepsInfo = [{
  title: 'Verificación de identidad',
  subtitle: 'Escanea el código QR',
  icon: 'statics/icon-qr.png',
}, {
  title: 'Verificación de identidad',
  subtitle: 'Escanea la cara de la persona',
  icon: 'statics/icon-face.png',
}];

export default {
  name: 'PageIndex',
  data() {
    return {
      step: 0,
      icon: null,
      title: null,
      subtitle: null,
      alert: false,
      preview: null,
      label: null,
      scan: {
        isScanning: true,
        timer: null,
      },
      verify: {
        intents: 0,
        request: null,
      },
    };
  },
  mounted() {
    qrcode.callback = (data) => {
      if (typeof data === 'string') {
        if (!data.includes('Error')) {
          console.log('QR data found!');
          console.log(data);
          this.stopScanning();
          this.label = data;
          if (!this.alert) {
            this.alert = true;
            this.$q.dialog({
              title: 'QR Info',
              message: data,
              preventClose: true,
              ok: true,
            }).then(() => {
              this.alert = false;
              this.setStep(1);
              this.startScannign();
            });
          }
        }
      }
    };
    this.setStep(0);
    this.startCamera();
    this.startScannign();
  },
  methods: {
    setStep(step) {
      this.step = step;
      this.icon = stepsInfo[step].icon;
      this.title = stepsInfo[step].title;
      this.subtitle = stepsInfo[step].subtitle;
    },
    startCamera() {
      console.log('startCamera');
      if (typeof CanvasCamera !== 'undefined') {
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
      }
    },
    stopCamera() {
      console.log('startCamera()');
      if (typeof CanvasCamera !== 'undefined') {
        CanvasCamera.stop((err) => {
          console.log('CanvasCamera.stop() error');
          console.log(err);
        });
      }
    },
    startScannign() {
      console.log('startScannign');
      this.scan.timer = setInterval(() => {
        if (this.step === 0) {
          console.log('qr scanning');
          qrcode.decode(this.preview);
        } else if (this.step === 1) {
          console.log('face scanning');
          if (this.verify.request === null) {
            // no se ha enviado una petición
            this.verify.request = true;
            this.sendVerification();
          }
        }
      }, 250);
    },
    stopScanning() {
      console.log('stopScanning()');
      clearInterval(this.scan.timer);
    },
    sendVerification() {
      console.log('sendVerification()');
      // this.verify.request = null;
      if (this.verify.intents < 300) {
        this.verify.intents += 1;
        this.$axios.post('/verify', {
          threshold: 0.5,
          label: this.label,
          image: this.preview,
        })
          .then((res) => {
            console.log('match');
            console.log(res.data);
            this.message = res.data;
            if (!res.data.match) {
              this.verify.request = null;
            } else {
              this.success();
            }
          })
          .catch((err) => {
            console.log(err);
            this.message = err;
            // this.verify.request = null;
            this.fail();
          });
      } else {
        console.log('intents limit!');
        this.fail();
      }
    },
    success() {
      console.log('success()');
      this.$q.dialog({
        title: 'Success :D',
        message: `Usuario "${this.label}" identificado.`,
        preventClose: true,
        ok: true,
      }).then(() => {
        this.alert = false;
        this.setStep(0);
      });
    },
    fail() {
      console.log('fail()');
      this.$q.dialog({
        title: 'Fail :C',
        message: `Usuario "${this.label}" no identificado.`,
        preventClose: true,
        ok: true,
      }).then(() => {
        this.alert = false;
        this.setStep(0);
      });
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
  display: none
  position: absolute
  bottom: 0
  width: 100%
</style>

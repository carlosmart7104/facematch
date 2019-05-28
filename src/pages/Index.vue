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
      <img id="thumbnail" :src="snap">
      <footer class="text-center">
        <q-btn
          v-show="label !== null"
          round
          class="q-ma-sm text-blue"
          color="white"
          size="18px"
          @click="$router.go()">
          <q-icon name="replay" />
        </q-btn>
        <q-btn
          round
          class="q-ma-sm text-blue"
          color="white"
          size="18px"
          @click="toggleCamera()">
          <q-icon name="cached" />
        </q-btn>
        <q-btn
          v-show="isLabelValid === true"
          round
          class="q-ma-sm text-blue"
          color="white"
          size="18px"
          @click="send()">
          <q-icon name="camera" />
        </q-btn>
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
      snap: null,
      preview: null,
      cameraPreview: 'back',
      label: null,
      isLabelValid: null,
      score: 0,
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
          // console.log('qrcode.callback() success');
          // console.log(data);
          this.stopScanning();
          this.label = data;
          /* if (!this.alert) {
            this.alert = true;
            this.$q.dialog({
              title: 'Contenido del QR',
              message: JSON.stringify(data),
              preventClose: true,
              ok: true,
            }).then(() => {
              this.alert = false;
              this.checkLabel(this.label);
            });
          } */
          this.checkLabel(this.label);
        }
      }
    };
    this.isLabelValid = null;
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
      this.snap = null;
    },
    toggleCamera() {
      if (this.cameraPreview === 'front') {
        this.cameraPreview = 'back';
      } else {
        this.cameraPreview = 'front';
      }
      CanvasCamera.cameraPosition(this.cameraPreview);
    },
    startCamera() {
      console.log('startCamera');
      if (typeof CanvasCamera !== 'undefined') {
        CanvasCamera.initialize(this.$refs.preview);
        CanvasCamera.start({
          fps: 20,
          use: 'data',
          cameraPreview: 'back',
          onAfterDraw: ((frame) => {
            // this.preview = frame.renderer.data.data;
            this.preview = frame.image.src;
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
          // console.log('qr scanning');
          this.isLabelValid = null;
          qrcode.decode(this.preview);
        } else if (this.step === 1) {
          // console.log('face scanning');
          // if (this.verify.request === null) {
          if (this.isLabelValid) {
            // console.log('listo para verificar identidad');
            // no se ha enviado una petición
            // this.verify.request = true;
            // this.sendVerification();
          }
        }
      }, 250);
    },
    stopScanning() {
      console.log('stopScanning()');
      clearInterval(this.scan.timer);
    },
    compareTo(label) {
      // return `https://facematch-api.herokuapp.com/users/photos/${label}.jpg`;
      return `https://rutapp.mx:3006/users/photos/${label}.jpg`;
    },
    checkLabel(label) {
      console.log('checkLabel');
      console.log(label);
      this.$q.loading.show();
      this.$heroku.get(`/users/${label}/exist`)
        .then((res) => {
          this.$q.loading.hide();
          console.log('res');
          console.log(JSON.stringify(res));
          if (res.data === true) {
            this.isLabelValid = res.data;
            this.setStep(1);
            this.startScannign();
          } else {
            this.$q.dialog({
              title: 'Error',
              message: `El usuario "${this.label}" no se encuentra registrado`,
              preventClose: true,
              ok: true,
            })
              .then(() => {
                this.alert = false;
                this.label = null;
                this.setStep(0);
                this.startScannign();
              })
              .catch(() => {
                this.label = null;
              });
          }
        })
        .catch((err) => {
          this.$q.loading.hide();
          console.log('err');
          console.log(err);
        });
    },
    sendVerification(image, compareTo) {
      console.log('sendVerification()');
      // this.verify.request = true;
      const formData = new FormData();
      formData.append('image', image);
      formData.append('compareTo', compareTo);
      this.$q.loading.show();
      this.$rutapp.post('/upload/image', formData)
        .then((res) => {
          this.$q.loading.hide();
          console.log('res');
          console.log(JSON.stringify(res));
          if (res.data !== 'Err1') {
            this.score = res.data;
            if (res.data < 0.5) {
              this.fail();
              // this.verify.request = null;
            } else {
              this.success();
            }
          } else {
            this.$q.dialog({
              title: 'Error',
              message: `No se encontró el usuario "${this.label}".`,
              preventClose: true,
              ok: true,
            })
              .then(() => {
                this.alert = false;
                this.label = null;
                this.setStep(0);
              })
              .catch(() => {
                this.label = null;
              });
          }
        })
        .catch((err) => {
          this.$q.loading.hide();
          console.log(err);
          // this.verify.request = null;
          this.fail();
        });
    },
    send() {
      this.snap = this.preview;
      const compareTo = this.compareTo(this.label);
      console.log('compareTo: ');
      console.log(compareTo);
      this.sendVerification(this.preview, compareTo);
    },
    success() {
      console.log('success()');
      this.$router.push(`/info/${this.label}`);
    },
    fail() {
      console.log('fail()');
      this.$router.push('/fail');
      /* this.$q.dialog({
        title: 'Error',
        message: `El usuario no fue identificado como "${this.label}".`,
        preventClose: true,
        ok: true,
      })
        .then(() => {
          this.alert = false;
          this.label = null;
          this.setStep(0);
        })
        .catch(() => {
          this.label = null;
        }); */
    },
  },
  beforeDestroy() {
    this.stopScanning();
    this.stopCamera();
  },
};
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables.styl'
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
      display: none
      margin-top: 150px
      width: 150px
header, footer
  padding: 15px
header
  position: absolute
  top: 0
  display: block
  width: 100%
  min-height: 90px
  padding-bottom: 0px
  background-color: white
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

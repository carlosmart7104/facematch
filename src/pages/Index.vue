<template>
  <div id="container">
    <div>
      <img id="preview" :src="preview">
    </div>
    <div id="content">
      <header>
        <img src="statics/icon-qr.png">
        <span>1 de 2</span>
        <p><b>Verificación de identidad</b><br/>
          Escanea el código QR
        </p>
      </header>
      <footer>
        <q-btn color="primary" class="full-width">{{ message }}</q-btn>
      </footer>
    </div>
  </div>
</template>

<script>
const {
  checkPermission,
  requestPermission,
  CAMERA,
} = cordova.plugins.permissions;

export default {
  name: 'PageIndex',
  data() {
    return {
      alert: false,
      qr: {
        timer: null,
      },
      preview: '',
      message: 'qr',
    };
  },
  beforeCreate() {
    checkPermission(CAMERA, (status) => {
      if (!status.hasPermission) {
        requestPermission(CAMERA, (res) => {
          if (res.hasPermission) {
            this.startCamera();
          } else {
            this.$q.dialog({
              title: 'Lo sentimos :C',
              message: 'El acceso a la cámara es necesario.',
              preventClose: true,
              ok: true,
            });
          }
        }, () => {
          this.$q.dialog({
            title: 'Lo sentimos :C',
            message: 'No es posible acceder a la cámara.',
            preventClose: true,
            ok: true,
          });
        });
      } else {
        this.startCamera();
      }
    }, () => {
      this.$q.dialog({
        title: 'Lo sentimos :C',
        message: 'No es posible acceder a la cámara.',
        preventClose: true,
        ok: true,
      });
    });
  },
  mounted() {
    qrcode.callback = (data) => {
      if (typeof data === 'string') {
        if (!data.includes('Error')) {
          console.log('data found!');
          console.log(data);
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
            });
          }
        }
      }
    };
    this.qr.timer = setInterval(() => {
      qrcode.decode(this.preview);
    }, 500);
  },
  methods: {
    startCamera() {
      if (CameraStream !== undefined) {
        CameraStream.start((res) => {
          // console.log(res);
          this.preview = res;
        }, (err) => {
          console.log('Error al iniciar CameraStream:');
          console.log(err);
        });
      }
    },
    errorDialog() {
      console.log('Error Dialog!!!');
      this.$q.dialog({
        title: 'Lo sentimos :C',
        message: 'Éste QR no es compatible con FaceMatch',
        preventClose: true,
        ok: true,
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.qr.timer);
    CameraStream.stop();
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
    width: 100vw
    height: 100vh
    background-color: #333c
  #content
    z-index: 1
    position: relative
    top: 0
    left: 0
    width: 100vw
    min-height: 100vh
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

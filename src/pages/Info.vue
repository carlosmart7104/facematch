<template>
  <div id="info-container">
    <div class="separator"></div>
    <q-card flat color="white">
      <q-card-main class="notification">
        <img class="icon" src="statics/icon-success.png">
        <p class="notification-text"><b>Identidad verificada con éxito</b></p>
      </q-card-main>
    </q-card>
    <div class="separator"></div>
    <q-card flat color="white">
      <q-card-media>
        <img :src="user.photo">
      </q-card-media>
      <q-card-main id="user">
        <!--img id="photo" :src="user.photo"-->
        <div id="info">
          <div class="pair">
            <div class="name">Nombre</div>
            <div class="value">{{ user.name }}</div>
          </div>
          <div class="pair">
            <div class="name">Fecha de nacimiento</div>
            <div class="value">{{ user.birthday }}</div>
          </div>
          <div class="pair">
            <div class="name">CURP</div>
            <div class="value">{{ user.curp }}</div>
          </div>
          <div class="pair">
            <div class="name">Entidad</div>
            <div class="value">{{ user.entity }}</div>
          </div>
        </div>
      </q-card-main>
      <q-card-media>
        <img :src="user.signature">
      </q-card-media>
    </q-card>
    <div class="separator"></div>
    <footer class="text-center">
      <!--q-btn
        outline
        class="full-width"
        color="white">
        registrar
      </q-btn>
      <q-btn
        outline
        class="full-width"
        color="white">
        ver mas
      </q-btn-->
      <q-btn
        round
        class="q-ma-sm text-blue"
        color="white"
        size="18px"
        @click="$router.push('/')">
        <q-icon name="replay" />
      </q-btn>
      <div class="separator"></div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data() {
    return {
      user: {
        name: 'unknown',
        birthday: 'unknown',
        curp: 'unknown',
        entity: 'unknown',
        signature: 'statics/default-signature.png',
        photo: 'statics/unknown.jpg',
      },
    };
  },
  beforeCreate() {
    this.$q.loading.show();
  },
  mounted() {
    this.$q.loading.hide();
    this.getUser(this.$route.params.uuid);
  },
  methods: {
    getUser(uuid) {
      console.log('getUser');
      console.log(uuid);
      this.$heroku.get(`/users/${uuid}`)
        .then((res) => {
          if (typeof res.data === 'object') {
            console.log('user:');
            console.log(res.data);
            this.user = res.data;
          } else {
            this.$q.dialog({
              title: 'Error',
              message: 'No se encontró el usuario.',
              preventClose: true,
              ok: true,
            })
              .then(() => {
                this.$router.push('/');
              });
          }
        })
        .catch((err) => {
          console.log('err');
          console.log(err);
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables.styl'
#info-container
  position: relative
  min-height: 100vh
  display: block
  padding: 15px
  background-image: linear-gradient(hsla(200, 100%, 40%, 1.0), hsla(200, 92%, 70%, 0.90))
.notification
  padding: 10px
  .icon
    width: 30px
    vertical-align: middle
  .notification-text
    display: inline-block
    margin: 5px
    margin-left: 15px
    font-size: 12px
    color: black
#user
  padding: 10px
  color: black
  #photo
    display: inline-block
    width: 80px
    vertical-align: top
  #info
    display: inline-block
    margin-left: 10px
    width: calc(100% - 95px)
    .pair
      margin-bottom: 5px
      .name
        font-size: 12px
        font-weight: bold
      .value
        font-size: 14px
        font-weight: lighter
.separator
  display: block
  height: 10px
footer
  position: relative
  width: 100%
  left: 0
  bottom: 0
  .q-btn
    margin: 5px
</style>

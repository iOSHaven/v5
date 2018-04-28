
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('editor', require('./components/Editor.vue'));
Vue.component('file-upload', require('./components/FileUpload.vue'));
Vue.component('load-more', require('./components/LoadMore.vue'));

function formatBytes(bytes,decimals) {
   if(bytes == 0) return '0 Bytes';
   var k = 1000,
       dm = decimals || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}



const app = new Vue({
    el: '#app',
    data: {
      showdashboard: false,
      showmoreclick: false,
      scrollpos: 0,
      hasScrolledOnePage: false,
      apps: [],
      users: [],
      readyForDynamicContent: false
    },
    methods: {
      iconSuccess (data) {
        console.log(data);
        $('#icon-image').attr('src', data.icon);
      },
      bannerSuccess (data) {
        $('#banner-image').attr('src', data.banner);
      },
      apkSuccess (data) {
        $('#size').html(formatBytes(data.size));
      },
      avatarSuccess (data) {
        $('#avatar-image').attr('src', data.avatar);
      },
      addApps(data) {
        this.apps.push.apply(this.apps, data);
      },
      addUsers(data) {
        this.users.push.apply(this.users, data);
      },
      toggleDashboard(val) {
        this.showdashboard = val;
        // window.ElementQueries.init();
      }

    },
    mounted () {
      this.scrollpos = window.pageYOffset || document.documentElement.scrollTop;
      this.hasScrolledOnePage = this.scrollpos > 32;
      window.addEventListener('scroll', (e) => {
        this.scrollpos = window.pageYOffset || document.documentElement.scrollTop;
        this.hasScrolledOnePage = this.scrollpos > 32;
      });
    }
});



$(".totop").on('click', function (e) {
  e.preventDefault();
  $("html, body").animate({scrollTop: 0}, 400);
});

$('.logout').on('click', function (e) {
  e.preventDefault();
  $('#logout').submit();
})

$('.locale').on('click', function (e) {
  e.preventDefault();
  $('#locale-value').val($(this).data('value'));
  // console.log($('#locale').serialize());
  $('#locale').submit();
})

$('#loadmore').on('submit', function (e) {
  e.preventDefault();
  console.log(e.target.action);
})

$("[data-toggle=popover]").popover();

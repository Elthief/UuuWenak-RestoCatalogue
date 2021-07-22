/* eslint-disable no-use-before-define */
window.onscroll = () => {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 550 || document.documentElement.scrollTop > 550) {
    document.querySelector('#slide').style.backgroundColor = '#000000';
    document.querySelector('#slide').style.opacity = '0.8';
    document.querySelector('#slide').style.transition = '0.5s';
    document.querySelector('#navigationDrawer').style.backgroundColor = '#000000';
    document.querySelector('#navigationDrawer').style.opacity = '0.6';
    document.querySelector('#navigationDrawer').style.transition = '0.5s';
  } else {
    document.querySelector('#slide, #navigationDrawer').style.backgroundColor = '';
    document.querySelector('#slide, #navigationDrawer').style.opacity = '';
    document.querySelector('#slide, #navigationDrawer').style.transition = '0.5s';
    document.querySelector('#navigationDrawer').style.backgroundColor = '';
    document.querySelector('#navigationDrawer').style.opacity = '';
    document.querySelector('#navigationDrawer').style.transition = '0.5s';
  }
}

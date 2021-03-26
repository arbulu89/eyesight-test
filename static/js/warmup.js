var $container = $('.container');

var width = $container.width();
var height = $container.height();

function loopKeyframes(keyframes, loops=1) {
  var looped_keyframes = [];
  var i;
  for (i = 0; i < loops; i++) {
    looped_keyframes = looped_keyframes.concat(keyframes);
  }
  return looped_keyframes
}

function horizontalMovement(loops, duration) {
  var offset = 50;
  var steps = 4;
  var step_duration = duration / steps;

  var keyframes = [
    {translateX: width/2-offset, duration: step_duration},
    {translateX: 0, duration: step_duration},
    {translateX: -(width/2-offset), duration: step_duration},
    {translateX: 0, duration: step_duration}
  ]

  looped_keyframes = loopKeyframes(keyframes, loops);

  return {
    keyframes: looped_keyframes
  }
}

function verticalMovement(loops, duration) {
  var offset = 20;
  var steps = 4;
  var step_duration = duration / steps;

  var keyframes = [
    {translateY: height/2-offset, duration: step_duration},
    {translateY: 0, duration: step_duration},
    {translateY: -(height/2-offset), duration: step_duration},
    {translateY: 0, duration: step_duration}
  ]

  looped_keyframes = loopKeyframes(keyframes, loops);

  return {
    keyframes: looped_keyframes
  }
}

function diagonalMovement(loops, duration, args={}) {
  var horizontal_offset = 50;
  var vertical_offset = 15;
  var steps = 4;
  var step_duration = duration / steps;

  var keyframes = [
    {translateX: args['x']*(width/2-horizontal_offset), translateY: args['y']*(height/2-vertical_offset), duration: step_duration},
    {translateX: 0,translateY: 0, duration: step_duration},
    {translateX: -args['x']*(width/2-horizontal_offset), translateY: -args['y']*(height/2-vertical_offset), duration: step_duration},
    {translateX: 0,translateY: 0, duration: step_duration},
  ]

  looped_keyframes = loopKeyframes(keyframes, loops);

  return {
    keyframes: looped_keyframes
  }
}

function rotateMovement(loops, duration) {
  var rotate_offset_left = 150;
  var rotate_offset_right = 130;
  var steps = 2;
  var step_duration = duration / steps;

  var keyframes = [
    {'transform-origin': -(width/4-rotate_offset_left), duration: 0},
    {rotate: 360, duration: step_duration},
    {rotate: 0, duration: 0},
    {'transform-origin': width/4-rotate_offset_right, duration: 0},
    {rotate: -360, duration: step_duration},
    {'transform-origin': 0, duration: 0},
    {rotate: 0, duration: 0}
  ]

  looped_keyframes = loopKeyframes(keyframes, loops);

  return {
    keyframes: looped_keyframes
  }
}

var animation = anime.timeline({
    targets: '.ball',
    easing: 'linear',
    autoplay: false
});

// Define the movements
animation.add(
    horizontalMovement(loops=5, duration=5000));
animation.add(
    verticalMovement(loops=5, duration=5000));
animation.add(
    diagonalMovement(loops=1, duration=5000, args={'x': 1, 'y': 1}));
animation.add(
    diagonalMovement(loops=1, duration=5000, args={'x': 1, 'y': -1}));
animation.add(
    diagonalMovement(loops=1, duration=5000, args={'x': -1, 'y': -1}));
animation.add(
    diagonalMovement(loops=1, duration=5000, args={'x': -1, 'y': 1}));
animation.add(
    rotateMovement(loops=5, duration=3000));

$('#btn-start').on('click', function () {
  animation.play();
});

$('#btn-pause').on('click', function () {
  animation.pause();
});

$('#btn-restart').on('click', function () {
  animation.restart();
});

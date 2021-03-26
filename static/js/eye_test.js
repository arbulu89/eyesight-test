var font_sizes = [100, 75, 50, 25, 18, 12, 8]
var font_size_index = 0;
var test_result = {};
var checked = false;

function generateRandomChar() {
  var stringValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var sizeOfCharacter = stringValues.length;
  return stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
}

function updateTestChar(font_size) {
  $('.test-char').each(function(){
    $span = $(this).find('span')
    $span.html(generateRandomChar());
    $span.css({'opacity': 0, 'font-size': font_size+'px', color: 'black'});
    $span.animate({opacity: 1}, 1000);
  });
}

function goNextFont() {
  if (parseInt($('.test-char').find('span').css('font-size'), 10) == font_sizes[font_sizes.length-1])
    return

  checked = false;
  font_size_index += 1;
  updateTestChar(font_sizes[font_size_index]);
  $('#result')[0].value = ''
  if (font_size_index >= font_sizes.length-1) {
    $('#btn-next')[0].disabled = true;
    $($('#btn-next')[0]).addClass('disabled');
  }
}

function checkFontResults() {
  $('.tooltip-error').css({visibility: 'hidden'});
  if ($('#result')[0].value.length != $('.test-char').length) {
    $('.tooltip-error').css({visibility: 'visible'});
    return
  }

  checked = true;
  var correct_answers = 0;
  var result = $('#result')[0].value;
  [...result].forEach(function callback(value, index) {
    var $char = $($('.test-char').find('span')[index]);
    if ($char.html() == value.toUpperCase()) {
      $char.css({'color': 'green'});
      correct_answers += 1;
    } else {
      $char.css({'color': 'red'})
    };
  });
  test_result[font_size_index] = correct_answers;

  if (font_size_index == font_sizes.length-1)
    window.location.href = "#popup"
}

function restart() {
  checked = false;
  font_size_index = 0;
  updateTestChar(font_sizes[font_size_index]);
  $('#result')[0].value = ''
  $('#btn-next')[0].disabled = false;
  $($('#btn-next')[0]).removeClass('disabled');
  test_result = {};
}

function submit() {
  function getCurrentDate() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toISOString();
  }

  function getRate(rate_index) {
    if (rate_index in test_result) {
      return `${test_result[rate_index]}/${$('.test-char').length}`
    }
    return null
  }

  var data_json = {
    'date': getCurrentDate(),
    'eye': $('input[name="eye"]:checked').val(),
    'rate1': getRate(0),
    'rate2': getRate(1),
    'rate3': getRate(2),
    'rate4': getRate(3),
    'rate5': getRate(4),
    'rate6': getRate(5),
    'rate7': getRate(6),
  }

  $.ajax({
    url: '/test',
    data: JSON.stringify(data_json),
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      console.log('Test data submitted properly. Go to stats to see the last results');
    }
  });
}

$('#btn-next').on('click', function () {
  goNextFont();
});

$('#btn-check').on('click', function () {
  checkFontResults()
});

$('#btn-restart').on('click', function () {
  restart();
});

$('#btn-new-test').on('click', function () {
  restart();
});

$('#result').keypress(function (e) {
  if(e.which == 13)  {// the enter key code
    if (checked) {
      goNextFont();
    } else {
      checkFontResults();
    }
  }
});

$('#btn-save').on('click', function () {
  submit();
  window.location.href = "#popup-completed";
});

$('#btn-popup-stats').on('click', function () {
  window.location.href = '/stats';
});

$('#result')[0].value = '';
updateTestChar(font_sizes[font_size_index]);

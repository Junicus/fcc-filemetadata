$(document).ready(function () {
  $('form').on('submit', function (event) {
    event.stopPropagation()
    event.preventDefault()

    var data = new FormData(this)
    $.ajax({
      url: window.location.origin + '/api/file',
      type: 'POST',
      data: data,
      cache: false,
      processData: false,
      contentType: false,
      error: function (jqXHR, textStatus, errorThrown) {
        $('.erropanel').toggleClass('collapsed')
        $('.errormsg').html(textStatus)
      },
      success: function (data) {
        $('.metapanel').toggleClass('collapsed')
        // $('.jsondata').html(JSON.stringify(data))
        data['files'].forEach(function (elem) {
          var filename = $('<span />', {text: 'Filename: ' + elem.originalname})
          var filesize = $('<span />', {text: 'Filesize: ' + elem.size})
          var item = $('<li />')
          item.append(filename)
          item.append(', ')
          item.append(filesize)
          $('.filelist').append(item)
        })
      }
    })
  })
})

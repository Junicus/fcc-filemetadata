$(document).ready(function () {
  var files
  $('input[type=file]').on('change', function (event) {
    files = event.target.files
  })

  $('form').on('submit', function (event) {
    event.stopPropagation()
    event.preventDefault()

    var data = new FormData()
    $.each(files, function (key, value) {
      data.append(key, value)
    })

    $.ajax({
      url: window.location.origin + '/api/file',
      type: 'POST',
      data: data,
      cache: false,
      processData: false,
      contentType: false,
      error: function (jqXHR, textStatus, errorThrown) {
        aler('Error: ' + textStatus)
      },
      success: function (data) {
        alert(data)
      // alert('FILE SIZE: ' + data.filesize)
      }
    })
  })
})

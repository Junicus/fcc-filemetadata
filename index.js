var fs = require('fs');
var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploadFiles/' });
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.post('/api/file', upload.array('filesToAnalyze', 3), function(req, res, next) {
    console.log('api/file called');
    console.log(req.files);
    var data = {
        files: []
    };

    req.files.forEach(function(file) {
        data.files.push(
            {
                originalname: file.originalname,
                size: file.size,
                mimetype: file.mimetype
            }
        );

        var filePath = __dirname + '/' + file.path;
        console.log('Removing: ' + filePath);
        fs.unlinkSync(filePath);
    })

    res.json(data);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

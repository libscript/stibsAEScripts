function PrefsFile(theName) {  // eslint-disable-line no-unused-vars
  var __construct = (function (that) { // eslint-disable-line no-unused-vars
    that.prefPath = '~/.' + theName + '.txt';
  }(this));

  this.saveToPrefs = function (data) {
    var f = new File(this.prefPath);
    f.encoding = 'UTF8';
    f.open('w');
    f.write(data.toSource());
    f.close();
  };

  this.readFromPrefs = function () {
    var f = new File(this.prefPath);
    f.open('r');
    var data = eval(f.read()); // eslint-disable-line no-eval
    f.close();
    return data;
  };
}

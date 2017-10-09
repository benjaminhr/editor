window.onload = () => {
  var converter = new showdown.Converter();
  var pad = document.getElementById('pad');
  var markdownArea = document.getElementById('markdown');

  var previousMarkdownValue;

  var convertTextAreaToMarkdown = () => {
    var markdownText = pad.value;
    previousMarkdownValue = markdownText;
    html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;
  }

  var didChangeOccur = () => {
    if (previousMarkdownValue != pad.value) {
      return true;
    }
    return false;
  }

  setInterval(() => {
    if (didChangeOccur()) {
      convertTextAreaToMarkdown();
    }
  }, 1000);

  pad.addEventListener('input', convertTextAreaToMarkdown);

  sharejs.open('home', 'text', (error,doc) => {
    doc.attach_textarea(pad);
    convertTextAreaToMarkdown();
  });
}


console.log('yeaaaaaaah boi');

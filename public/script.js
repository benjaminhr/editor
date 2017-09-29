window.onload = () => {
  var converter = new showdown.Converter();
  var pad = document.getElementById('pad');
  var markdownArea = document.getElementById('markdown');

  var convertTextAreaToMarkdown = () => {
    var markdownText = pad.value;
    html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;
  }

  pad.addEventListener('input', convertTextAreaToMarkdown);

  convertTextAreaToMarkdown();
}

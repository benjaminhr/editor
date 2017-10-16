window.onload = () => {
  /**
   * Precheck URL for an ID, create one if none exists.
   * Redis RedisDB retrieves and stores by the generated ID.
   */

  var urlContainsGuid = utils.containsGuid(window.location.href);
  if (!urlContainsGuid) {
    window.location.href = `/${utils.generateGuid()}`;
  }

  var converter = new showdown.Converter();
  var pad = document.getElementById('pad');
  var markdownArea = document.getElementById('markdown');
  var currentGuid = utils.pickGuid(window.location.href);
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

  sharejs.open(currentGuid, 'text', (error, doc) => {
    doc.attach_textarea(pad);
    convertTextAreaToMarkdown();
  });
}


console.log('yeaaaaaaah boi');

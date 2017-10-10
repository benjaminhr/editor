const utils = (function () {
  const guidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/ig;

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  function containsGuid(string) {
    return guidRegex.test(string);
  }

  function pickGuid(string) {
    return string.match(guidRegex)[0];
  }

  return {
    generateGuid: guid,
    containsGuid,
    pickGuid,
  };
}());
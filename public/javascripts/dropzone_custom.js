document.addEventListener("DOMContentLoaded", function(event) {
  // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
  var previewNode = document.querySelector(".template");
  previewNode.id = "";
  var previewTemplate = previewNode.parentNode.innerHTML;
  previewNode.parentNode.removeChild(previewNode);

  function errorHandler(file, response) {
    var message = response;
    if (typeof response !== "string") message = response.message;
    file.previewElement.classList.add("dz-error");
    _ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push(node.textContent = message);
    }
    return _results;
  }

  var dz = new Dropzone(document.body, { // Make the whole body a dropzone
    url: "/upload", // Set the url
    paramName: "files[]",
    thumbnailWidth: 60,
    thumbnailHeight: 60,
    parallelUploads: 20,
    maxFilesize: document.querySelector('meta[name="max-up-size"]').getAttribute('value') / 1000000,
    previewTemplate: previewTemplate,
    dictFileTooBig: "O-o-onii-san noo its too big~ ({{filesize}}MB > {{maxFilesize}}MB)",
    autoQueue: true, // Make sure the files aren't queued until manually added
    previewsContainer: "#preview", // Define the container to display the previews
    clickable: "#upload-button", // Define the element that should be used as click trigger to select files.
    error: errorHandler
  });

  dz.on("addedfile", function(file) {
    file.previewElement.querySelector(".remove").onclick = function() { dz.removeFile(file); };
  });

  dz.on("sending", function(file) {
    // Show the total progress bar when upload starts
    document.querySelector(".file-progress").style.opacity = "1";
  });

  dz.on("complete", function(file) {
    file.previewElement.querySelector(".status").classList.add('hidden');

    if (!file.xhr || !file.xhr.response) return;
    var data = JSON.parse(file.xhr.response);
    if (!data.files || data.files.length <= 0) return;
    file.previewElement.querySelector(".link").classList.remove('hidden');
    var name = document.querySelector('meta[name="site-href"]').getAttribute('value') + data.files[0].url;
    file.previewElement.querySelector(".link-href").setAttribute('href', name);
    file.previewElement.querySelector(".link-href").innerHTML = name;
  });

  dz.on("uploadprogress", function(file, progress, bytesSent) {
    file.previewElement.querySelector(".file-progress .progress-inner").style.width = progress + "%";
  });

  // Hide the total progress bar when nothing's uploading anymore
  dz.on("queuecomplete", function(progress) {
    //document.querySelector(".file-progress").style.opacity = "0";
  });
});

$(document).ready(function() {
  $("#messageBoard").dialog({
     modal: true,
     autoOpen:false,
     draggable: false,
     resizable: false,
     show: 'slide',
     hide: 'slide',
     width: 400,
     buttons: {
         OK: function() {
            $(this).dialog("close");
         }
     }
   }); 

   $('#file1').change(function(){
        if (window.FileReader) {
            var file = this.files[0];
            var reader = new FileReader();

            reader.onload = function(event) {
               var contents = event.target.result;
               $('#file1Content').html('<pre>'+contents+'</pre>');
               $('#file1Content').scrollTop(0);
            }
            
            if(file){
               reader.readAsText(file);
            }
        }else {
            try {
                var filePath = $("#file1").val();
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var textStream = fso.OpenTextFile(filePath);
                var fileData = textStream.ReadAll();
                $('#file1Content').html('<pre>'+fileData+'</pre>');
                $('#file1Content').scrollTop(0);
                console.log(fileData);
            } catch (e) {
                if (e.number == -2146827859) {
                alert('Unable to access local files due to browser security settings. ' +
                'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
                }
            }
        }
        activeTab('tab-4458-1'); 
    });

  $('#file2').change(function(){
        if (window.FileReader) {
            var file = this.files[0];
            var reader = new FileReader();

            reader.onload = function(event) {
               var contents = event.target.result;
               $('#file2Content').html('<pre>'+contents+'</pre>');
               $('#file2Content').scrollTop(0);
            }

            if(file){
               reader.readAsText(file);
            }
        }else {
            try {
                var filePath = $("#file2").val();
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var textStream = fso.OpenTextFile(filePath);
                var fileData = textStream.ReadAll();
                $('#file2Content').html('<pre>'+fileData+'</pre>');
                $('#file2Content').scrollTop(0);
                console.log(fileData);
            } catch (e) {
                if (e.number == -2146827859) {
                alert('Unable to access local files due to browser security settings. ' +
                'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
                }
            }
        }
        activeTab('tab-4458-2'); 
    });

  $('#file3').change(function(){
        if (window.FileReader) {
            var file = this.files[0];
            var reader = new FileReader();

            reader.onload = function(event) {
               var contents = event.target.result;
               $('#file3Content').html('<pre>'+contents+'</pre>');
               $('#file3Content').scrollTop(0);
            }

            if(file){
               reader.readAsText(file);
            }
        }else {
            try {
                var filePath = $("#file3").val();
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var textStream = fso.OpenTextFile(filePath);
                var fileData = textStream.ReadAll();
                $('#file3Content').html('<pre>'+fileData+'</pre>'); 
                $('#file3Content').scrollTop(0);
                console.log(fileData);
            } catch (e) {
                if (e.number == -2146827859) {
                alert('Unable to access local files due to browser security settings. ' +
                'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
                }
            }
        }
        activeTab('tab-4458-3'); 
    });


   $('#cancel').click(function(){
      $('#satField').val('');
      $('#nrsField').val('');
      $('#noiField').val('');
      $("#file1").replaceWith($("#file1").val('').clone(true));
      $("#file2").replaceWith($("#file2").val('').clone(true));
      $("#file3").replaceWith($("#file3").val('').clone(true));
      $('#file1Content').html('<center><b>Drag and Drop File Here</b></center>');
      $('#file2Content').html('<center><b>Drag and Drop File Here</b></center>');
      $('#file3Content').html('<center><b>Drag and Drop File Here</b></center>');
    });

   $('#upload').click(function(){
       $('#message').html("<font color='red'><center><h1>Under Construction!</h1></center></font>");  
       $('#messageBoard').dialog('open'); 
    });

   document.getElementById('file1Content').addEventListener('dragover', handleDragOver, false);
   document.getElementById('file1Content').addEventListener('drop', handleFileSelect1, false);

   document.getElementById('file2Content').addEventListener('dragover', handleDragOver, false);
   document.getElementById('file2Content').addEventListener('drop', handleFileSelect2, false);
   
   document.getElementById('file3Content').addEventListener('dragover', handleDragOver, false);
   document.getElementById('file3Content').addEventListener('drop', handleFileSelect3, false);
});

function activeTab(tab){
  $('a[href="#' + tab + '"]').trigger('click');
}

function handleFileSelect1(evt){
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.dataTransfer.files;
  var reader = new FileReader();
  reader.onload = function(event){
     var contents = event.target.result;
     $('#file1Content').html('<pre>'+contents+'</pre>');
     $('#file1Content').scrollTop(0);
  }
  reader.readAsText(files[0], "UTF-8"); 
}

function handleDragOver(evt){
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

function handleFileSelect2(evt){
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.dataTransfer.files;
  var reader = new FileReader();
  reader.onload = function(event){
     var contents = event.target.result;
     $('#file2Content').html('<pre>'+contents+'</pre>');
     $('#file2Content').scrollTop(0);
  }
  reader.readAsText(files[0], "UTF-8");
}

function handleFileSelect3(evt){
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.dataTransfer.files;
  var reader = new FileReader();
  reader.onload = function(event){
     var contents = event.target.result;
     $('#file3Content').html('<pre>'+contents+'</pre>');
     $('#file3Content').scrollTop(0);
  }
  reader.readAsText(files[0], "UTF-8");
}


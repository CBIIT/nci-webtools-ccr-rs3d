var file1, file2, file3;

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
               file1 = file;
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
               file2 = file;
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
               file3 = file;
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
     //  $('#message').html("<font color='red'><center><h1>Under Construction!</h1></center></font>");  
     //  $('#messageBoard').dialog('open'); 
     var formData = new FormData();
     formData.append('sat',$('#satField').val());
     formData.append('nrs',$('#nrsField').val());
     formData.append('noi',$('#noiField').val());
     formData.append('file1', file1);
     formData.append('file2', file2);
     formData.append('file3', file3);
      $('.loading').css('display', 'block');  
      $.ajax({
         type: "POST",
         url: "/Rs3dRest/processData",
         cache: false,
         data: formData,
         processData:false,
         contentType: false,
         success: function(response){
             $('.loading').css('display', 'none');
         }
     });

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


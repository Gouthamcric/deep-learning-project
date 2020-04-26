$("#inputGroupFile01").change(function(event) {  
  RecurFadeIn();
  readURL(this);    
});
$("#inputGroupFile01").on('click',function(event){
    
  RecurFadeIn();
});
function readURL(input) {    
  if (input.files && input.files[0]) {   
    var reader = new FileReader();
     $('#btn-predict').prop('disabled', false);
    var filename = $("#inputGroupFile01").val();
    filename = filename.substring(filename.lastIndexOf('\\')+1);
    reader.onload = function(e) {
      debugger;      
      $('#preview').attr('src', e.target.result);
      $('#preview').hide();
      $('#preview').fadeIn(500);      
      $('.custom-file-label').text(filename);             
    }
    reader.readAsDataURL(input.files[0]);    
  } 
  $(".alert").removeClass("loading").hide();
}
function RecurFadeIn(){ 
  console.log('ran');
  FadeInAlert("Wait for it...");  
}
function FadeInAlert(text){
  $(".alert").show();
  $(".alert").text(text).addClass("loading");  
}

$(document).ready(function () {
     $('#btn-predict').prop('disabled', true);
        $('#btn-predict').click(function () {

        var form_data = new FormData($('#upload-file')[0]);

        //alert(form_data);

        
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var c,p,tf,tc;
                if(data==="Apple"){
                    c=52;
                            p=0.3;
                    tf=0.2;
                    tc=14;
                }
                else if(data==="Banana"){
                    c=89;
                            p=1.1;
                            tf=0.3;
                    tc=23;
                }
                else if(data==="Mango"){
                    c=60;
                    p=0.8;
                    tf=0.4;
                    tc=15;
                }
                else{
                    c=47;
                    p=0.9;
                    tf=0.1;
                    tc=12;
                }
                $('#fruit_name').text(' Fruit name:  ' + data);
                $('#calorie_count').text(' Calorie count:  ' + c);
                $('#protein_count').text(' Protein :  ' + p+" g");
                $('#total_fat').text(' Total fat:  ' + tf+" g");
                $('#total_carbo').text(' Total carbohydrate:  ' + tf+" g");
                console.log('Success!');
            }
        });
    });

});


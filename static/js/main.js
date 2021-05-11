$('#fileup').change(function(){
    //here we take the file extension and set an array of valid extensions
        var res=$('#fileup').val();
        var arr = res.split("\\");
        var filename=arr.slice(-1)[0];
        filextension=filename.split(".");
        filext="."+filextension.slice(-1)[0];
        valid=[".jpg",".png",".jpeg",".bmp"];
    //if file is not valid we show the error icon, the red alert, and hide the submit button
        if (valid.indexOf(filext.toLowerCase())==-1){
            $( ".imgupload" ).hide("slow");
            $( ".imgupload.ok" ).hide("slow");
            $( ".imgupload.stop" ).show("slow");
          
            $('#namefile').css({"color":"red","font-weight":700});
            $('#namefile').html("File "+filename+" is not  pic!");
            
            $( "#submitbtn" ).hide();
            $( "#fakebtn" ).show();
        }else{
            $("#showImg").show();
            $("#showImg").append("<img/>");
            var reader = new FileReader();
            reader.onload = function (e) {
                        $("#showImg img").attr("src", e.target.result);
                    }
            reader.readAsDataURL($(this)[0].files[0]);
            //if file is valid we show the green alert and show the valid submit
            $( ".imgupload" ).hide("slow");
            $( ".imgupload.stop" ).hide("slow");
            $( ".imgupload.ok" ).show("slow");
          
            $('#namefile').css({"color":"green","font-weight":700});
            $('#namefile').html(filename);
          
            $( "#submitbtn" ).show();
            $( "#fakebtn" ).hide();

            // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
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
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(data);
                console.log('Success!');
            },
        });
    });
        }
    });
$(document).ready(function () {
    $("form").on("submit",function(e){
        e.preventDefault()
        var formdata=new FormData(this)
        $.ajax({
            url:"/generate-password",
            method:"post",
            data:formdata,
            processData:false,
            contentType:false,
            success:function(response){
                if(response.message=="1"){
                    newpassword=response.password
                    $(".genpassword").val(newpassword)
                    $(".alert").text("password generated successfully")
                    change_alert_color("green")
                    $(".button_copy").removeClass("hidden")
                }else{
                    $(".alert").text(response.message)
                    change_alert_color("red")
                }
            },error:function(error){
                $(".alert").text("unable to process request")
                change_alert_color("red")
            }
        })
    })

    function change_alert_color(bgcolor){
        $(".alert").removeClass("text-white").addClass("text-white")
        $(".alert").removeClass("bg-transparent")
        $(".alert").removeClass("bg-red-500")
        $(".alert").removeClass("bg-green-500")
        $(".alert").addClass("bg-"+bgcolor+"-500")
    }

    $(".button_copy").click(function() {
        // Get the text field
        var copyText = $(".genpassword")[0];

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Try to copy the text
        try {
            // Execute the copy command
            document.execCommand("copy");

            // Alert the user that the text has been copied
            $(".alert").text("Text copied to clipboard!");
            change_alert_color("green")
        } catch (err) {
            $(".alert").text("Oops, unable to copy text");
            change_alert_color("red")
        }
    });
});
<?php

    // Honeypot to catch spambots
    $honeypot = FALSE;
    if (!empty($_REQUEST['contact_me_by_fax_only']) && (bool) $_REQUEST['contact_me_by_fax_only'] === TRUE && ($_REQUEST['nickname']!== '')) {
    $honeypot = TRUE;
    log_spambot($_REQUEST);
    # treat as spambot
    } else {
    # process as normal

    if(isset($_POST['email']) && $_POST['email'] != '' && ($_POST['name']) && ($_POST['subject']) && ($_POST['message'])) {
        //if $_POST['email'] has an email, && it is not an empty string - first check
        if(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            //validate the email is formatted correctly contains '@' and '.'
            //submit the form

            $replyTo = $_POST['email'];
            $userName = $_POST['name'];
            $userEmail = $_POST['email'];
            $messageSubject = $_POST['subject'];
            $message = $_POST['message'];

            // @todo switch email account, mine is here for testing
            $mailTo = 'bentleyhamm@shaw.ca';
            //$mailTo = 'balboathehuskita@gmail.com';
            $body = '';

            $body .= 'From: '.$userName."\r\n";
            $body .= 'Email: '.$userEmail."\r\n";
            $body .= 'Subject: '.$messageSubject."\r\n";
            $body .= 'Message: '."\r\n".$message."\r\n";
            
            
            $headers  = "From: " .$userName ." <" .$userEmail  .">\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/plain; charset=iso-8859-1\r\n";
            

            $mailSent = mail($mailTo, "Message from Charles' Website", $body, $headers);
        if($mailSent){
            $message_sent = true;
            header("HTTP/1.1 200 Ok");
            echo 'success';
        } else {
            header("HTTP/1.1 500 Send Error");
            echo 'The server failed to send the message. Please try again later.';
        }

                
        } else {
            header("HTTP/1.1 400 Bad Request");
            $invalid_class_name = 'form-invalid';
        }
    }
}

?>
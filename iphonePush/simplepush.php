<?php

// Put your device token here (without spaces):
$deviceToken = '170d6f7f928e74da73b4294c2e6d83ea0adff339e0ed05f5491bcbd0b636171d'; // gil feig's dev device

// Put your private key's passphrase here:
$passphrase = 'cctest123';

// Put your alert message here:
$message = 'Andrew Sandhill likes your update: "Salmon sashimi is delicious!!!"';

// Put your badge number here:
$badge = 5;

$server = 'ssl://gateway.sandbox.push.apple.com:2195';
//$server = 'ssl://gateway.push.apple.com:2195';

////////////////////////////////////////////////////////////////////////////////

$ctx = stream_context_create();
stream_context_set_option($ctx, 'ssl', 'local_cert', 'debug.pem');
stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);

// Open a connection to APNS
$fp = stream_socket_client($server, $err, $errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);

if (!$fp)
	exit("Failed to connect: $err $errstr" . PHP_EOL);

echo 'Connected to APNS' . PHP_EOL;

// Create the payload body
$body = (array('aps' => array('alert' => $message,'sound' => $sound_file_wav, 'badge' => 1), 'au' => 'urn:li:member:42520259','an' => 'Ned Stark','apl' => 'person','apu' => 'http://somepicUrl/','mu' => 'urn:li:member1','nid' => '456','u' => '123','nt' => 'LikedYourUpdate', 'uri' => '/messaging')); // /feed/activity:6026812073470672896

// Payload for a sample pushed message
// $body = (array('au' => 'urn:li:member:90982130', 'aps' => array('sound' => $sound_file_wav, 'category' => 'inMailWithContentExtensionCategory', 'content-available' => 1, 'badge' => 5), 'u' => '1i629e-it356hch-5z', 'nt' => 'NewMessage', 'apu' => 'https://www.linkedin-ei.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_150x150_v1.png', 'mu' => 'urn:li:member:90982130', 'nid' => 'I6020276202709721088_500', 'apl' => 'person', 'l' => 'fikauMatrixFirst fikauMatrixLast to your group: test1', 'an' => 'fikauMatrixFirst fikauMatrixLast', 'uri' => '/messaging/thread/6179431096409698304'));

// Encode the payload as JSON
$payload = json_encode($body);

// Build the binary notification
$msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;

// Send it to the server
$result = fwrite($fp, $msg, strlen($msg));

if (!$result)
	echo 'Message not delivered' . PHP_EOL;
else
	echo 'Message successfully delivered' . PHP_EOL;

// Close the connection to the server
fclose($fp);


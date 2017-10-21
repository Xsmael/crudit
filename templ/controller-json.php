<?php
function __autoload($className){
	include_once("../models/$className.php");	
}

$%classObj%=new %className%("%db_HostName%","%db_UserName%","%db_PassWord%","%db_Name%");

if(!isset($_GET['action'])) {
	print json_encode(0);
	return;
}

switch($_GET['action']) {
	case '%a-read_all%':
		print $%classObj%->%readAll%();		
	break;
	
	case '%a-read%':
		print $%classObj%->%read%();		
	break;
	
	case '%a-create%':
		$jsonObj = new stdClass;
		$jsonObj = json_decode($_GET['user']);
		print $%classObj%->%create%($jsonObj);		
	break;
	
	case '%a-delete%':
		$jsonObj = new stdClass;
		$jsonObj = json_decode($_GET['user']);
		print $%classObj%->%delete%($jsonObj);		
	break;
	
	case '%a-update%':
		$jsonObj = new stdClass;
		$jsonObj = json_decode($_GET['user']);
		print $%classObj%->%update%($jsonObj);				
	break;
}

exit();
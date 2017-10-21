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
		print $%classObj%->%read%($_GET['%primary-key%']);		
	break;
	
	case '%a-create%':
		print $%classObj%->%create%(%arg-list%);		
	break;
	
	case '%a-delete%':
		print $%classObj%->%delete%($_GET['%primary-key%']);		
	break;
	
	case '%a-update%':
		print $%classObj%->%update%($_GET['%primary-key%'],$_GET['field'],$_GET['newValue']);				
	break;
}

exit();
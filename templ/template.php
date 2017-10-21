<?php

class   !-TABLE-! {
	
	private $dbh;
	
	public function __construct($host,$username,$pass,$db,$port=3306)	{		
		$this->dbh = new PDO("mysql:host=".$host.";port=".$port.";dbname=".$db,$username,$pass);				
		$this->dbh->exec("SET CHARACTER SET utf8");
	} 

	public function readAll() {				
		$sth = $this->dbh->prepare("SELECT * FROM !-TABLE-!");
		$sth->execute();
		return json_encode($sth->fetchAll());
	}
	
	public function readOne($id) {
		$sth = $this->dbh->prepare("SELECT * FROM !-TABLE-! WHERE !-PRIKEY-! =?");
		$sth->execute(array($id));		
		return json_encode($sth->fetchAll());
		
	}
	public function readMany($filter) {
		$sth = $this->dbh->prepare("SELECT * FROM !-TABLE-! WHERE !-PRIKEY-! =?");
		$sth->execute(array($id));		
		return json_encode($sth->fetchAll());
		
	}

/**
Keywords:
TABLES
TABLE
FIELDS
PRIKEY
FORKEY

!-$-FIELDS-!   prefix all items with the char '$'
!-FIELDS-$-!   suffix all items with the char '$'
!-FIELDS*?-!   places all items with the char '?'
!$_GET['-FIELDS-']!   wrap all items with the char '$_GET['']'
!$_GET['-FIELDS-']!   wrap all items with the char '$_GET['']'


*/
	public function create(!-$-FIELDS-!) {		
		$sth = $this->dbh->prepare("INSERT INTO !-TABLE-! (!-FIELDS-!) VALUES (!-FIELDS*?-!);");
		$sth->execute(array(!-$-FIELDS-!));	
		//$sth->execute(array($obj->dlRate, $obj->ulRate, $obj->time, $obj->cpe_id));		
		return json_encode($this->dbh->lastInsertId());
	}	
	/*
	public function create($argArray) {		
		$sth = $this->dbh->prepare("INSERT INTO !-TABLE-! (_fields_) VALUES (_fields-placeholder_);");
		$sth->execute($argArray);	
		//$sth->execute(array($obj->dlRate, $obj->ulRate, $obj->time, $obj->cpe_id));		
		return json_encode($this->dbh->lastInsertId());
	}
	*/
	public function update($id,$field,$newValue) {		
		$sth = $this->dbh->prepare("UPDATE !-TABLE-! SET ".$field."=? WHERE !-PRIKEY-! =?");
		$sth->execute(array($newValue, $id));				
		return json_encode(1);	
	}
	
	public function deleteOne($id) {				
		$sth = $this->dbh->prepare("DELETE FROM !-TABLE-! WHERE !-PRIKEY-! =?");
		$sth->execute(array($id));
		return json_encode(1);
	}
}
?>

<?php

/**  */
class   Application {
	
	private $dbh;
	
	public function __construct($host,$username,$pass,$db,$port=3306)	{		
		$this->dbh = new PDO("mysql:host=".$host.";port=".$port.";dbname=".$db,$username,$pass);				
		$this->dbh->exec("SET CHARACTER SET utf8");
	} 

	public function readAll() {				
		$sth = $this->dbh->prepare("SELECT * FROM application LIMIT ");
		$sth->execute();
		return json_encode($sth->fetchAll());
	}
	
	public function read($id) {
		$sth = $this->dbh->prepare("SELECT * FROM application WHERE application_id=?");
		$sth->execute(array($id));		
		return json_encode($sth->fetchAll());
		
	}

	public function create($application_id,$nationality,$state,$city,$purpose,$datetime) {		
		$sth = $this->dbh->prepare("INSERT INTO application (application_id,nationality,state,city,purpose,datetime) VALUES (?,?,?,?,?,?);");
		$sth->execute(array($application_id,$nationality,$state,$city,$purpose,$datetime));	
		//$sth->execute(array($obj->dlRate, $obj->ulRate, $obj->time, $obj->cpe_id));		
		return json_encode($this->dbh->lastInsertId());
	}	
	/*
	public function create($argArray) {		
		$sth = $this->dbh->prepare("INSERT INTO application (nationality,state,city,purpose,datetime) VALUES (?,?,?,?,?);");
		$sth->execute($argArray);	
		//$sth->execute(array($obj->dlRate, $obj->ulRate, $obj->time, $obj->cpe_id));		
		return json_encode($this->dbh->lastInsertId());
	}
	*/
	public function update($id,$field,$newValue) {		
		$sth = $this->dbh->prepare("UPDATE application SET ".$field."=? WHERE application_id=?");
		$sth->execute(array($newValue, $id));				
		return json_encode(1);	
	}
	
	public function delete($id) {				
		$sth = $this->dbh->prepare("DELETE FROM application WHERE application_id=?");
		$sth->execute(array($id));
		return json_encode(1);
	}
}
?>
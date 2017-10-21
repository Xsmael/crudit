<?php

class   _Table_ {
	
	private $dbh;
	
	public function __construct($host,$username,$pass,$db,$port=3306)	{		
		$this->dbh = new PDO("mysql:host=".$host.";port=".$port.";dbname=".$db,$username,$pass);				
		$this->dbh->exec("SET CHARACTER SET utf8");
	} 

	public function readAll() {				
		$sth = $this->dbh->prepare("SELECT * FROM _table_");
		$sth->execute();
		return json_encode($sth->fetchAll());
	}
	
	public function read($obj) {
		$sth = $this->dbh->prepare("SELECT * FROM _table_ WHERE _primary-key_=?");
		$sth->execute(array($obj->_primary-key_));		
		return json_encode($sth->fetchAll());
		
	}

	public function create($obj) {		
		$sth = $this->dbh->prepare("INSERT INTO _table_ (_fields_) VALUES (_fields-placeholder_);");
		$sth->execute(array(_fields-values_));	
		//$sth->execute(array($obj->dlRate, $obj->ulRate, $obj->time, $obj->cpe_id));		
		return json_encode($this->dbh->lastInsertId());
	}
	
	public function update($obj) {		
		$sth = $this->dbh->prepare("UPDATE _table_ SET ". $obj->field ."=? WHERE _primary-key_=?");
		$sth->execute(array($obj->_primary-key_));				
		return json_encode(1);	
	}
	
	public function delete($obj) {				
		$sth = $this->dbh->prepare("DELETE FROM _table_ WHERE _primary-key_=?");
		$sth->execute(array($obj->newvalue,$obj->_primary-key_));
		return json_encode(1);
	}
}
?>
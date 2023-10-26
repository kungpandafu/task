<?php

namespace App\Database;

use Exception;
use PDO;
use PDOException;
 class Database{

    private $conn;
    private $host = "";
    private $username ="";
    private $password = "";
    private $database = "";

    public function __construct()
    {
        try{
            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->database;charset=utf8", $this->username, $this->password, array(
                PDO::ATTR_EMULATE_PREPARES =>false,
                PDO::ATTR_TIMEOUT => 5,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ERRMODE_SILENT => true,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
            ));
        }
        catch (PDOException $e){
           throw new Exception("Connection to DB Failed: ". $e->getMessage());
        }
    }
    public function getConnection(){
        return $this->conn;
    }

}


?>
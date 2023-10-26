<?php

namespace App\Database;
use Exception;
class QueryBuilder extends Database{

    private $conn;
    private $table;
    private $select = '*';
    private $where = [];
    private $binds = [];

        public function __construct($table)
        {
            parent::__construct();
            $this->conn = $this->getConnection();
            $this->table = $table;
        }

        public function select($cols){
            $this->select = is_array($cols) ? implode(',', $cols) : $cols;
            return $this;
        }
        public function where($col, $op, $val){
            $this->where[] = "$col $op ?";
            $this->binds[] = $val;
            return $this;
        }
        public function get()
        {
            try{
              
            $query = "SELECT $this->select FROM $this->table";
            $query .= (!empty($this->where)) ? " WHERE " . implode (' AND ', $this->where) : "" ;
            
            $stmt = $this->conn->prepare($query);
   
            $stmt->execute($this->binds);
        
            return $stmt->fetchAll();
            }
            catch(Exception $e){
                echo $e;
            }
        }
        public function delete($skus){
            $placeholders = implode(', ', array_fill(0, count($skus), '?'));
            $query = "DELETE FROM $this->table WHERE sku IN ($placeholders)";
            $stmt = $this->conn->prepare($query);
            $stmt->execute($skus);
        }
        public function insert($data){
            var_dump($data);
            $cols = implode(', ', array_keys($data));
            $vals = implode(', ', array_fill(0, count($data), ' ? '));

            $query = "INSERT INTO $this->table ($cols) VALUES ($vals)";
           
            $stmt = $this->conn->prepare($query);
           
            $stmt->execute(array_values($data));

            return $this->conn->lastInsertId();
        }

}



?>
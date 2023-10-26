<?php
namespace App\Models;

use App\Models\Product;

class DvdModel extends Product{

    


    public function __construct($sku,$name, $price, $type, $data){
        parent::__construct($sku, $name, $price, $type, $data);
      
    }

    public function getData(){
        return $this->data;
    }
    public function setData($data){
        $this->data = $data;
    }
}


?>
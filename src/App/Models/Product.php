<?php

namespace App\Models;

abstract class Product{

    protected $sku;
    protected $name;
    protected $price;
    protected $type;
    protected $data;
    

    public function __construct($sku, $name, $price, $type, $data){
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->type = $type;
        $this->setData($data);
    }
    public function getSKU(){
        return $this->sku;
    }

    public function setSKU($sku){
        $this->sku = $sku;
    }
    public function getType(){
        return $this->type;
    }
    public function setType($type){
        $this->type = $type;
    }
    public function getName(){
        return $this->name;
    }
    public function setName($name){
        $this->name = $name;
    }
    public function getPrice(){
        return $this->price;
    }
    public function setPrice($price){
        $this->price =$price;
    }
    abstract protected function setData($data);
    abstract protected function getData();
}









?>
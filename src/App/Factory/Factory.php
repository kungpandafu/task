<?php
namespace App\Factory;
use App\Models\DiskModel;
use App\Models\FurnitureModel;
use App\Models\Product;
class Factory{
    public static function create($object, ...$args){

        $object = 'App\Models\\'. ucfirst(strtolower($object))."Model";
        
        if( class_exists($object)){
    
            return new $object(...$args);
        }
        else{
            echo json_encode([class_exists($object), "message"=> "Invalid product type"]);
        }
    }
}


?>
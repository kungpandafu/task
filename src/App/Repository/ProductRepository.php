<?php

namespace App\Repository;
use App\Factory\Factory;
use App\Database\QueryBuilder;
use App\Models\Product;
use App\Database\Database;

class ProductRepository{

    
    private $queryBuilder;

    public function __construct(){
        $this->queryBuilder = new QueryBuilder("products");
    }

        public function getProducts(){
            
           $rows = $this->queryBuilder->select("*")->get();
            $products=[];

            foreach($rows as $row)
        {

            $product = Factory::create($row->type, $row->sku, $row->name, $row->price,$row->type, $row->data);
               
            if($product !== null){
                $products[] = $product;
            }
            else {
                error_log("Invalid Product!:" . $row->type);
                continue;
            }

      
        }
        return $products;

    }
    public function insertProduct(Product $product){
        $data = [
            'type' => $product->getType(),
            'sku' => $product->getSKU(),
            'name' => $product ->getName(),
            'price' => $product->getPrice(),
            'data' => json_encode($product->getData())
        ];

        

        $this->queryBuilder->insert( $data);

        return 1;

    }
    public function getProductBySku($sku){
        $products = [];
        $rows = $this->queryBuilder->select("*")->where("sku","=", $sku)->get();
      
        if(count($rows) === 0){
          
            return null ;
        }
        foreach($rows as $row){
            $product = Factory::create($row->type, $row->sku, $row->name, $row->price, $row->type, $row->data);
     
            $products[] = $product;
        }
        return $product;
      
     
    }
    public function deleteProductsBySku($skus){
        foreach ($skus as $sku){
            $product = $this->getProductBySku($sku);
            
            if($product !== null){
                $skusToDelete[] = $product->getSKU();
            }
        }
        if(empty($skusToDelete)){
            return 0;
        }
        $this->queryBuilder->delete($skusToDelete);

        return true;
    }

}


?>
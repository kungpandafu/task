<?php


namespace App\Controllers;

use App\Repository\ProductRepository;
use App\Factory\Factory;
class ProductsController
{

    private $productRepository;

    public function __construct(){
        $this->productRepository = new ProductRepository();
    }


    public function handleGetProductsRequest(){

        $products =  $this->productRepository->getProducts();
        if(empty($products)) return json_encode("No Products!");
        $json = array_map(function($product){
            return [ 
                     
                     'sku' => $product->getSKU(),
                     'name' => $product->getName(),
                     'price' => $product ->getPrice(),
                     'type' => $product->getType(),
                     'attributes' => $product -> getData(),     

        ];
        }, $products);

        return json_encode($json, JSON_PRETTY_PRINT);
       
    }

    public function handleAddProductsRequest($productsData){
       $product = Factory::create($productsData->type, $productsData->sku, $productsData->name, $productsData->price,$productsData->type, $productsData->attributes);
        
        try{
        $this->productRepository->insertProduct($product);
        return http_response_code(200);
        }
      catch(Exception $e){
        throw new Exception($e);
      }
     
    }

    public function handleCheckProductSkuRequest($productsData){
       
        return $this->productRepository->getProductBySku($productsData->sku);
    }

    public function handleBulkDeleteProductsRequest($productsData){

        return $this->productRepository->deleteProductsBySku($productsData->skus);
      
    }
}





?>
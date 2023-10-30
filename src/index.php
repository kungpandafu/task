<?php
require_once 'autoload.php';

Autoloader::register();

use App\Web\Router;
use App\Web\Request;
use App\Controllers\ProductsController;

$router = new Router(new Request);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$router->get('/api/v1/products', function() {  
 $controller = new ProductsController;

 return $controller->handleGetProductsRequest();

});


$router->post('/api/v1/products/add', function($request) {


  $required = ['sku','type','name','price','attributes'];
  $json_data = json_decode(file_get_contents('php://input'));
  foreach($required as $r ){
    if(!property_exists($json_data,$r)){
      http_response_code(400);
      return json_encode(['error' => "sku, type,name, price and attributes are required json keys!"]);
     
    }
  }
  $controller = new ProductsController;
  return $controller->handleAddProductsRequest($json_data);
});

$router->post('/api/v1/products/delete', function($request) {
  

  $required = ['skus'];
  $json_data = json_decode(file_get_contents('php://input'));
  foreach($required as $r ){
    if(!property_exists($json_data,$r)){
      http_response_code(400);
      return json_encode(['error' => "skus is required key -> it should contain an array of SKU's to delete!"]);
     
    }}


    $controller = new ProductsController;
    return $controller->handleBulkDeleteProductsRequest($json_data);
});

$router->post('/api/v1/products/checksku', function($request) {
 

  $required = ['sku'];
  $json_data = json_decode(file_get_contents('php://input'));

  foreach($required as $r ){
    if(!property_exists($json_data,$r)){
      http_response_code(400);
      return json_encode(['error' => "sku is required json key!"]);
     
    }}

  $controller = new ProductsController;
  return $controller->handleCheckProductSkuRequest($json_data);
});

?>

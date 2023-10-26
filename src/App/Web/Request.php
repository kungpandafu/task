<?php

namespace App\Web;

use App\Web\IRequest;

class Request implements IRequest
{

    function __construct(){
        $this->selfBootstrap();
    }

    private function selfBootstrap(){
      foreach($_SERVER as $k => $v){
          $this->{$this->toCamelCase($k)} = $v;
       }
    }

    private function toCamelCase($str){
        $res = strtolower($str);

        preg_match_all('/_[a-z]/', $res, $matches);
        foreach($matches[0] as $match){

            $c = str_replace('_', '', strtoupper($match));
            $res = str_replace($match, $c, $res);
        }
        return $res;
    }

    public function getRequestBody(){
        if($this->requestMethod == "POST"){
             $requestBody = array();

             foreach($_POST as $k => $v)
             {
                $requestBody[$k] = filter_input(INPUT_POST, $k, FILTER_SANITIZE_SPECIAL_CHARS);
             }
             return $requestBody;
        }
        if($this->requestMethod == "GET"){
            return;
        }
    }
}
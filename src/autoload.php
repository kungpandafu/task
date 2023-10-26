<?php

class Autoloader{
    public static function register()
    {
        spl_autoload_register([__CLASS__, 'load']);
    }
    public static function load($class)
    {
        $baseDirectory = __DIR__ . '/';
        $file = $baseDirectory . str_replace('\\', '/', $class) . '.php';
        if (file_exists($file)) {
            require $file;
        } else {
            echo "Autoloader: Class not found - $class<br>";
            echo "File path: $file<br>";
        }
    }
}

?>
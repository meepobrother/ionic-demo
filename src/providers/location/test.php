<?php
require './framework/bootstrap.inc.php';

load()->func('cache');

$log = cache_load('location', true);
$log = !empty($log) ? $log : array();

$__input = $_GPC['__input'];
if (!empty($__input)) {
    $log[] = $__input;
    cache_write('location', $log);
} else {
    $log[] = 'get';
    cache_write('location', $log);
}

if($_GET['act']=='clear'){
    $log = array();
    $log[] = 'clear';
    cache_write('location', $log);
}
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT,DELETE');
$data = array();
$data['log'] = $log;
$data['status'] = 1;
$data['_GPC'] = $_GPC;
die(json_encode($data));

<?php
$nameDir = './records';
$nameFile = $nameDir."/records.txt";

$ansv = file_get_contents($nameFile);
$rec = "";
$lvl = "";
$sLvl = "";
parse_str(file_get_contents($nameFile), $records);
$rec3 = $records['3x3'];
$rec4 = $records['4x4'];
$rec5 = $records['5x5'];


/* Здесь проверяется существование переменных */


if(isset($_REQUEST['record']))$rec = $_REQUEST['record'];
if(isset($_REQUEST['lvl'])) $lvl = $_REQUEST['lvl'];

if(!is_dir($nameDir)) {
	mkdir($nameDir, 0777, true);
}
if($lvl == '3x3'){
    $rec3 = $rec3 = '-' ? $rec : $rec3;
    $rec3 = $rec3 < $rec ? $rec3 : $rec;
}else if($lvl == '4x4'){
    $rec4 = $rec4 = '-' ? $rec : $rec4;
    $rec4 = $rec4 < $rec ? $rec4 : $rec;
}else if($lvl == '5x5'){
    $rec5 = $rec5 = '-' ? $rec : $rec5;
    $rec5 = $rec5 < $rec ? $rec5 : $rec;
}

$ansv = '3x3='.$rec3.'&4x4='.$rec4.'&5x5='.$rec5;

file_put_contents($nameFile, $ansv);



?>
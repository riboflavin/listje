<?
//connect to database
$req_db = $_ENV['REQ_DB'];
$req_user = $_ENV['REQ_USER'];
$req_pw = $_ENV['REQ_PW'];
$req_table = $_ENV['REQ_TABLE'];

@$db = mysql_connect($req_db,$req_user,$req_pw);
@$db_selected = mysql_select_db($req_table,$db);
if (!($db && $db_selected)) {echo "Couldn't connect to database."; print_r($req_db); print_r($req_user); print_r($req_pw); print_r($req_table); die;}
//

elseif (
    $_SERVER['REQUEST_URI'] == ""
    || $_SERVER['REQUEST_URI'] == "/"
   )
{
//generate a list id
$possible = '0123456789abcdefgjkmnpq';
$code = '';
$i = 0;
while ($i < 5) { 
$code .= substr($possible, mt_rand(0, strlen($possible)-1), 1);
$i++;
}

$sql = "INSERT INTO slists (list_id,items) VALUES ('".$code."','".$list_items."')";
$result = mysql_query($sql);
$list_id = $code;
header("location: http://listje.com/".$code."#new");
//if (!$result) {
//    $message  = 'Invalid query: ' . mysql_error() . "\n";
//    $message .= 'Whole query: ' . $sql;
//    die($message);
//}
}

elseif (
     $_SERVER['REQUEST_URI'] != "bg/rotator.php"
    || $_SERVER['REQUEST_URI'] == "/bg/rotator.php"       
)        
{
    $list_id = substr(strrchr($_SERVER['REQUEST_URI'], '/'), 1);
    if (strpos($list_id,'#new')) {$new = '#new';}
    $list_id = str_replace('#new','',$list_id);
    $sql = "SELECT * FROM slists WHERE list_id = '".$list_id."' LIMIT 1"; 
    $result = mysql_query($sql);
    $row = mysql_fetch_array($result);
    $title = $row['title'];
    if ($title == "") {$title = "untitled list";}
    include("main.html".$new);
    }
?>
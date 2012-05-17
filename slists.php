<?
//connect to database
$req_db = $_ENV['REQ_DB'];
$req_user = $_ENV['REQ_USER'];
$req_pw = $_ENV['REQ_PW'];
$req_table = $_ENV['REQ_TABLE'];

@$db = mysql_connect($req_db,$req_user,$req_pw);
@$db_selected = mysql_select_db($req_table,$db);
if (!($db && $db_selected)) {echo "Couldn't connect to database."; die;}
//

if ($_GET['listid'][0]) {$_GET['listid'] = $_GET['listid'][0];}
$list_id = preg_replace("/[^0123456789abcdefgjkmnpq]/","", $_GET['listid']);

$sql = "SELECT * FROM slists WHERE list_id = '".$list_id."' LIMIT 1"; 
$result = mysql_query($sql);
//if (!$result) {
//    $message  = 'Invalid query: ' . mysql_error() . "\n";
//    $message .= 'Whole query: ' . $sql;
//    die($message);
//}
$num_rows = mysql_num_rows($result);
if($num_rows == 0) {$list_id = "";}

$list_items = $_GET['listitems'];
$list_items = addslashes($list_items);
$title = $_GET['title'];
$title = addslashes($title);

if (($list_items == "")
    && ($title == ""))
{
$sql = "SELECT * FROM slists WHERE list_id = '".$list_id."' LIMIT 1"; 
$result = mysql_query($sql);
$row = mysql_fetch_array($result);
$sendtitle = str_replace(',','\&xc',$row['title']);
$senditems = str_replace(',','\&xc',$row['items']);
echo "got,".$sendtitle.",".$senditems;
}

else
{
$sql = "UPDATE slists SET items='".$list_items."', title='".$title."' WHERE list_id = '".$list_id."'"; 
$result = mysql_query($sql);
echo "saved,".$list_id;
}

mysql_close($db);
?>
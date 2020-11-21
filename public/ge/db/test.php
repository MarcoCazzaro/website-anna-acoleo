<?php
  try
  {
	$lingua_corrente = "it";
	if(isset($_COOKIE['lingua_sito']))
	{
		$lingua_corrente = $_COOKIE['lingua_sito'];
	}
	
  	include 'clsConnessione.php';
	include 'clsBioElenco.php';
	$db = new ConnessioneDB();
	if (!$db->connetti())
	{
		die("Errore connessione DB");
	}
	
    print " <html>
	<head>
		<meta charset=\"Unicode UTF-8\"/>
		<meta name=\"keywords\" CONTENT=\"debora antonello, debora, antonello, deboraantonello\">
		<title>TEST</title>
	</head>
	<body>";
	
	$bio = new BioElenco($db, "premi", "it");	
	if ($bio->apri())
	{
		/*$righe = ;		*/
		foreach($bio->righeBio as $riga)
		{
			print $riga->evento . "<br />";
		}
	}
	else
	{
		print "chiuso<br />";
	}
	unset($bio);
    print "</body></html>";
	$db->disconnetti();
    $db = NULL;
  }
  catch(Exception $e)
  {
    print 'Exception : '.$e->getMessage();
  }
?>
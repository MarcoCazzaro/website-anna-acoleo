<?php
class ConnessioneDB
{
	// parametri per la connessione al database
	private $nomehost = "62.149.150.232";
	private $nomedb   = "Sql858544_1";
	private $nomeuser = "Sql858544";
	private $frasenascosta = "hjchudljy4";

	// controllo sulle connessioni attive
	private $attiva = false;
	private $connessione = NULL; 

	// funzione per la connessione a MySQL
	public function connetti()
	{
		if(!$this->attiva)
		{
			if ($this->connessioneLocale())
			{
				$this->nomehost = "localhost";
				//$this->nomedb   = "Sql858544_1";
				$this->nomeuser = "root";
				$this->frasenascosta = "a1b2c3d4";
			}
			$this->connessione = new mysqli($this->nomehost,$this->nomeuser,$this->frasenascosta,$this->nomedb);
			if ($this->connessione->connect_error) {
			    die("Connection failed: " . $nomehost . " - " . $nomeuser . " - " . $this->connessione->connect_error);
			    return false;
			}
			else
			{
				$this->connessione->set_charset("utf8");
				return true;
			}
		}
		else
		{
			return true;
		}
	}
	
	public function disconnetti()
	{
        if($this->attiva)
        {
			if($this->connessione->close())
            {
				$this->attiva = false;
				return true;
            }
			else
			{
				return false;
            }
        }
	}
	
	public function query($sql)
	{
		if(isset($this->attiva))
		{
			$result = $this->connessione->query($sql);
			$righe = $this->fetch_all($result);
			return $righe;
		}
		else
		{
			return false;
		}
	}
	
	public function connessioneLocale()
	{
		$iplocale = array( '127.0.0.1', '::1', 'www.3380.it' );
		if( in_array( $_SERVER['REMOTE_ADDR'], $iplocale) )
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public function cartellaRoot()
	{
		if ($this->connessioneLocale())
		{
			return "/Kekko/";
		}
		else
		{
			return "/";
		}
	}
	
	private function fetch_all($result)
	{
	   $rows = array();
	   while ($rows[] = $result->fetch_assoc());
	   $temp = array_pop($rows);
	   return $rows;
	}
}
?>

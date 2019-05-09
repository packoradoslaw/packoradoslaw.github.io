window.fbAsyncInit = function() {
    FB.init({
      appId      : '421424038643764',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   function statusChangeCallback(response){
     if(response.status === 'connected'){
       wyswietl(true);
       testAPI();
     } else {
       wyswietl(false);
     }
   }
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  function testAPI(){
    FB.api('/me?fields=name,email,birthday,picture{url},first_name,last_name', function(response){
      if(response && !response.error){
        console.log(response);
        wyswietl_dane(response);
      }
    })
  }

  function wyswietl_dane(user){
    let dane = `
		<table style="margin-left: auto; margin-right: auto; text-align: left; padding:15px">
		<tr><td colspan="2" style="text-align: center">Twoje dane:</td></tr>
		<tr><td>Imię</td><td>${user.first_name}</td></tr>
		<tr><td>Nazwisko</td><td>${user.last_name}</td></tr>
		<tr><td>ID</td><td>${user.id}</td></tr>
		<tr><td>E-mail</td><td>${user.email}</td></tr>
		<tr><td>Data urodzenia</td><td>${user.birthday}</td></tr>
		<tr><td>Zdjęcie</td><td><img src="${user.picture.data.url}"/></td></tr>
		</table>
		`;
    document.getElementById('app').innerHTML = dane;
  }

  function wyswietl(czy_zalogowany){
    if(czy_zalogowany){ 
      document.getElementById('logout').style.display = 'block';
      document.getElementById('fb-btn').style.display = 'none';
    } else {  
      document.getElementById('logout').style.display = 'none';
      document.getElementById('fb-btn').style.display = 'block';
      document.getElementById('app').innerHTML = `Zaloguj się przyciskiem w prawym górnym rogu strony`;
    }
  }

  function wyloguj(){
    FB.logout(function(response){
      wyswietl(false);
    });
  }
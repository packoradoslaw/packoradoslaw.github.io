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
    FB.api('/me?fields=email,picture{url},first_name,last_name', function(response){
      if(response && !response.error){
        console.log(response);
        wyswietl_dane(response);
      }
    })
  }

  function wyswietl_dane(user){
    let dane = `
		<table style="margin-left: auto; margin-right: auto; text-align: left">
		<tr style="padding-bottom:15px"><td colspan="2" style="text-align: center">Twoje dane:</td></tr>
		<tr><td style="padding-right:10px">Imię</td><td>${user.first_name}</td></tr>
		<tr><td style="padding-right:10px">Nazwisko</td><td>${user.last_name}</td></tr>
		<tr><td style="padding-right:10px">ID</td><td>${user.id}</td></tr>
		<tr><td style="padding-right:10px">E-mail</td><td>${user.email}</td></tr>
		<tr><td style="padding-right:10px">Zdjęcie</td><td><img src="${user.picture.data.url}"/></td></tr>
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
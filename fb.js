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
       console.log('Zalogowany');
       wyswietl(true);
       testAPI();
     } else {
       console.log('Niezalogowany');
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
		Witaj, ${user.name}!
        Imię: ${user.first_name}
        Nazwisko: ${user.last_name}
        ID: ${user.id}</li>
        Email: ${user.email}
        Zdjęcie profilowe: <img src="${user.picture.data.url}"/>
    `;
    document.getElementById('app').innerHTML = dane;
  }

  function wyswietl(czy_zalogowany){
    if(czy_zalogowany){ 
      document.getElementById('logout').style.display = 'block';
      document.getElementById('app').style.display = 'block';
      document.getElementById('fb-btn').style.display = 'none';
    } else {  
      document.getElementById('logout').style.display = 'none';
      document.getElementById('app').style.display = 'none';
      document.getElementById('fb-btn').style.display = 'block';
      // document.getElementById('naglowek').innerHTML = `Nie jesteś zalogowany(a), zaloguj się!`;
    }
  }

  function wyloguj(){
    FB.logout(function(response){
      wyswietl(false);
    });
  }
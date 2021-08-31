//getting the DOM elements
var elapsedTime = document.querySelector("#elapsed");
var homeTeamImage = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamImage = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoal = document.querySelector("#goals");
var leagueName= document.querySelector("#leagueName");
var leagueCountry= document.querySelector("#leagueCountry");
var leagueLogo= document.querySelector("#leagueLogo");
var matchTable = document.querySelector("#matchTable");



//the functions to create an element
function addMatchTile(data){
    //createing the tile div
    var matchtile = document.createElement('div');
    matchtile.classList.add("match-tile");

    //creating the home match box
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");
    //creating the image and the text
    var homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['teams']['home']['name'];
    var homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src=data['teams']['home']['logo'];
    homeTeam.appendChild(homeTileTeamLogo);
    homeTeam.appendChild(homeTileTeamName);

    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");
    //creating the image and the text
    var awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['teams']['away']['name'];
    var awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src=data['teams']['away']['logo'];
    awayTeam.appendChild(awayTileTeamLogo);
    awayTeam.appendChild(awayTileTeamName);
    //creating the league info
    var leagueInfo = document.createElement('div');
    matchtile.classList.add("league");
    //creating the image and the text
    var officialLeagueName = document.createElement('p');
    officialLeagueName.innerHTML = data['league']['name'];
    var officialLeagueLogo = document.createElement('img');
    officialLeagueLogo.src =data['league']['logo'];
    leagueInfo.appendChild(officialLeagueName);
    leagueInfo.appendChild(officialLeagueLogo);


    //createing the score
    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " - " + data['goals']['away'];

    //append all the element to the parent
    matchtile.appendChild(leagueInfo);
    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(awayTeam);

    matchTable.appendChild(matchtile);
}
//fetching the data
fetch("https://v3.football.api-sports.io/fixtures?date=2021-08-31", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "7c8b6208c94aaaaf7861641703244162"
    }
})
.then(response => response.json().then(data => {
    var matchesList = data['response'];
    var fixture = matchesList[0]['fixture'];
    var goals = matchesList[0]['goals'];
    var teams = matchesList[0]['teams'];
    var league = matchesList[0]['league'];
    console.log(matchesList.length);
   //Now let's set our first match
   leagueName= league['name'];
   leagueLogo= league['logo'];
   
   homeTeamImage.src = teams['home']['logo'];
   homeTeamName.innerHTML = teams['home']['name'];
   awayTeamImage.src = teams['away']['logo'];
   awayTeamName.innerHTML = teams['away']['name'];
   lastMatchGoal.innerHTML = goals['home']+ " - " + goals['away'];

   for(var i = 1; i<matchesList.length;i++){
       addMatchTile(matchesList[i]);
   }

}))
.catch(err => {
    console.log(err);
});

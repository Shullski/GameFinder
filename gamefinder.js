var chosenGenres = [];
var genreLimit = 3;
var GAMES = [];
var matchedGames = [];

//game prototype
function Game(title, genres, description) {
    this.title = title;
    this.genres = genres;
    this.description = description;
    this.relevance = 0;
    //add every game to the GAMES array
    GAMES.push(this);
    this.isMatch = function(userGenres) {
      var matchCount = 0;
      for(var i = 0; i < userGenres.length; i++) {
        for(var j = 0; j < this.genres.length; j++) {
          if(userGenres[i] === this.genres[j]) matchCount++;
        }
      }
      this.relevance = matchCount;
      return matchCount;
    }
}

//games-----------------
var pubgDescription = 'PLAYERUNKNOWNS BATTLEGROUNDS is a battle royale shooter that pits 100 players against each other in a struggle for survival. Gather supplies and outwit your opponents to become the last person standing.';
var pubg = new Game('Player Unknowns Battlegrounds', ['action', 'shooter', 'strategy'], pubgDescription);

var wowDescription = 'Players control a character avatar within a game world in third- or first-person view, exploring the landscape, fighting various monsters, completing quests, and interacting with non-player characters (NPCs) or other players.';
var WoW = new Game('World of Warcraft', ['multiplayer', 'RPG', 'adventure', 'strategy'], wowDescription);

var fortniteDescription = 'Fortnite Battle Royale is the FREE 100-player PvP mode in Fortnite. One giant map. A battle bus. Fortnite building skills and destructible environments combined with intense PvP combat.';
var fortnite = new Game('Fortnite', ['action', 'shooter', 'strategy'], fortniteDescription);

var lolDescription = 'Players assume the role of an unseen "summoner" that controls a "champion" with unique abilities and battle against a team of other players or computer-controlled champions.';
var LoL = new Game('League of Legends', ['action', 'strategy', 'multiplayer'], lolDescription);

var dotaDescription = 'Dota 2 is a multiplayer online battle arena (MOBA) video game in which two teams of five players compete to collectively destroy a large structure defended by the opposing team known as the "Ancient", whilst defending their own.';
var dota = new Game('Dota 2', ['action', 'strategy', 'multiplayer'], dotaDescription);

var gtaDescription = 'Players complete missions—linear scenarios with set objectives—to progress through the story. Outside of the missions, players may freely roam the open world.';
var gta = new Game('Grand Theft Auto V', ['action', 'adventure', 'shooter'], gtaDescription);

var rainbowSixDescription = 'Players control an operator from the Rainbow team. Different operators have different nationalities, weapons, and gadgets. The game features an asymmetrical structure whereby the teams are not always balanced in their ability choices.';
var rainbowSix = new Game('Rainbow Six: Seige', ['action', 'shooter', 'strategy', 'multiplayer'], rainbowSixDescription);

var overwatchDescription = 'Overwatch features squad-based combat with two opposing teams of six players each. Players choose one of several hero characters, each with their own unique abilities and role classes.';
var overwatch = new Game('Overwatch', ['action', 'shooter', 'multiplayer', 'strategy'], overwatchDescription);

var planetCoasterDescription = 'Planet Coaster is a construction and management simulation video game. Similar to its spiritual predecessor, the game allows players to build different theme park rides and roller-coasters.';
var planetCoaster = new Game('Planet Coaster', ['strategy', 'adventure'], planetCoasterDescription);

var skyrimDescription = 'an action role-playing game, playable from either a first or third-person perspective. The player may freely roam over the land of Skyrim which is an open world environment consisting of wilderness expanses, dungeons, cities, towns, fortresses and villages.';
var skyrim = new Game('The Elder Scrolls V: Skyrim', ['action', 'adventure', 'RPG'], skyrimDescription);

var falloutDescription = 'The player assumes control of a character referred to as the "Sole Survivor", who emerges from a long-term cryogenic stasis in Vault 111, an underground nuclear fallout shelter. After witnessing the murder of their spouse and kidnapping of their son, the Sole Survivor ventures out into the Commonwealth to search for their missing child.';
var fallout = new Game('Fallout 4', ['shooter', 'RPG', 'adventure', 'action'], falloutDescription);

//=======================

function bubbleSort(arr) {
  for(var i = 0; i < arr.length -1; i++) {
     for(var j = 0; j < arr.length-1; j++) {
       if(arr[j].relevance < arr[j+1].relevance) {
         //swap
          var temp = arr[j+1];
          arr[j+1] = arr[j];
          arr[j] = temp;
       }
     }
   }
   return arr;
}

/*===============*/
$(document).ready(function(){
  //RANDOM TIMING FOR GLITCH EFFECT------
  //ANIMATE TO SECOND SCREEN-------------
  $('.startUnder').click(function(){
    $('.header').addClass('slideOut');
    $('.input').addClass('slideIn');
  });

  //DONT ALLOW MORE THAN 3 GENRE SELECTIONS
  $('input').on('change', function() {
     if($("input:checked").length >genreLimit) this.checked = false;
  });

  //POPULATE FAVORITE GENRES ARRAY-------
  $('.calculateBottom').on('click', function() {
    chosenGenres = []; //empty array
    matchedGames = [];
    var matches = 0;

    //ensure only 3 selected
    $("input:checked").each(function(index){
      chosenGenres[index] = $(this).attr('id');
    });

    //populate recommended games array
    for(var i = 0; i < GAMES.length; i++) {
      GAMES[i].isMatch(chosenGenres);
      if (GAMES[i].relevance) {
        matchedGames[matches] = GAMES[i];
        matches++;
      }
    }

    //organize results based on relevance
    matchedGames = bubbleSort(matchedGames);
    //remove previous recommendations
    $('.recommendedList').empty();

    //generate list of games
     for(var i = 0; i < matchedGames.length;i++) {
       $('.recommendedList').append(
         "<li class = 'recommendedGame' id ='" + i + "'>" +
         "<h3>" + matchedGames[i].title + "</h3>" +
         "<p>" + matchedGames[i].description + "</p>" +
         "<span></span>" +
         "</li>"
       );
     }

     //Give gaves their hearts and genres
     for(var i = 0; i < matchedGames.length; i++) {
       var targetH3 = $('#' + i).find('h3');
       var targetSpan = $('#' + i).find('span');
       for(var j = 0; j < matchedGames[i].relevance; j++) {
         $(targetH3).after("<img src = 'images/pixelHeart.svg' width = '20px'>");
       }
       for(var j = 0; j < matchedGames[i].genres.length; j++) {
         $(targetSpan).append(' | ' + matchedGames[i].genres[j]);
       }
     }
     $('.recommendedList').fadeIn(500);
     if(matchedGames.length == 0) $('.recommendedList').fadeOut(0);
  });

  //SMOOTH SCROLLING---------------------
  $('a[href*="#"]').on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      $('html, body').stop().animate({
        scrollTop: ($(hash).offset().top - $('.nav').height() - 10)
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        //window.location.hash = hash;
      });
    }
  });
});

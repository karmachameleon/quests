$(document).ready(function(){
  //hide extraneous elements, automatically assign color icons
  $(".reset").hide();
  $(".bdbl, .gmdq, .tumbl").addClass("hideCampaign");
  addIcons();
  $(".hidden").removeClass("hidden");
  stripe();

  //assign variables
  var bluQ = $(".questlist").children(".b");
  var oraQ = $(".questlist").children(".o");
  var greQ = $(".questlist").children(".g");
  var redQ = $(".questlist").children(".r");
  var golQ = $(".questlist").children(".y");
  var purQ = $(".questlist").children(".p");
  var silQ = $(".questlist").children(".s");
  var blaQ = $(".questlist").children(".k");

  var nonblu = $(".questlist").children("div:not('.b')");
  var nonora = $(".questlist").children("div:not('.o')");
  var nongre = $(".questlist").children("div:not('.g')");
  var nonred = $(".questlist").children("div:not('.r')");
  var nongol = $(".questlist").children("div:not('.y')");
  var nonpur = $(".questlist").children("div:not('.p')");
  var nonsil = $(".questlist").children("div:not('.s')");
  var nonbla = $(".questlist").children("div:not('.k')");

  var firstquests = $("#onequests").children("div");
  var secondquests = $("#twoquests").children("div");
  var thirdquests = $("#threequests").children("div");
  var fourthquests = $("#fourquests").children("div");
  var fifthquests = $("#fivequests").children("div");

  var xpVals = $(".15, .20, .25, .30, .35, .40, .45, .50, .55, .60");
  var levels = [0, "#onequests", "#twoquests", "#threequests", "#fourquests"];

  var quest1xp = 0;
  var quest2xp = 0;
  var quest3xp = 0;
  var quest4xp = 0;
  var quest5xp = 0;

  var plural = false;

  function addIcons() {
    $(".questlist").children(".b").append(' <img class="icon" src="icons/blue.png"> ');
    $(".questlist").children(".o").append(' <img class="icon" src="icons/orange.png"> ');
    $(".questlist").children(".g").append(' <img class="icon" src="icons/green.png"> ');
    $(".questlist").children(".r").append(' <img class="icon" src="icons/red.png"> ');
    $(".questlist").children(".y").append(' <img class="icon" src="icons/gold.png"> ');
    $(".questlist").children(".p").append(' <img class="icon" src="icons/purple.png"> ');
    $(".questlist").children(".s").append(' <img class="icon" src="icons/silver.png"> ');
    $(".questlist").children(".k").append(' <img class="icon" src="icons/black.png"> ');
  }
  function stripe() {
    var visiblequests = $(".questlist").children("div:visible");
    visiblequests.css({"background-color": "#adadad"});
    visiblequests.filter(":even").css({"background-color": "#CACACA"});
  }

  function reset() {
    $(".reset").hide();
    $("#generic").show();
    $(".bdbl").addClass("hideCampaign");
    $("#BDBLtoggle").text('Show quests from Big Lake');
    $(".gmdq").addClass("hideCampaign");
    $("#GMDtoggle").text('Show quests from GMD');
    $(".tumbl").addClass('hideCampaign');
    $("tumblrtoggle").text('Show quests from Tumblr');
    $(".hideColor, .hideSet, .hide1, .hide2, .hide3, .hide4, .hide5").removeClass("hideColor hideSet hide1 hide2 hide3 hide4 hide5");
    $("#onequests, #twoquests, #threequests, #fourquests, #fivequests").children("div").children("span").addClass("hideXP");
    $(".chosen").removeClass("chosen");
    $(".deselect").removeClass("deselect");
    $(".text").text("").show();
    $("select").val("default");

    clearChoices();
    makeNeutral();
    stripe();
  }

  $("#reset").on("click", function() {
    reset();
  });

  $("#recentclear").on("click", function() {
    if ($("#five").find("div.chosen").length){
      $("#five").find(".choice").text("").removeClass("chosen");
      $("#fivequests").find(".chosen").removeClass("chosen");
      $("#fivequests").find(".highlight").removeClass("highlight");
      $("#fivequests").children("div").children("span").addClass("hideXP");
      $(".hide5").removeClass("hide5");
      quest5xp = 0;
    }
    else if ($("#four").find(".chosen").length){
      $("#four").find(".choice").text("").removeClass("chosen");
      $("#fourquests").find(".chosen").removeClass("chosen");
      $("#fourquests").find(".highlight").removeClass("highlight");
      $("#fourquests").children("div").children("span").addClass("hideXP");
      $(".hide4").removeClass("hide4");
      quest4xp = 0;
    }
    else if ($("#thr").find(".chosen").length){
      $("#thr").find(".choice").text("").removeClass("chosen");
      $("#threequests").find(".chosen").removeClass("chosen");
      $("#threequests").find(".highlight").removeClass("highlight");
      $("#threequests").children("div").children("span").addClass("hideXP");
      $(".hide3").removeClass("hide3");
      quest3xp = 0;
    }
    else if ($("#two").find(".chosen").length){
      $("#two").find(".choice").text("").removeClass("chosen");
      $("#twoquests").find(".chosen").removeClass("chosen");
      $("#twoquests").find(".highlight").removeClass("highlight");
      $("#twoquests").children("div").children("span").addClass("hideXP");
      $(".hide2").removeClass("hide2");
      quest2xp = 0;
    }
    else if ($("#one").find(".chosen").length){
      $("#one").find(".choice").text("").removeClass("chosen");
      $("#onequests").find(".chosen").removeClass("chosen");
      $("#onequests").find(".highlight").removeClass("highlight");
      $("#onequests").children("div").children("span").addClass("hideXP");
      $(".hide1").removeClass("hide1");
      quest1xp = 0;
    }
    calcXP();
    stripe();
  });

  //show/hide noncore quests
  //should also knock them off the menu, probably?
  $("#GMDtoggle").on("click", function() {
    $(".gmdq").toggleClass('hideCampaign');
    stripe();
    $(this).text($(this).text() == 'Show quests from GMD' ? 'Hide quests from GMD' : 'Show quests from GMD');
  });
  $("#BDBLtoggle").on("click", function() {
    $(".bdbl").toggleClass('hideCampaign');
    stripe();
    $(this).text($(this).text() == 'Show quests from Big Lake' ? 'Hide quests from Big Lake' : 'Show quests from Big Lake');
  });
  $("#tumblrtoggle").on("click", function() {
    $(".tumbl").toggleClass('hideCampaign');
    stripe();
    $(this).text($(this).text() == 'Show quests from Tumblr' ? 'Hide quests from Tumblr' : 'Show quests from Tumblr');
  });

  //swap between quest set menus
  $("#gen").on("click", function() {
    reset();
    $("select").hide();
    $("#generic").show();
  });
  $("#glass").on("click", function() {
    reset();
    $("select").hide();
    $("#gmd").show();
    $(".gmdq").removeClass('hideCampaign');
    $("#GMDtoggle").text('Hide quests from GMD');
    stripe();
  });
  $("#horizon").on("click", function() {
    reset();
    $("select").hide();
    $("#hz").show();
    $(".tumbl").removeClass('hideCampaign');
    $("#tumblrtoggle").text('Hide quests from Tumblr');
    stripe();
  });

  function showMoreQuests(){
    $(".showquests").show();
  }

  function clearChoices(){
    $(".questbox .choice").text("");
    $(".chosen").removeClass("chosen");
    $("#onequests, #twoquests, #threequests, #fourquests, #fivequests").children("div").children("span").addClass("hideXP");
    clearXP();
    clearUnsuit();
    clearHidden();
  }

  function clearHidden(){
    $(".hide1, .hide2, .hide3, .hide4, .hide5").removeClass("hide1 hide2 hide3 hide4 hide5");
  }

  function clearXP(){
    quest1xp = quest2xp = quest3xp = quest4xp = quest5xp = 0;
    calcXP();
  }

  function loseFocus(quests){
    quests.children("span").addClass("hideXP");
    quests.removeClass("chosen");
  }

  function clearUnsuit() {
    $(".unsuitable").removeClass("unsuitable");
  }

  //set form to chosen color
  //needs to remove chosen quests that don't fit
  function makeNeutral(){
    $("#color span.colortitle").text("CMWGE Quest Set Builder");
    $("#color").css({"background-color": "#ADADAD", "border-color": "#696969"});
    $(".questbox").css({"background-color": "#e0e0e0", "border-color": "#adadad"});
    $(".questbox").children("div:not('.questdata')").addClass('hideColor');
    $("#one").find(".arctitle").text("Quest One");
    $("#two").find(".arctitle").text("Quest Two");
    $("#thr").find(".arctitle").text("Quest Three");
    $("#four").find(".arctitle").text("Quest Four");
    $("#five").find(".arctitle").text("Quest Five");
  }
  function makeBlue() {
    $("#color span.colortitle").text("Blue (Bindings)");
    $("#color").css({"background-color": "#3B72C7", "border-color": "#121866"});
    $(".questbox").css({"background-color": "#6280A5", "border-color": "#073096"});
    $(".questbox").children("div:not('.bDesc')").addClass('hideColor');
    $(".bDesc, .questdata").removeClass('hideColor').show();
    $("#one").find(".arctitle").text("Bindings One");
    $("#two").find(".arctitle").text("Bindings Two");
    $("#thr").find(".arctitle").text("Bindings Three");
    $("#four").find(".arctitle").text("Bindings Four");
    $("#five").find(".arctitle").text("Bindings Five");
  }
  function makeOrange() {
    $("#color span.colortitle").text("Orange (Knight)");
    $("#color").css({"background-color": "#D46233", "border-color": "#B7381E"});
    $(".questbox").css({"background-color": "#F0A364", "border-color": "#E05929"});
    $(".questbox").children("div:not('.oDesc')").addClass('hideColor');
    $(".oDesc, .questdata").removeClass('hideColor').show();
    $("#one").find(".arctitle").text("Knight One");
    $("#two").find(".arctitle").text("Knight Two");
    $("#thr").find(".arctitle").text("Knight Three");
    $("#four").find(".arctitle").text("Knight Four");
    $("#five").find(".arctitle").text("Knight Five");
  }
  function makeGreen() {
    $("#color span.colortitle").text("Green (Otherworldly)");
    $("#color").css({"background-color": "#49A56A", "border-color": "#016923"});
    $(".questbox").css({"background-color": "#83D49E", "border-color": "#018D32"});
    $(".questbox").children("div:not('.gDesc')").addClass('hideColor');
    $(".gDesc, .questdata").removeClass('hideColor').show();
    $("#one").find(".arctitle").text("Otherworldly One");
    $("#two").find(".arctitle").text("Otherworldly Two");
    $("#thr").find(".arctitle").text("Otherworldly Three");
    $("#four").find(".arctitle").text("Otherworldly Four");
    $("#five").find(".arctitle").text("Otherworldly Five");
  }
  function makeRed() {
    $("#color span.colortitle").text("Red (Storyteller)");
    $("#color").css({"background-color": "#B03E43", "border-color": "#6B0200"});
    $(".questbox").css({"background-color": "#E86B7B", "border-color": "#911411"});
    $(".questbox").children("div:not('.rDesc')").addClass('hideColor');
    $(".rDesc, .questdata").removeClass('hideColor').show();
    $("#one").find(".arctitle").text("Storyteller One");
    $("#two").find(".arctitle").text("Storyteller Two");
    $("#thr").find(".arctitle").text("Storyteller Three");
    $("#four").find(".arctitle").text("Storyteller Four");
    $("#five").find(".arctitle").text("Storyteller Five");
  }
  function makeGold() {
    $("#color span.colortitle").text("Gold (Aspect)");
    $("#color").css({"background-color": "#FFE261", "border-color": "#F9AE19"});
    $(".questbox").css({"background-color": "#FFED90", "border-color": "#FFC023"});
    $(".questbox").children("div:not('.yDesc')").addClass('hideColor');
    $(".yDesc, .questdata").removeClass('hideColor').show();
    $("#one").find(".arctitle").text("Aspect One");
    $("#two").find(".arctitle").text("Aspect Two");
    $("#thr").find(".arctitle").text("Aspect Three");
    $("#four").find(".arctitle").text("Aspect Four");
    $("#five").find(".arctitle").text("Aspect Five");
  }
  function makePurple() {
    $("#color span.colortitle").text("Purple (Shepherd)");
    $("#color").css({"background-color": "#782C91", "border-color": "#540B75"});
    $(".questbox").css({"background-color": "#8B63B0", "border-color": "#5C2182"});
    $(".questbox").children("div:not('.pDesc')").addClass('hideColor');
    $(".pDesc, .questdata").removeClass('hideColor').show();
    $("#one").find(".arctitle").text("Shepherd One");
    $("#two").find(".arctitle").text("Shepherd Two");
    $("#thr").find(".arctitle").text("Shepherd Three");
    $("#four").find(".arctitle").text("Shepherd Four");
    $("#five").find(".arctitle").text("Shepherd Five");
  }
  function makeSilver() {
    $("#color span.colortitle").text("Silver (Emptiness)");
    $("#color").css({"background-color": "#8D8BA1", "border-color": "#4A4857"});
    $(".questbox").css({"background-color": "#A3A1AA", "border-color": "#726E85"});
    $(".questbox").children("div:not('.sDesc')").addClass('hideColor');
    $(".sDesc, .questdata").removeClass('hideColor').show();
    $("#one").find(".arctitle").text("Emptiness One");
    $("#two").find(".arctitle").text("Emptiness Two");
    $("#thr").find(".arctitle").text("Emptiness Three");
    $("#four").find(".arctitle").text("Emptiness Four");
    $("#five").find(".arctitle").text("Emptiness Five");
  }
  function makeBlack() {
    $("#color span.colortitle").text("Black (Mystic)");
    $("#color").css({"background-color": "#616167", "border-color": "#02050D"});
    $(".questbox").css({"background-color": "#817C93", "border-color": "#3E3E5B"});
    $(".questbox").children("div:not('.kDesc')").addClass('hideColor');
    $(".kDesc, .questdata").removeClass('hideColor').show();
    $("#one").find(".arctitle").text("Mystic One");
    $("#two").find(".arctitle").text("Mystic Two");
    $("#thr").find(".arctitle").text("Mystic Three");
    $("#four").find(".arctitle").text("Mystic Four");
    $("#five").find(".arctitle").text("Mystic Five");
  }

  function findFilter(same){
    level =  4;
    while (level > 0){
      if ($(levels[level]).children(".chosen").length && level != same){
        break;
      }
      level -= 1;
    }
    return levels[level];
  }

  function filter(target, hidelevel, above){
    $(".questlist div").addClass(hidelevel);
    if (!above){
      //console.log("No match found.")
      if (target.hasClass("o")) {
        oraQ.removeClass(hidelevel);
      }
      if (target.hasClass("b")) {
        bluQ.removeClass(hidelevel);
      }
      if (target.hasClass("g")) {
        greQ.removeClass(hidelevel);
      }
      if (target.hasClass("r")) {
        redQ.removeClass(hidelevel);
      }
      if (target.hasClass("y")) {
        golQ.removeClass(hidelevel);
      }
      if (target.hasClass("p")) {
        purQ.removeClass(hidelevel);
      }
      if (target.hasClass("s")) {
        silQ.removeClass(hidelevel);
      }
      if (target.hasClass("k")) {
        blaQ.removeClass(hidelevel);
      }
    }
    else{
      //console.log("Comparing to " + above);
      if (target.hasClass("o") && $(above).children(".chosen").hasClass("o")) {
        oraQ.removeClass(hidelevel);
      }
      if (target.hasClass("b") && $(above).children(".chosen").hasClass("b")) {
        bluQ.removeClass(hidelevel);
      }
      if (target.hasClass("g") && $(above).children(".chosen").hasClass("g")) {
        greQ.removeClass(hidelevel);
      }
      if (target.hasClass("r") && $(above).children(".chosen").hasClass("r")) {
        redQ.removeClass(hidelevel);
      }
      if (target.hasClass("y") && $(above).children(".chosen").hasClass("y")) {
        golQ.removeClass(hidelevel);
      }
      if (target.hasClass("p") && $(above).children(".chosen").hasClass("p")) {
        purQ.removeClass(hidelevel);
      }
      if (target.hasClass("s") && $(above).children(".chosen").hasClass("s")) {
        silQ.removeClass(hidelevel);
      }
      if (target.hasClass("k") && $(above).children(".chosen").hasClass("k")) {
        blaQ.removeClass(hidelevel);
      }
    }
    stripe();
  }

  firstquests.on("click", function() {
    loseFocus($("#onequests").children(".chosen"));
    $("#one").children(".choice").text($(this).contents().eq(0).text()).addClass("chosen");
    $(this).addClass("chosen");
    $(this).children(".hideXP").removeClass("hideXP");
    filter($(this), "hide1", findFilter(1));
    $("#twoquests").show();
    //console.log($(event.target).is("span"));
    if ($(this).hasClass("xpvar") && !($(event.target).is("span"))) {
      $(this).children().children().removeClass("highlight");
      quest1xp = 0;
      calcXP();
    }
    stripe();
  });
  secondquests.on("click", function() {
    loseFocus($("#twoquests").children(".chosen"));
    $("#two").children(".choice").text($(this).contents().eq(0).text()).addClass("chosen");
    $(this).addClass("chosen");
    $(this).children(".hideXP").removeClass("hideXP");
    filter($(this), "hide2", findFilter(2));
    $("#threequests").show();
    if ($(this).hasClass("xpvar") && !($(event.target).is("span"))) {
      $(this).children().children().removeClass("highlight");
      quest2xp = 0;
      calcXP();
    }
    stripe();
  });
  thirdquests.on("click", function() {
    loseFocus($("#threequests").children(".chosen"));
    $("#thr").children(".choice").text($(this).contents().eq(0).text()).addClass("chosen");
    $(this).addClass("chosen");
    $(this).children(".hideXP").removeClass("hideXP");
    filter($(this), "hide3", findFilter(3));
    $("#fourquests").show();
    if ($(this).hasClass("xpvar") && !($(event.target).is("span"))) {
      $(this).children().children().removeClass("highlight");
      quest3xp = 0;
      calcXP();
    }
    stripe();
  });
  fourthquests.on("click", function() {
    loseFocus($("#fourquests").children(".chosen"));
    $("#four").children(".choice").text($(this).contents().eq(0).text()).addClass("chosen");
    $(this).addClass("chosen");
    $(this).children(".hideXP").removeClass("hideXP");
    filter($(this), "hide4", findFilter(4));
    $("#fivequests").show();
    if ($(this).hasClass("xpvar") && !($(event.target).is("span"))) {
      $(this).children().children().removeClass("highlight");
      quest4xp = 0;
      calcXP();
    }
    stripe();
  });
  fifthquests.on("click", function() {
    loseFocus($("#fivequests").children(".chosen"));
    $("#five").children(".choice").text($(this).contents().eq(0).text()).addClass("chosen");
    $(this).addClass("chosen");
    $(this).children(".hideXP").removeClass("hideXP");
    filter($(this), "hide5", findFilter(5));
    if ($(this).hasClass("xpvar") && !($(event.target).is("span"))) {
      $(this).children().children().removeClass("highlight");
      quest5xp = 0;
      calcXP();
    }
    stripe();
  });

  //dropdowns: quest sets
  $("#generic").on("change", function() {
    clearChoices();
    var input = $("#generic").val();
    if (input == "adventure"){
      $("#subtitle").text("A Scientific Adventure").hide();
      $("#subtitleII").text("");
      plural = false;
      makeBlue();
      $(".colorselect").addClass("deselect unsuitable");
      $("#blu, #gre, #gol, #sil").removeClass("deselect unsuitable");
      bluQ.removeClass('hideColor');
      nonblu.addClass('hideColor');
      showMoreQuests();
      var temp = $("#onequests .adventure.b");
      $("#one").children(".choice").text(temp.contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#twoquests .adventure.b");
      $("#two").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#threequests .adventure.b");
      $("#thr").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fourquests .adventure.b");
      $("#four").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fivequests .adventure.b");
      $("#five").children(".choice").text($(temp).addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      clearXP();
      $("span.xptotal").text("65-185");
    }
    else if (input == "looking"){
      $("#subtitle").text("Looking for Trouble").hide();
      $("#subtitleII").text("");
      plural = false;
      makeRed();
      $(".colorselect").addClass("deselect unsuitable");
      $("#red, #ora, #pur, #bla").removeClass("deselect unsuitable");
      redQ.removeClass('hideColor');
      nonred.addClass('hideColor');
      showMoreQuests();
      var temp = $("#onequests .looking.r");
      $("#one").children(".choice").text(temp.contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#twoquests .looking.r");
      $("#two").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#threequests .looking.r");
      $("#thr").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fourquests .looking.r");
      $("#four").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fivequests .looking.r");
      $("#five").children(".choice").text($(temp).addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      clearXP();
      $("span.xptotal").text("65-185");
    }
    else if (input == "journey"){
      $("#subtitle").text("A Heroic Journey").hide();
      $("#subtitleII").text("");
      plural = false;
      makeBlack();
      $(".colorselect").addClass("deselect unsuitable");
      $("#ora, #gre, #sil, #bla").removeClass("deselect unsuitable");
      blaQ.removeClass('hideColor');
      nonbla.addClass('hideColor');
      showMoreQuests();
      var temp = $("#onequests .journey.k");
      $("#one").children(".choice").text(temp.contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#twoquests .journey.k");
      $("#two").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#threequests .journey.k");
      $("#thr").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fourquests .journey.k");
      $("#four").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fivequests .journey.k");
      $("#five").children(".choice").text($(temp).addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      clearXP();
      $("span.xptotal").text("65-195");
    }
    else if (input == "bitter"){
      $("#subtitle").text("A Bittersweet Saga").hide();
      $("#subtitleII").text("");
      plural = false;
      makePurple();
      $(".colorselect").addClass("deselect unsuitable");
      $("#gol, #pur, #sil, #red").removeClass("deselect unsuitable");
      purQ.removeClass('hideColor');
      nonpur.addClass('hideColor');
      showMoreQuests();
      var temp = $("#onequests .bitter.p");
      $("#one").children(".choice").text(temp.contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#twoquests .bitter.p");
      $("#two").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#threequests .bitter.p");
      $("#thr").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fourquests .bitter.p");
      $("#four").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fivequests .bitter.p");
      $("#five").children(".choice").text($(temp).addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      clearXP();
      $("span.xptotal").text("65-195");
    }
    else {
      $(".hideSet").removeClass("hideSet");
    }
    stripe();
  });

  $("#gmd").on("change", function() {
    clearChoices();
    var selector;
    var colChar;
    var temp;
    var input = $("#gmd").val();
    if (input == "leonardo"){
      $("#subtitle").text("The Scientific Adventures of Leonardo de Montreal");
      $("#subtitleII").text("Also used for interacting with The Troublemaker as an NPC.");
      plural = true;
      makeBlue();
      $(".colorselect").addClass("deselect unsuitable");
      $("#blu, #gre, #gol, #sil").removeClass("deselect unsuitable");
      bluQ.removeClass('hideColor');
      nonblu.addClass('hideColor');
      showMoreQuests();
      colChar = ".b";
      clearXP();
      $("span.xptotal").text("65-185");
    }
    else if (input == "seizhi"){
      $("#subtitle").text("The Secret History of Seizhi Schwan");
      $("#subtitleII").text("Also used for interacting with The Angel of Fortitude as an NPC. WIP - XP data not entered yet.");
      plural = false;
      makeOrange();
      $(".colorselect").addClass("deselect unsuitable");
      $("#ora, #gre, #red, #blu").removeClass("deselect unsuitable");
      oraQ.removeClass('hideColor');
      nonora.addClass('hideColor');
      showMoreQuests();
      colChar = ".o";
      clearXP();
      $("span.xptotal").text("55-190");
    }
    else if (input == "rinley"){
      $("#subtitle").text("Having an Adventure the Rinley Yatskaya Way");
      $("#subtitleII").text("Also used for interacting with Nightmares' Angel as an NPC.\nTo play Spiritual/another Otherworldly arc with Rinley without focusing on an NPC, Jenna recommends the Scientific Adventure set.");
      plural = false;
      makeRed();
      $(".colorselect").addClass("deselect unsuitable");
      $("#red, #ora, #pur, #bla").removeClass("deselect unsuitable");
      redQ.removeClass('hideColor');
      nonred.addClass('hideColor');
      showMoreQuests();
      colChar = ".r";
      clearXP();
      $("span.xptotal").text("65-185");
    }
    else if (input == "jasper"){
      $("#subtitle").text("The Heroic Journeys of the Child of the Sun");
      $("#subtitleII").text("Also used for interacting with The Prodigy as an NPC.");
      plural = true;
      makeBlack();
      $(".colorselect").addClass("deselect unsuitable");
      $("#ora, #gre, #sil, #bla").removeClass("deselect unsuitable");
      blaQ.removeClass('hideColor');
      nonbla.addClass('hideColor');
      showMoreQuests();
      colChar = ".k";
      clearXP();
      $("span.xptotal").text("65-195");
    }
    else if (input == "miramie"){
      $("#subtitle").text("The Bittersweet Saga of Miramie Mesmer");
      $("#subtitleII").text("Also used for interacting with the Dream-Witch or the Wishing Child as an NPC.");
      plural = false;
      makeSilver();
      $(".colorselect").addClass("deselect unsuitable");
      $("#gol, #pur, #sil, #red").removeClass("deselect unsuitable");
      silQ.removeClass('hideColor');
      nonsil.addClass('hideColor');
      showMoreQuests();
      colChar = ".s";
      clearXP();
      $("span.xptotal").text("60-195");
    }
    else if (input == "chuubo"){
      $("#subtitle").text("The Marvelous Misadventures of Chuubo");
      $("#subtitleII").text("Also used for interacting with the Wishing Child or the Dream-Witch as an NPC.");
      plural = true;
      makeGreen();
      $(".colorselect").addClass("deselect unsuitable");
      $("#gre, #bla, #blu, #red").removeClass("deselect unsuitable");
      greQ.removeClass('hideColor');
      nongre.addClass('hideColor');
      showMoreQuests();
      colChar = ".g";
      clearXP();
      $("span.xptotal").text("65-175");
    } //finish!
    else if (input == "natalia"){
      $("#subtitle").text("Literary Medal-Bait: The Heartwarming, Heartrending Coming-of-Age Stories of Natalia Koutolika");
      $("#subtitleII").text("Also used for interacting with the Child of the Sun as an NPC.");
      plural = true;
      makeGold();
      $(".colorselect").addClass("deselect unsuitable");
      $("#gol, #pur, #bla, #ora").removeClass("deselect unsuitable");
      golQ.removeClass('hideColor');
      nongol.addClass('hideColor');
      showMoreQuests();
      colChar = ".y";
      clearXP();
      $("span.xptotal").text("70-190");
    }
    else if (input == "entropyII"){
      $("#subtitle").text("The Numinous Gardens of Entropy II, Magister");
      $("#subtitleII").text("Also used for interacting with the Best Friend as an NPC.");
      plural = true;
      makePurple();
      $(".colorselect").addClass("deselect unsuitable");
      $("#blu, #pur, #sil, #gol").removeClass("deselect unsuitable");
      purQ.removeClass('hideColor');
      nonpur.addClass('hideColor');
      showMoreQuests();
      colChar = ".p";
      clearXP();
      $("span.xptotal").text("65-185");
    }
    else {
      makeNeutral();
      plural = false;
      $(".colorselect").removeClass("deselect unsuitable");
      stripe();
      return;
    }
    selector = "#onequests ." + input + colChar;
    temp = $(selector);
    $("#one").children(".choice").text(temp.contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    selector = "#twoquests ." + input + colChar;
    temp = $(selector);
    $("#two").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    selector = "#threequests ." + input + colChar;
    temp = $(selector);
    $("#thr").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    selector = "#fourquests ." + input + colChar;
    temp = $(selector);
    $("#four").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    selector = "#fivequests ." + input + colChar;
    temp = $(selector);
    $("#five").children(".choice").text($(temp).addClass("chosen").contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    stripe();
  });
  $("#hz").on("change", function() {
    clearChoices();
    var input = $("#hz").val();
    if (input == "rinHZ"){
      $("#subtitle").text("The Metaphysical Investigations of Rinley Yatskaya");
      $("#subtitleII").text("The Horizon campaign is a work in progress.");
      plural = false;
      makeGreen();
      $(".colorselect").addClass("deselect unsuitable");
      $("#gre, #gol, #sil, #bla").removeClass("deselect unsuitable");
      greQ.removeClass('hideColor');
      nongre.addClass('hideColor');
      showMoreQuests();
      var temp = $("#onequests .rinHZ.g");
      $("#one").children(".choice").text(temp.contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#twoquests .rinHZ.g");
      $("#two").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#threequests .rinHZ.g");
      $("#thr").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fourquests .rinHZ.g");
      $("#four").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fivequests .rinHZ.g");
      $("#five").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      clearXP();
      $("span.xptotal").text("?");
    }
    else if (input == "sal"){
      $("#subtitle").text("Psalida Caesar's Quest Set (quest names not final)");
      $("#subtitleII").text("The Horizon campaign is a work in progress.");
      plural = false;
      makeGreen();
      $(".colorselect").addClass("deselect unsuitable");
      $("#gol").removeClass("deselect unsuitable");
      golQ.removeClass('hideColor');
      nongre.addClass('hideColor');
      showMoreQuests();
      var temp = $("#onequests .sal.y");
      $("#one").children(".choice").text(temp.contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#twoquests .sal.y");
      $("#two").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#threequests .sal.y");
      $("#thr").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fourquests .sal.y");
      $("#four").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      temp = $("#fivequests .sal.y");
      $("#five").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
      temp.addClass("chosen");
      temp.children(".hideXP").removeClass("hideXP");
      clearXP();
      $("span.xptotal").text("?");
    }
    else {
      makeNeutral();
      plural = false;
      $(".colorselect").removeClass("deselect unsuitable");
    }
    stripe();
  });

  function recolorSet(newColor, value){
    var selector = "#onequests ." + value + newColor;
    var temp = $(selector);
    $("#one").children(".choice").text(temp.contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    selector = "#twoquests ." + value + newColor;
    temp = $(selector);
    $("#two").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    selector = "#threequests ." + value + newColor;
    temp = $(selector);
    $("#thr").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    selector = "#fourquests ." + value + newColor;
    temp = $(selector);
    $("#four").children(".choice").text(temp.addClass("chosen").contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    selector = "#fivequests ." + value + newColor;
    temp = $(selector);
    $("#five").children(".choice").text($(temp).addClass("chosen").contents().eq(0).text()).addClass("chosen");
    temp.addClass("chosen");
    temp.children(".hideXP").removeClass("hideXP");
    clearXP();
  }

  //show/hide by color
  $("#blu").on("click", function() {
    var skip = false;
    if ($(this).hasClass("unsuitable")){
      $("#subtitle").show();
      if (plural){
        $("#subtitleII").text("are not suitable for use with a Bindings Arc.");
      }
      else{
        $("#subtitleII").text("is not suitable for use with a Bindings Arc.");
      }
      $(".dropdown").val("default");
      clearChoices();
      skip = true;
    }
    /*clearChoices();*/
    $(this).removeClass("deselect");
    $("button.colorselect:not('#blu')").addClass("deselect");
    makeBlue();
    bluQ.removeClass('hideColor');
    nonblu.addClass('hideColor');
    showMoreQuests();
    if (!skip){
      var value = 0;
      var colChar = ".b";
      if ($("#generic").val() != "default"){
        value = $("#generic").val();
      }
      else if ($("#gmd").val() != "default"){
        value = $("#gmd").val();
      }
      else if ($("#hz").val() != "default"){
        value = $("#hz").val();
      }
      if (value){
        recolorSet(colChar, value);
      }
      else {
        compatible("b");
      }
    }
    stripe();
  });

  $("#ora").on("click", function() {
    clearHidden();
    var skip = false;
    if ($(this).hasClass("unsuitable")){
      $("#subtitle").show();
      if (plural){
        $("#subtitleII").text("are not suitable for use with a Knight Arc.");
      }
      else{
        $("#subtitleII").text("is not suitable for use with a Knight Arc.");
      }
      $(".dropdown").val("default");
      clearChoices();
      skip = true;
    }
    $(this).removeClass("deselect");
    $("button.colorselect:not('#ora')").addClass("deselect");
    makeOrange();
    oraQ.removeClass('hideColor');
    nonora.addClass('hideColor');
    showMoreQuests();
    if (!skip){
      var value = 0;
      var colChar = ".o";
      if ($("#generic").val() != "default"){
        value = $("#generic").val();
      }
      else if ($("#gmd").val() != "default"){
        value = $("#gmd").val();
      }
      else if ($("#hz").val() != "default"){
        value = $("#hz").val();
      }
      if (value){
        recolorSet(colChar, value);
      }
      else {
        compatible("o");
      }
    }
    stripe();
  });

  $("#gre").on("click", function() {
    clearHidden();
    var skip = false;
    if ($(this).hasClass("unsuitable")){
      $("#subtitle").show();
      if (plural){
        $("#subtitleII").text("are not suitable for use with an Otherworldly Arc.");
      }
      else{
        $("#subtitleII").text("is not suitable for use with an Otherworldly Arc.");
      }
      $(".dropdown").val("default");
      skip = true;
    }
    $(this).removeClass("deselect");
    $("button.colorselect:not('#gre')").addClass("deselect");
    makeGreen();
    greQ.removeClass('hideColor');
    nongre.addClass('hideColor');
    if (!skip){
      var value = 0;
      var colChar = ".g";
      if ($("#generic").val() != "default"){
        value = $("#generic").val();
      }
      else if ($("#gmd").val() != "default"){
        value = $("#gmd").val();
      }
      else if ($("#hz").val() != "default"){
        value = $("#hz").val();
      }
      if (value){
        recolorSet(colChar, value);
      }
      else {
        compatible("g");
      }
    }
    stripe();
  });

  $("#red").on("click", function() {
    clearHidden();
    var skip = false;
    if ($(this).hasClass("unsuitable")){
      $("#subtitle").show();
      if (plural){
        $("#subtitleII").text("are not suitable for use with a Storyteller Arc.");
      }
      else{
        $("#subtitleII").text("is not suitable for use with a Storyteller Arc.");
      }
      $(".dropdown").val("default");
      clearChoices();
      skip = true;
    }
    $(this).removeClass("deselect");
    $("button.colorselect:not('#red')").addClass("deselect");
    makeRed();
    redQ.removeClass('hideColor');
    nonred.addClass('hideColor');
    if (!skip){
      var value = 0;
      var colChar = ".r";
      if ($("#generic").val() != "default") {
        value = $("#generic").val();
      }
      else if ($("#gmd").val() != "default"){
        value = $("#gmd").val();
      }
      else if ($("#hz").val() != "default"){
        value = $("#hz").val();
      }
      if (value){
        recolorSet(colChar, value);
      }
      else {
        compatible("r");
      }
    }
    stripe();
  });

  $("#gol").on("click", function() {
    clearHidden();
    var skip = false;
    if ($(this).hasClass("unsuitable")){
      $("#subtitle").show();
      if (plural){
        $("#subtitleII").text("are not suitable for use with an Aspect Arc.");
      }
      else{
        $("#subtitleII").text("is not suitable for use with an Aspect Arc.");
      }
      $(".dropdown").val("default");
      clearChoices();
      skip = true;
    }
    $(this).removeClass("deselect");
    $("button.colorselect:not('#gol')").addClass("deselect");
    makeGold();
    golQ.removeClass('hideColor');
    nongol.addClass('hideColor');
    if (!skip){
      var value = 0;
      var colChar = ".y";
      if ($("#generic").val() != "default"){
        value = $("#generic").val();
      }
      else if ($("#gmd").val() != "default"){
        value = $("#gmd").val();
      }
      else if ($("#hz").val() != "default"){
        value = $("#hz").val();
      }
      if (value){
        recolorSet(colChar, value);
      }
      else {
        compatible("y");
      }
    }
    stripe();
  });

  $("#pur").on("click", function() {
    clearHidden();
    var skip = false;
    if ($(this).hasClass("unsuitable")){
      $("#subtitle").show();
      if (plural){
        $("#subtitleII").text("are not suitable for use with a Shepherd Arc.");
      }
      else{
        $("#subtitleII").text("is not suitable for use with a Shepherd Arc.");
      }
      $(".dropdown").val("default");
      clearChoices();
      skip = true;
    }
    $(this).removeClass("deselect");
    $("button.colorselect:not('#pur')").addClass("deselect");
    makePurple();
    purQ.removeClass('hideColor');
    nonpur.addClass('hideColor');
    if (!skip){
      var value = 0;
      var colChar = ".p";
      if ($("#generic").val() != "default"){
        value = $("#generic").val();
      }
      else if ($("#gmd").val() != "default"){
        value = $("#gmd").val();
      }
      else if ($("#hz").val() != "default"){
        value = $("#hz").val();
      }
      if (value){
        recolorSet(colChar, value);
      }
      else {
        compatible("p");
      }
    }
    stripe();
  });

  $("#sil").on("click", function() {
    clearHidden();
    var skip = false;
    if ($(this).hasClass("unsuitable")){
      $("#subtitle").show();
      if (plural){
        $("#subtitleII").text("are not suitable for use with an Emptiness Arc.");
      }
      else{
        $("#subtitleII").text("is not suitable for use with an Emptiness Arc.");
      }
      $(".dropdown").val("default");
      clearChoices();
      skip = true;
    }
    $(this).removeClass("deselect");
    $("button.colorselect:not('#sil')").addClass("deselect");
    makeSilver();
    silQ.removeClass('hideColor');
    nonsil.addClass('hideColor');
    if (!skip){
      var value = 0;
      var colChar = ".s";
      if ($("#generic").val() != "default"){
        value = $("#generic").val();
      }
      else if ($("#gmd").val() != "default"){
        value = $("#gmd").val();
      }
      else if ($("#hz").val() != "default"){
        value = $("#hz").val();
      }
      if (value){
        recolorSet(colChar, value);
      }
      else {
        compatible("s");
      }
    }
    stripe();
  });

  $("#bla").on("click", function() {
    clearHidden();
    var skip = false;
    if ($(this).hasClass("unsuitable")){
      $("#subtitle").show();
      if (plural){
        $("#subtitleII").text("are not suitable for use with a Mystic Arc.");
      }
      else{
        $("#subtitleII").text("is not suitable for use with a Mystic Arc.");
      }
      $(".dropdown").val("default");
      clearChoices();
      skip = true;
    }
    $(this).removeClass("deselect");
    $("button.colorselect:not('#bla')").addClass("deselect");
    makeBlack();
    blaQ.removeClass('hideColor');
    nonbla.addClass('hideColor');
    if (!skip){
      var value = 0;
      var colChar = ".k";
      if ($("#generic").val() != "default"){
        value = $("#generic").val();
      }
      else if ($("#gmd").val() != "default"){
        value = $("#gmd").val();
      }
      else if ($("#hz").val() != "default"){
        value = $("#hz").val();
      }
      if (value){
        recolorSet(colChar, value);
      }
      else {
        compatible("k");
      }
    }
    stripe();
  });


  //possible future refinement: check for incompatability on color change then recalc XP
  function compatible(col){
    if (!$("#onequests").find(".chosen").hasClass(col)) {
      quest1xp = 0;
      $("#one").find(".choice").text("").removeClass("chosen");
      $("#onequests").find(".chosen").removeClass("chosen");
      $("#onequests").find(".highlight").removeClass("highlight");
      $("#onequests").children("div").children("span").addClass("hideXP");
      $(".hide1").removeClass("hide1");
    }
    if (!$("#twoquests").find(".chosen").hasClass(col)) {
      quest2xp = 0;
      $("#two").find(".choice").text("").removeClass("chosen");
      $("#twoquests").find(".chosen").removeClass("chosen");
      $("#twoquests").find(".highlight").removeClass("highlight");
      $("#twoquests").children("div").children("span").addClass("hideXP");
      $(".hide2").removeClass("hide2");
    }
    if (!$("#threequests").find(".chosen").hasClass(col)) {
      quest3xp = 0;
      $("#thr").find(".choice").text("").removeClass("chosen");
      $("#threequests").find(".chosen").removeClass("chosen");
      $("#threequests").find(".highlight").removeClass("highlight");
      $("#threequests").children("div").children("span").addClass("hideXP");
      $(".hide3").removeClass("hide3");
    }
    if (!$("#fourquests").find(".chosen").hasClass(col)) {
      quest4xp = 0;
      $("#four").find(".choice").text("").removeClass("chosen");
      $("#fourquests").find(".chosen").removeClass("chosen");
      $("#fourquests").find(".highlight").removeClass("highlight");
      $("#fourquests").children("div").children("span").addClass("hideXP");
      $(".hide4").removeClass("hide4");
    }
    if (!$("#fivequests").find(".chosen").hasClass(col)) {
      quest5xp = 0;
      $("#five").find(".choice").text("").removeClass("chosen");
      $("#fivequests").find(".chosen").removeClass("chosen");
      $("#fivequests").find(".highlight").removeClass("highlight");
      $("#fivequests").children("div").children("span").addClass("hideXP");
      $(".hide5").removeClass("hide5");
    }
    calcXP();
  }
  //xp tracking
  xpVals.on("click", function() {
    var value = 0;
    var was = false;
    if($(this).hasClass("highlight")){
      $(this).removeClass("highlight");
      was = true;
    }
    else {
      value = getXPvalue($(this));
    }
    if($(this).is("span") && !was){
      $(this).parent().children().removeClass("highlight");
      $(this).addClass("highlight");
    }
    if ($(this).closest("#onequests").length){
      quest1xp = value;
    }
    else if ($(this).closest("#twoquests").length){
      quest2xp = value;
    }
    else if ($(this).closest("#threequests").length){
      quest3xp = value;
    }
    else if ($(this).closest("#fourquests").length){
      quest4xp = value;
    }
    else if ($(this).closest("#fivequests").length){
      quest5xp = value;
    }
    calcXP();
  });

  xpDictionary = {"15":15, "20":20, "25":25, "30":30, "35":35, "40":40, "45":45, "50":50, "55":55, "60":60};
  function getXPvalue(e){
    var classList = e.attr('class').split(/\s+/);
    console.log(classList);
    for (item in classList){
      console.log(classList[item]);
      if (xpDictionary.hasOwnProperty(classList[item])) {
        return xpDictionary[classList[item]];
      }
    }
    return 0;
  }

  function calcXP(){
    var xpTotal = quest1xp + quest2xp + quest3xp + quest4xp + quest5xp;
    $("span.xptotal").text(xpTotal);
    $("#one").find(".xpcount").text(quest1xp == 0 ? "?" : quest1xp);
    $("#two").find(".xpcount").text(quest2xp == 0 ? "?" : quest2xp);
    $("#thr").find(".xpcount").text(quest3xp == 0 ? "?" : quest3xp);
    $("#four").find(".xpcount").text(quest4xp == 0 ? "?" : quest4xp);
    $("#five").find(".xpcount").text(quest5xp == 0 ? "?" : quest5xp);
  }
});

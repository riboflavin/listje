$(document).ready(function() {
  
getinput();

$("#helpclose").bind('click',function() {helptog();});
$("#helpbutton").bind('click',function() {helptog();});
$("#savebutton").bind('click',function() {saveinput();});
var imageArray = ['/images/tick.png', '/images/spinner.gif', '/images/blueback.png', '/images/disk.png', '/images/help.png'];
var hidden = $('body').append('<div id="img-cache" style="display:none"/>').children('#img-cache');
$.each(imageArray, function (i, val) {
  $('<img/>').attr('src', val).appendTo(hidden);
});

if (window.location.hash == '#new')
{
  helptog();
  window.location.hash = '';
}

////$('#slideshow').fadeTo("slow", 1, function(){
//if ($('#slideshow'))
//{
//$('#slideshow').cycle({
//    fx: 'fade',
//    speed: 'slow',
//    timeout: 7500,
//    next: '#nextbutton',
//    prev: '#prevbutton',
//    cleartype: 1,
//    pauseOnPagerHover: 1,
//    after: slideafter,
//    before: slidebefore
//});
//}
////});
});

function slidebefore() {
  if (this.id == "lastslide")
  {$("#golink").delay(1500).fadeIn("slow");
   $('#slideshow').cycle('pause');
   }  
  if (this.id != "lastslide")
  {$("#golink").clearQueue();
   $("#golink").fadeOut("fast");}
}

function slideafter(currSlideElement) {
}

    $(function()
    {
        var code = null;
        $('#titleinput').keypress(function(e)
        {
            code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {entertitle()};
            //e.preventDefault();
        });
    });

function helptog() {
  if ($("#helpdialog").css("display") != 'none')
  {
    $("#helpdialog").fadeOut('500',function(){
        $("#helpdialog").css("display","none")
        $("#maincontainer").fadeTo('500','1.0');
    });
  }
  else
  {
  $("#helpdialog").fadeIn('500');
  $("#helpdialog").css("z-index",9999);
  $("#maincontainer").css("z-index",0);
  $("#maincontainer").fadeTo('500','0.2');
  }  
}

function errorack() {
    $("#savebutton").bind('click',function() {saveinput();});
    $("#error").fadeOut();
    $("#savebutton").children().filter("img").fadeOut("2000", function() {
    $("#savebutton").text("Save");
    $("#savebutton").children().filter("img").remove();
    });
}

function toinput() {
$("#inputarea").val("");

var tablecontents = "";
$("#checklist_formatted tr:has(td)").each(function()
{
if (tablecontents != "") {tablecontents+= "\n";}
if ($(this).attr("class") == "headerrow") {tablecontents+=("-" + $(this).text());}
else if ($(this).find(".check_on").length > 0) {tablecontents+= ($(this).text() + "*");}
else {tablecontents+= $(this).text();}
});

$("#inputarea").val(tablecontents);
}

function showinput()
{
$("#prevbutton").fadeOut('300'); 
$("#hidebutton").fadeOut('300');
//$("#savebuttondiv").fadeOut('300');
$("#checklist_formatted").fadeOut('300',function(){
 $("#inputarea").fadeIn('300'); 
 $("#nextbutton").fadeIn('300'); 
 $("#credits").fadeIn('300');
 //$("#savebuttondiv").fadeIn('300');               
});    
}

function showchecklist()
{
//if ($('#togcomptext').text() == 'Show All') {togglecomplete();}
//$("#savebuttondiv").fadeOut('300');
$("#credits").fadeOut('300');
$("#nextbutton").fadeOut('300');
$("#inputarea").fadeOut('300',function(){
$("#checklist_formatted").fadeIn('300');
$("#hidebutton").fadeIn('300');
$("#prevbutton").fadeIn('300');
//$("#savebuttondiv").fadeIn('300');
});    
}

function tochecklist() {
$("#checklist_formatted").empty();

var list_text = $("#inputarea").val().split("\n"); 
for (i in list_text)
 {
 if(list_text[i] == "") {}
 else {
 var new_tr = $("<tr/>");
 $("#checklist_formatted").append(new_tr);
 $(new_tr).bind('click',function(){clicked(this);});
 var left_td = $("<td/>").attr("width","90%");
 $(new_tr).append(left_td);
 var right_td = $("<td/>");
 $(new_tr).append(right_td);
 
 var new_div = $("<div/>");
 $(left_td).append(new_div);
 var new_p = $("<p/>").css("display","inline");
 $(new_div).append(new_p);

 var new_img = $("<div/>").addClass("check_image");
 $(right_td).append(new_img); 
 //alert(list_text[i-1] == "");
 
 if (list_text[i].charAt(list_text[i].length - 1) == "*") 
    {
    $(new_img).addClass("check_on");
    $(new_p).append(list_text[i].substring(0,list_text[i].length - 1));
    }
 else if (list_text[i].charAt(0) == "-")
    {
    //alert("header");
    $(new_tr).addClass("headerrow");
    $(new_tr).unbind('click');
    $(new_p).append(list_text[i].substring(1,list_text[i].length));
    }
 else
    {
    $(new_p).append(list_text[i]);
    }
 }
 }

if ($('#togcomptext').text() == 'Show All')
{
$("#checklist_formatted").find(".check_on").parent().parent().find("div").each(function(){togdisplay(this);});
}

}

function clicked(row) {
$(row).find(".check_image").toggleClass("check_on");
if ($('#togcomptext').text() == 'Show All')
{
$(row).find(".check_image").parent().parent().find("div").each(function(){togdisplay(this);});
}
}
function togdisplay(el) {

    $("#hidebutton").unbind('click');

    if ($(el).css("display") == "none")
    {
    $(el).parent().parent().css("display","");
    $(el).slideDown("600", function() {
        $(el).fadeTo("slow", 1, function(){
        });
        });
    }
    else
    {
    $(el).fadeTo("slow", 0.1, function(){
        $(el).slideUp("600", function() {
        $(el).parent().parent().css("display","none");
        });
        });
    }

    $("#hidebutton").bind('click',function() {togglecomplete;});
}

function togglecomplete() {
$("#checklist_formatted").find(".check_on").parent().parent().find("div").each(function(){togdisplay(this);});
$('#togcomptext').filter("p").fadeOut('300', function() {
$('#togcomptext').text(($('#togcomptext').text() == 'Hide Checked') ? 'Show All' : 'Hide Checked');
$('#togcomptext').filter("p").fadeIn('300');
});
}

function getinput()
{
    if (location.href.match(/[^\/]+$/gim))
    {
    $.get("slists.php",
            {
            listid: location.href.match(/[^\/]+$/gim)
            },
          function(data)
            {
            data_array = data.split(',');
            for (part in data_array)
            {data_array[part] = data_array[part].replace(/\\&xc/gim,",");}
            if (data_array[0] == "got")
                {
                $("#inputarea").val(data_array[2]);
                if (data_array[1] != "") {
                $("#titleinput").val(data_array[1]);
                $("#titletext").text($("#titleinput").val());
                tochecklist();
                showchecklist();
                }
                else
                {
                $("#titletext").text("Click to give this list a name");    
                $("#nextbutton").fadeIn('300');
                $("#savebuttondiv").fadeIn('300', function(){
                $("#inputarea").fadeIn("5000");
                  });
                }
                $("#toolcontainer").fadeIn("5000",function(){
                $("#titletext").fadeIn("5000",function(){
                });
                });
                }
            }
          );
    }
}

function saveinput()
{
    if ($("#checklist_formatted").is(":visible")) {toinput();}
    entertitle();
    $("#savebutton").attr("src","/images/spinner.gif");
    //$("#savebutton").css("margin-top","12px");
    $("#savebutton").css("margin-bottom","-4px");
    $("#savebutton").css("margin-left","4px");
    $.get("slists.php",
          {
            listitems: $("#inputarea").val(),
            title: $("#titleinput").val(),
            listid: (location.href.match(/[^\/]+$/gim))
            },
          function(data) {
    if (data.split(',')[0] == "saved") {
       $("#savebutton").fadeOut("300", function() {
       $("#savebutton").attr("src","/images/tick.png");
       $("#savebutton").fadeIn("500", function() {
       $("#savebutton").fadeOut("500", function() {
       $("#savebutton").attr("src","/images/disk.png");
       //$("#savebutton").css("margin-top","4px");
       $("#savebutton").css("margin-bottom","-4px");
       $("#savebutton").css("margin-left","");
       $("#savebutton").fadeIn("500", function() {
       tochecklist();
       });
                    });  
                });
          });    
    } else {
       $("#error").fadeIn();
       $("#savebutton").fadeOut("300", function() {
       $("#savebutton").attr("src","/images/error.png");
       $("#savebutton").fadeIn("500");
       $("#savebutton").unbind('click');
                });
    }
});
}

function edittitle()
{
$("#titletext").fadeOut('300', function(){
    $("#titleinput").css('background-color','#FFFFE0');
    $("#titleinput").fadeIn('300');
    $("#titleinput").focus();
    $("#titleinput").bind('mouseout',function(){entertitle();});
    });    
}

function entertitle()
{
$("#titleinput").fadeOut('300', function(){
    if ($("#titleinput").val() == "") {$("#titleinput").val("Untitled List");}
    $("#titletext").text($("#titleinput").val());
    $("#titletext").fadeIn('300');
    });    
}


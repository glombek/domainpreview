function update() {
    var domain = window.location.hash.replace("#", "");
    $(".domainName").text(domain || $("#domainName").attr("placeholder"));
    $("#domainName").val(domain);
}

function setHash() {
    document.location.hash = $("#domainName").val();
}
function disallow(el, codes, allow, maxChars) {
    $(el).keydown(function(ev) {
        char = String.fromCharCode(ev.keyCode).toLowerCase();
        if(ev.keyCode > 46 || ev.keyCode == 32) { //not control character
            if((codes.indexOf(char) != -1 && !allow) || (codes.indexOf(char) == -1 && allow) || (char != encodeURIComponent(char))) {
                ev.preventDefault();
            } else
            if(maxChars && $(el).text().length >= maxChars) {
                ev.preventDefault();
            }
        } else if(ev.keyCode == 13) { //no enter key
            ev.preventDefault();
        }
    });
}
$(function() {
    $(".focusNext").click(function() {
        $(this).next("[contenteditable]").focus();
    });
    $(".input").click(function() {
        $(this).children(".main[contenteditable]").focus();
    });
    $(".input [contenteditable], .input .focusNext").click(function(ev) {
        ev.stopPropagation();
    });
    disallow($("[contenteditable]"), [ ' ' ]);
    disallow($("#ssl"), [ 's' ], true, 1);
    $("[data-hideifnothing=before]").prev().keyup(function() {
        $(this).next().toggle($(this).html() != "");
    });
    $("[data-hideifnothing=after]").next().keyup(function() {
        $(this).prev().toggle($(this).html() != "");
    });
    $("#domainName").change(setHash);
    //$("#go").click(setHash);
    $(window).on("hashchange", update);
    update();
  });
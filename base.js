function showPerson(n, name, show) {
    if (n.innerText.indexOf(name) != -1) {
        if (show)
            n.style.display = "";
        else
            n.style.display = "none";
    }
}

function updateTimer(year)
{
    document.getElementById("selected_year").innerHTML = year;
    document.getElementById("map").src = "img/maps/" + year + ".png";

    var people = document.getElementById("people").getElementsByClassName("person");
    var i;
    for (i = 0; i < people.length; i++) {
        var childNode = people[i];
        showPerson(childNode, "Churchill", year >= 1940);
        showPerson(childNode, "Stalin", year >= 1941);
        showPerson(childNode, "Roosevelt", year >= 1941);
    }
}

function initializeShortBio() {
    function ShortBio(shortBioNode) {
        var timeout;
        var self = this;

        this.cancelClose = function()
        {
            clearTimeout(timeout);
        }

        this.show = function()
        {
            self.cancelClose();
            shortBioNode.style.display = "";
        }

        this.close = function()
        {
            shortBioNode.style.display = "none";
        }

        this.closeMaybe = function()
        {
            timeout = setTimeout(function() {self.close()}, 100);
        }
    }

    var persons = document.getElementsByClassName("person_overlay");
    for (var i = 0, person; person = persons[i]; i++) {
        var shortBioNode = person.getElementsByClassName("short_bio_overlay")[0]
        var myShortBio = new ShortBio(shortBioNode);
        shortBioNode.onmouseover = myShortBio.cancelClose;
        shortBioNode.onmouseout = myShortBio.closeMaybe;

        var personNode = person.getElementsByClassName("person")[0];
        personNode.onmouseover = myShortBio.show;
        personNode.onmouseout = myShortBio.closeMaybe;

        person.getElementsByClassName("short_bio_close_button")[0].onclick = myShortBio.close;
    }
}
document.addEventListener("DOMContentLoaded", initializeShortBio);

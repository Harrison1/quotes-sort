var data = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "assets/data/data.json",
        'dataType': "json",
        'success': function(data) {
            json = data;
        }
    });
    return json;
})();


$('#select-all').click(function(event) {
    if (this.checked) {
        // Iterate each checkbox
        $(':checkbox').each(function() {
            this.checked = true;
            $(this).parent('label').attr('class', $(this).is(':checked') ? 'select-box-on' : 'select-box-off');
        });
    }
});

$(".box").change(function() {
    $(this).parent('label').attr('class', $(this).is(':checked') ? 'select-box-on' : 'select-box-off');
});

createItems();

// init Isotope
var $container = $('#container').isotope({
    itemSelector: '.item'
});

var $output = $('#output');

// filter with selects and checkboxes
var $checkboxes = $('#form-ui input');

$checkboxes.change(function() {
    // map input values to an array
    var inclusives = [];
    // inclusive filters from checkboxes
    $checkboxes.each(function(i, elem) {
        // if checkbox, use value if checked
        if (elem.checked) {
            inclusives.push(elem.value);
        }
    });

    // combine inclusive filters
    var filterValue = inclusives.length ? inclusives.join(', ') : '*';

    $output.text(filterValue);
    $container.isotope({
        filter: filterValue
    })
});


function createItems() {

    var $items;

    $item = $('<div />', {
        'class': 'col-md-4 ' + 'grid-sizer'
    });

    $items = $items ? $items.add($item) : $item;

    $items.appendTo($('#container'));

    for (var i = 0; i < data.quotes.length; i++) {
        var name = data.quotes[i].name;
        var sociallink = data.quotes[i].sociallink;
        var socialicon = data.quotes[i].socialicon;
        var organization = data.quotes[i].organization;
        var organizationlink = data.quotes[i].organizationlink;
        var position = data.quotes[i].position;
        var hclass = data.quotes[i].class;
        var title = data.quotes[i].title;
        var quote = data.quotes[i].quote;
        var profilephoto = data.quotes[i].profilephoto;
        var titlebgcolor = data.quotes[i].titlebgcolor;
        var titleicon = data.quotes[i].titleicon;
        var tweettiplink = data.quotes[i].tweettiplink;
        var tags = data.quotes[i].tags;
        var snippet = data.quotes[i].snippet;
        var tweettopic = data.quotes[i].tweettopic;
        var tweetlink = data.quotes[i].tweetlink;
        var twitterhandle = data.quotes[i].twitterhandle;

        var $item = $('<div />', {
            'class': 'item ' + hclass + ' ' + ' price' + hclass + ' grid-item col-md-4'
        });

        $item.append("<div class='grid-item-content'><div class='card-title-bg'><h3 class='card-title'>" + title + "</h3></div><img class='profile-photo' src=" + profilephoto + " /><p class='card-content'>" + quote + "</p><p class='name'><a class='social' href='" + sociallink + "'><img src='" + socialicon + "'' class='social-icon' />" + name + "</a><br>" + position + "<br>" + organization + "</p><p class='tweet-p'><a class='tweet-tip hvr-radial-out' href='https://twitter.com/intent/tweet?text=" + twitterhandle + "+speaking+on+" + tweettopic + "+says+" + snippet + "&url=" + tweetlink + "&via=" + twitterhandle + "'>Tweet Tip</a></p><hr><p class='tags'>Tags: " + tags + "</p></div>");

        // add to items
        $items = $items ? $items.add($item) : $item;

        $items.appendTo($('#container'));

    }
}

$('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
        columnWidth: '.grid-sizer'
    }
});
var data = [{
    "name": "bootstrap-table",
    "stargazers_count": "10",
    "forks_count": "122",
    "description": "An extended Bootstrap table"
}, {
    "name": "multiple-select",
    "stargazers_count": "288",
    "forks_count": "20",
    "description": "A jQuery plugin to select multiple elements with checkboxes :)"
}, {
    "name": "bootstrap-table",
    "stargazers_count": "32",
    "forks_count": "11",
    "description": "Show/hide password plugin for twitter bootstrap."
}, {
    "name": "bootstrap-table",
    "stargazers_count": "1",
    "forks_count": "4",
    "description": "my blog"
}, {
    "name": "bootstrap-table",
    "stargazers_count": "1",
    "forks_count": "4",
    "description": "my blog"
}, {
    "name": "bootstrap-table",
    "stargazers_count": "1",
    "forks_count": "4",
    "description": "my blog"
}, {
    "name": "scutech-redmine 1",
    "stargazers_count": "50",
    "forks_count": "3",
    "description": "Redmine notification tools for chrome extension."
}, {
    "name": "scutech-redmine 1",
    "stargazers_count": "50",
    "forks_count": "3",
    "description": "Redmine notification tools for chrome extension."
}, {
    "name": "scutech-redmine 1",
    "stargazers_count": "50",
    "forks_count": "3",
    "description": "Redmine notification tools for chrome extension."
}, {
    "name": "scutech-redmine 1",
    "stargazers_count": "50",
    "forks_count": "3",
    "description": "Redmine notification tools for chrome extension."
}];

$(function() {
    $('#table').bootstrapTable({
        data: data
    });

    $(".mybtn-top").click(function() {
        $('#table').bootstrapTable('scrollTo', 0);
    });

    $(".mybtn-row").click(function() {
        var index = +$('.row-index').val(),
            top = 0;
        $('#table').find('tbody tr').each(function(i) {
            if (i < index) {
                top += $(this).height();
            }
        });
        $('#table').bootstrapTable('scrollTo', top);
    });

    $(".mybtn-btm").click(function() {
        $('#table').bootstrapTable('scrollTo', 'bottom');
    });

});
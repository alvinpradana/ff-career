$(document).ready(function () {
    $.ajax({
        url: "/json/example.json",
        type: "get",
        success: function (response) {
            var gridContainer = $(".grid-container");
            var coordinate = "";
            $.each(response.coordinate, function (indexInArray, valueOfElement) {
                coordinate += "'" + valueOfElement + "'";
            });
            gridContainer.css({
                "grid-template-areas": coordinate,
            });
            $.each(response.elements, function (indexInArray, valueOfElement) {
                var listChildren = $("<ul />");
                $.each(
                    valueOfElement.children,
                    function (indexInArray, valueOfElement) {
                        listChildren.append(
                            $("<li />").html(valueOfElement.title)
                        );
                    }
                );
                var child = $("<div />", {
                    class: valueOfElement.class_name,
                    id: valueOfElement.id,
                });
                child.append(listChildren);
                child.css("grid-area", valueOfElement.id);
                gridContainer.append(child);
            });
            $.ajax({
                type: "get",
                url: "/json/flow.json",
                success: function (response) {
                    var path = [];
                    gridContainer.find("div").addClass("not-flow");
                    $.each(
                        response.path,
                        function (indexInArray, valueOfElement) {
                            if (indexInArray < response.path.length) {
                                path.push({
                                    start: "#" + valueOfElement,
                                    end: "#" + response.path[indexInArray + 1],
                                });
                                gridContainer
                                    .find("#" + valueOfElement)
                                    .removeClass("not-flow");
                            }
                        }
                    );
                    $("#svgContainer").HTMLSVGconnect({
                        stroke: "#0468BABF",
                        strokeWidth: 3,
                        orientation: "auto",
                        paths: path,
                    });
                },
            });
        },
    });
});

var dateSelected;
var arrSelectedWorkouts = [];
$(document).ready(function() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    $("#dateSchedule").val(currentDate.getFullYear() + "-" + month + "-" + day);

    dateSelected = $("#dateSchedule").val();
    getWorkouts(dateSelected);

    $("#dateSchedule").change(function() {

        dateSelected = $("#dateSchedule").val();
        getWorkouts(dateSelected);
    });

    function getWorkouts(dateValue) {
        $(".innerDivs").children("div").css("border", "0px");
        $("input[type='checkbox']").prop("checked", false);

        if (localStorage.getItem(dateValue) === null) {
            $("#msgBox").css("display", "block");
            $("#msgBox").html("No workouts scheduled for the selected date");

        } else {
            $("#msgBox").css("display", "none");
            $("#msgBox").html("");


            arrSelectedWorkouts = localStorage.getItem(dateValue).split(",");
            if (arrSelectedWorkouts.length > 0) {
                for (var i = 0; i < arrSelectedWorkouts.length; i++) {
                    $("#" + arrSelectedWorkouts[i]).css("border", "7px solid red");
                    $("#" + arrSelectedWorkouts[i]).children("input").prop("checked", true);
                }
            }
        }

    }

    $("#btnAdd").click(function() {
        arrSelectedWorkouts = [];
        dateSelected = $("#dateSchedule").val();

        $("input[type='checkbox']:checked").each(function() {

            arrSelectedWorkouts.push($(this).parent().attr("id"));
        });
        if (arrSelectedWorkouts.length == 0) {
            alert("Please Select some workouts");
        } else {
            localStorage.setItem(dateSelected, arrSelectedWorkouts);
            alert("Successfully scheduled the workout for " + dateSelected);
            getWorkouts(dateSelected);
        }
    });

});
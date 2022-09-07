//"use strict";

var events = [];

const displayTaskLists = (todayDate) => {
    let todaysTasks = JSON.parse(localStorage.getItem("event" + todayDate));
    let tasks = (todaysTasks) ? todaysTasks : [];
    let taskString = "";
    if(tasks.length > 0) {
        tasks = tasks.map(task => [task[0], task[1], task[2]]);
        // tasks.sort((task1, task2, task3) => {
        tasks.sort((task1, task2) => {
            //ishwarya modified added AM and PM
            const date1 = new Date(currentYear, currentMonth, todayDate, task1[1]);
            const date2 = new Date(currentYear, currentMonth, todayDate, task2[1]);

            if (date1 < date2) {
                return -1;
            } else if (date1 > date2) {
                return 1;
            } else {
                return 0;
            }
        });

        let str = "";
        let index = 0;
        taskString = tasks.reduce( (prev, curr) => {
            let suffix = (curr[1] >= 12) ? 'PM' : 'AM';
            let label = curr[1] + " " + suffix + " - " + curr[0] + " - " + curr[2] +"</label><br>";
            str = str + "<label>" + "<input type=\"checkbox\" id=" + curr[1] + " value=" + curr[1] + ">" + label;
            index++;
            return str;
        }, "");
    } else {
        taskString = "No events listed today"
    }
    
    $("#eventslist").html(taskString);
    $("#name").focus();
};

const updateCalendar = () => {
    const dates = $("tbody td");
    
    for (let i = 0; i <= dates.length; i++) {
        let val = $(dates[i]).html();
        console.log(val);   
        if (val != "" && (val > 0 && val <= 31)) {
            if (dates[i].classList.contains("not-current")) {
                break;
            } else {
                let daysTasks = JSON.parse(localStorage.getItem("event" + val));
                let daystasks = (daysTasks) ? daysTasks : [];
                if (daystasks.length > 0) {
                    $(dates[i]).css({"background-color": "#242223",
                                     "color": "orange",
                                     "font-weight": "700"});
                } else {
                    $(dates[i]).css({"background-color": "white",
                                     "color": "#242223",
                                     "font-weight": "100"});
                }
            }
        }
    }

}

$(document).ready(function() {
    // localStorage.clear();
    
    // $("#myBtn").click ( () => {
    //     // $("#myBtn").addClass('hide');
    //     // $("#plus").addClass('hide');
    //     displayTaskLists(todayDate);
    // });

    $(".close").click ( () => {
        $("#events").animate({left: "-105%"}, 900, "linear");
        $("#form").animate({right: "-105%"}, 900, "linear");
        $("#myModal").animate({top: "-105%"}, 1000, "linear");
        updateCalendar();
        
    });

    $("#submit").click ( () => {
        $("#events").animate({left: "-105"}, 200, "linear");
        $("#form").animate({right: "-105%"}, 200, "linear");
        $("#myModal").animate({top: "-100%"}, 2000, "linear");
    });

    
    
    $("#eventslist").html("No Events listed for this day");

    $("#add_task").click( () => {
        let todaysTasks = JSON.parse(localStorage.getItem("event" + todayDate));
        let tasks = (todaysTasks) ? todaysTasks : [];
        const name = $("#name").val();
        const rideTime = $("#rideTime").val();
        const routeselection = $("#routes").val();
        let isDuplicate = false;
        for (let j in tasks) {
            let taskVal = `${tasks[j][1]}`;
            let unmatched = true;
            if (rideTime == taskVal) {
                isDuplicate = true;
            }
        }

        // tasks[0] = [taskname, taskdate];
        // tasks[1] = [taskname, taskdate]

        // tasks[1][1] = taskdate of the second task
        if (isDuplicate) {
            alert("Event at time:" + rideTime + " already booked. Try another slot");
            $("#name").select(); // replace this with the focus()
        } else if (name && routeselection && (rideTime > 4 && rideTime < 18) ) {
            const newEvent = [name, rideTime, routeselection];
            tasks.push(newEvent); // adding a task to the array
            localStorage["event" + todayDate] = JSON.stringify(tasks);

            
            $("#name").val("");
            $("#rideDate").val("");

            $("#routes").val("Select");
            displayTaskLists(todayDate); // to display the tasks we got
            
        } else {
            alert("Please enter a task and valid due date.");
            $("#name").select(); // replace this with the focus()
        }
    });

    $("#del_tasks").click( () => {
        let todaysTasks = JSON.parse(localStorage.getItem("event" + todayDate));
        let tasks = (todaysTasks) ? todaysTasks : [];
        let delkeys = $("input:checkbox:checked");
        let tempTasks = [];
        console.log("del:" + tasks + "tobedel:" + delkeys);
        for (let j in tasks) {
            let taskVal = `${tasks[j][1]}`;
            let unmatched = true;

            for (let i of delkeys) {
                let val = $(i).val();
                console.log("Deleting" + val + unmatched + `${tasks[j][1]}` );
                if (taskVal == val) {
                    unmatched = false;
                    console.log("Deleting" + val + unmatched);
                }
            }
            if (unmatched == true) {
                tempTasks.push(tasks[j]);
                console.log(tempTasks); 
            }
        }
        tasks.length=0;
        tasks = tempTasks;
        localStorage.setItem("event" + todayDate,  JSON.stringify(tasks));
        displayTaskLists(todayDate);
        $("#task").focus();
    });
});

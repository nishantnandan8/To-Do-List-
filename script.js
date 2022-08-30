let addbtn = document.querySelector(".add-btn");
let modalcont = document.querySelector(".modal-cont");
let taskarea = document.querySelector(".textarea-cont");
let maincont = document.querySelector(".main-cont");
let allprioritycolor = document.querySelectorAll(".priority-color");
let removebtn = document.querySelector(".remove-btn");
let toolboxcolors = document.querySelectorAll(".color");
let addmodal = true;
let removeflag = false;
let colors = ['lightpink', 'lightblue', 'lightred', 'lightgreen'];
let modalprioritycolor = colors[colors.length - 1];
let uid = new ShortUniqueId();
let ticketarr = [];

for (let i = 0; i < toolboxcolors.length; i++) {
    toolboxcolors[i].addEventListener("click", function () {
        let currentcolor = toolboxcolors[i].classList[1];
        let filteredarr = [];
        for (let i = 0; i < ticketarr.length; i++) {
            if (ticketarr[i].color == currentcolor) {
                filteredarr.push(ticketarr[i]);
            }
        }
        console.log(filteredarr);
        let alltickets = document.querySelectorAll(".tickent-cont");
        for (let j = 0; j < alltickets.length; j++) {
            alltickets[j].remove();
        }
        for (let i = 0; i < filteredarr.length; i++) {
            let ticket = filteredarr[i];
            let color = ticket.color;
            let task = ticket.task;
            let id = ticket.id;
            createticket(color, task, id)
        }
    })
}

addbtn.addEventListener("click", function () {
    if (addmodal) {
        modalcont.style.display = "flex";
    }
    else {
        modalcont.style.display = "none";
    }
    addmodal = !addmodal
})

for (let i = 0; i < allprioritycolor.length; i++) {
    allprioritycolor[i].addEventListener("click", function () {

        for (let j = 0; j < allprioritycolor.length; j++) {
            allprioritycolor[j].classList.remove("active");
        }
        allprioritycolor[i].classList.add('active');
        modalprioritycolor = allprioritycolor[i].classList[0];
    })

}

modalcont.addEventListener('keydown', function (e) {
    let key = e.key;
    if (key == 'Enter') {
        createticket(modalprioritycolor, taskarea.value);
        taskarea.value = "";
        modalcont.style.display = "none";
        addmodal = !addmodal;
    }
})

removebtn.addEventListener("click", function () {
    if (removeflag) {
        removebtn.style.color = 'black'
    } else {
        removebtn.style.color = 'red'
    }
    removeflag = !removeflag;
})

function createticket(ticketcolor, task, ticketid) {
    let id;
    if (ticketid == undefined) {
        id = uid();
    } else {
        id = ticketid;
    }
    //     <div class="ticket-cont">
    //     <div class="ticket-color black"></div>
    //     <div class="ticket-id">rf3o</div>
    //     <div class="task-area">some task</div>
    //   </div>   
    let ticketcont = document.createElement("div");
    ticketcont.setAttribute('class', 'ticket-cont');
    ticketcont.innerHTML = `<div class="ticket-color ${ticketcolor}"></div>
                        <div class="ticket-id">#${id}</div>
                        <div class="task-area">${task}</div>
                        <div class="lock-unlock"><i class="fa fa-lock"></i></div>`
    maincont.appendChild(ticketcont);

    let lockunlockbtn = ticketcont.querySelector(".lock-unlock i");
    let tickettaskarea = ticketcont.querySelector(".task-area");
    lockunlockbtn.addEventListener("click", function () {
        if (lockunlockbtn.classList.contains("fa-lock")) {
            lockunlockbtn.classList.remove("fa-lock");
            lockunlockbtn.classList.add("fa-unlock");
            tickettaskarea.setAttribute("contenteditable", "true");
        } else {
            lockunlockbtn.classList.remove("fa-unlock");
            lockunlockbtn.classList.add("fa-lock");
            tickettaskarea.setAttribute("contenteditable", "false");
        }
    })

    ticketcont.addEventListener("click", function () {
        if (removeflag) {
            ticketcont.remove();
        }
    })
    let ticketcolorband = ticketcont.querySelector(".ticket-color");
    ticketcolorband.addEventListener("click", function () {
        let currentticketcolor = ticketcolorband.classList[1];
        let currentticketcoloridx = -1;
        for (let i = 0; i < colors.length; i++) {
            if (currentticketcolor == colors[i]) {
                currentticketcoloridx = i;
                break;
            }
        }
        let nextcoloridx = (currentticketcoloridx + 1) % colors.length;
        let nextcolor = colors[nextcoloridx];
        ticketcolorband.classList.remove(currentticketcolor);
        ticketcolorband.classList.add(nextcolor);

    })

    if (ticketid == undefined) {
        ticketarr.push({ "color": ticketcolor, "task": task, "id": "#" + id });
        console.log(ticketarr);
    }

}


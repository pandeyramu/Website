let userscore = 0;
let compscore = 0;
const choice = document.querySelectorAll(".choice");
const userc = document.querySelector("#uchoice");
const compc = document.querySelector("#compchoice");
const message = document.querySelector("#message");
const userSC = document.querySelector("#usersc");
const compSC = document.querySelector("#compsc");
const compch = () => {
    const options = ["Rock", "Paper", "Scissor"];
    const index = Math.floor(Math.random() * 3);
    return options[index];
}
const draw = () => {
    message.innerHTML = "It's a draw !";
}
const Winner = (userWin) => {
    if (userWin) {
        message.innerHTML = "User Wins";
        userscore++;
        userSC.innerHTML = userscore;
    }
    else {
        message.innerHTML = "Computer Wins ";
        compscore++;
        compSC.innerHTML = compscore;
    }
}
const game = (userchoice) => {
    userc.innerHTML = `Choice of User is  ${userchoice} `;
    const compchoice = compch();
    compc.innerHTML = `Choice of Computer is ${compchoice}`;
    if (userchoice === compchoice) {
        draw();
    }
    else {
        let userWin = true;
        if (userchoice === "Rock") {
            userWin = compchoice === "Paper" ? false : true;
        }
        if (userchoice === "Paper") {
            userWin = compchoice === "Scissor" ? false : true;
        }
        if (userchoice === "Scissor") {
            userWin = compchoice === "Rock" ? false : true;
        }
        Winner(userWin);
    }


}
choice.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        // console.log(id);
        game(userchoice);
    })
});
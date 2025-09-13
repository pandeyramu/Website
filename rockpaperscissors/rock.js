 let userscore = 0;
        let compscore = 0;
        
        const choices = document.querySelectorAll(".choice");
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
            message.innerHTML = "It's a Draw! 🤝";
            message.style.backgroundColor = "rgb(255, 193, 7)";
        }
        
        const Winner = (userWin, userChoice, compChoice) => {
            if (userWin) {
                message.innerHTML = "You Win! 🎉";
                message.style.backgroundColor = "rgb(86, 190, 107)";
                userscore++;
                userSC.innerHTML = userscore;
            } else {
                message.innerHTML = "Computer Wins! 🤖";
                message.style.backgroundColor = "rgb(220, 53, 69)";
                compscore++;
                compSC.innerHTML = compscore;
            }
        }
        
        const game = (userchoice) => {
            userc.innerHTML = `You chose: ${userchoice}`;
            const compchoice = compch();
            compc.innerHTML = `Computer chose: ${compchoice}`;
            
            if (userchoice === compchoice) {
                draw();
            } else {
                let userWin = true;
                
                if (userchoice === "Rock") {
                    userWin = compchoice === "Paper" ? false : true;
                } else if (userchoice === "Paper") {
                    userWin = compchoice === "Scissor" ? false : true;
                } else if (userchoice === "Scissor") {
                    userWin = compchoice === "Rock" ? false : true;
                }
                
                Winner(userWin, userchoice, compchoice);
            }
        }
        
        choices.forEach((choice) => {
            choice.addEventListener("click", () => {
                const userchoice = choice.getAttribute("id");
                game(userchoice);
                choice.style.transform = "scale(0.9)";
                setTimeout(() => {
                    choice.style.transform = "";
                }, 150);
            });
        });
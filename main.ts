#! /usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds, addSeconds } from "date-fns";
import chalk from "chalk";
// import { tr } from "date-fns/locale";


let input = await inquirer.prompt([
    {
        name:"timer",
        type:"number",
        message:chalk.green("Kindly Set a Minute Countdown Timer"),
        transformer: (input: string, answers: any, flags: any) => {
            return chalk.yellow(input); // Change the input color
        },
        validate:(check)=>{
            if(isNaN(check)){
                return 'Please Enter a Valid number '
            }else if(check<1){
                return 'Minutes must be at least 1'
            }else{
                return true
            }
        }
    }
])

let check = input.timer *60

function countDown(val:number){
    let endTime = addSeconds(new Date(), val )

    function updateTimer(){
        let currentTime = new Date()
        let diff = differenceInSeconds(endTime,currentTime)
        if(diff <=0){
            console.log(chalk.yellow('Timer has expired'))
            process.exit()
        }

        let minutes =Math.floor(diff / 60) 
        let second = diff % 60

        console.log(`${chalk.red(minutes.toString().padStart(2,"0"))}${chalk.yellow(`:`)}${chalk.red(second.toString().padStart(2,"0"))}`)

        let nextTick = 1000-(currentTime.getTime() % 1000)

        setTimeout(updateTimer,nextTick)
    }

    updateTimer()
}

countDown(check)
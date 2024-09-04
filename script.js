const checkboxlist=document.querySelectorAll('.customcheckbox')
const inputfields=document.querySelectorAll('.taskinput')
const redalert=document.querySelector('.belowbar')
const progressvalue=document.querySelector('.progressvalue')
const abovebar=document.querySelector('.abovebar')
const stats=document.querySelector('.stats')
const footer=document.querySelector('.qoutes')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
  ]

const footerqoutes=[
    '“Move one step ahead, today!”',
    '“Keep Going, You’re making great progress!”',
    '“Keep Going, You’re making great progress!”',
    'DONE!',
]

const allgoals=JSON.parse(localStorage.getItem('allgoals')) || {}
let completedgoalscount=Object.values(allgoals).filter((goal)=>goal.completed).length
progressvalue.style.width=`${completedgoalscount / 3 * 100}%`
progressvalue.firstElementChild.innerText=`${completedgoalscount}/3 completed`
abovebar.innerText=allQuotes[completedgoalscount]
footer.innerText=footerqoutes[completedgoalscount]


checkboxlist.forEach((checkbox) =>{
    checkbox.addEventListener('click', (e)=>{
        const allinputfilled=[...inputfields].every((input) =>{
            return input.value
        })
        if(allinputfilled){
            checkbox.parentElement.classList.toggle('completed')
            abovebar.style.innertext='Just a step away, keep going!'
            redalert.style.display='none'
            const inputid=checkbox.nextElementSibling.id
            allgoals[inputid].completed = !allgoals[inputid].completed 
            completedgoalscount=Object.values(allgoals).filter((goal)=>goal.completed).length
            progressvalue.style.width=`${completedgoalscount / 3 * 100}%`
            progressvalue.firstElementChild.innerText=`${completedgoalscount}/3 completed`
            abovebar.innerText=allQuotes[completedgoalscount]
            stats.parentElement.classList.add('completed')
            footer.innerText=footerqoutes[completedgoalscount]
            // footerchange.parentElement.classList.add('completed')
            localStorage.setItem('allgoals',JSON.stringify(allgoals))
        }
        else{
            redalert.style.display='block'
        }

    })
})

inputfields.forEach((input)=>{
    if(allgoals[input.id]){
        input.value=(allgoals[input.id]).name
    
        if(allgoals[input.id].completed){
            input.parentElement.classList.add('completed')
        }

    }
    
    input.addEventListener('input',(e)=>{
        if(allgoals[input.id] && allgoals[input.id].completed){
            e.target.value=allgoals[input.id].name
            return
        }

        allgoals[input.id]={
            name: input.value,
            completed: false,
        }
        localStorage.setItem('allgoals',JSON.stringify(allgoals))
    })
})
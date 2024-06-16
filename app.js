let url="https://the-trivia-api.com/v2/questions";
let btn1=document.querySelector("button");
let body=document.querySelector("body");
let que=document.querySelector(".que");
let choice=[];
let d="";
let total=0,counter=0;
let h4;
let ans=document.querySelector(".answers");
btn1.addEventListener("click",start);
async function start(){
    if(total==10)
        {
            h4=document.createElement("h2");
            h4.innerText=`You got ${counter}/${total} correct`;
            que.appendChild(h4);
            console.log(`You got ${counter}/${total} correct`);
            total=0;
            counter=0;
            let btn=document.createElement("button");
            btn.classList.add("button-29");
            btn.innerText="Click here to play again";
            ans.appendChild(btn);
            btn.addEventListener("click",start);
        }
    else{
    ans.replaceChildren();
    if(body.contains(btn1))
        {
            body.removeChild(btn1);
        }
     if(que.contains(h4))
        {
            que.removeChild(h4);
        }
    let rd=Math.floor(Math.random()*10);
    let qbox=document.createElement("div");
    let op=document.createElement("div");
    op.classList.add("options");
    qbox.classList.add("question");
    que.appendChild(qbox);
    ans.appendChild(op);
    let correct=Math.floor(Math.random()*4);
    let data=await generator();
    choice=[];
    let j=0;
    qbox.innerText=data[rd]["question"].text;
    d=data[rd].correctAnswer;
    for(let i=0;i<4;i++)
        {
            if(i!=correct)
                {
                    choice[i]=document.createElement("div");
                    choice[i].innerText=data[rd].incorrectAnswers[j];
                    j++;
                    choice[i].classList.add("choice");
                    op.appendChild(choice[i]);
                }
                else{
                    choice[i]=document.createElement("div");
                    choice[i].innerText=data[rd].correctAnswer;
                    choice[i].classList.add("choice");
                    op.appendChild(choice[i]);
                }
        }
        for(let i=0;i<4;i++)
            {
        choice[i].addEventListener("click",function(){
            if(choice[i].innerText==d)
                {
                    total++;
                    counter++;
                    choice[i].classList.add("correct");
                    setTimeout(function(){
                        choice[i].remove(correct);
                        que.replaceChildren();
                        ans.replaceChildren();
                        start();
                    },500)
                   
                }
                else{
                    total++;
                    choice[i].classList.add("wrong");
                    setTimeout(function(){
                    que.replaceChildren();
                    ans.replaceChildren();
                    start();},500);
           }
        })}
    }
    
}

async function generator(){
    try{
        let s=await axios.get(url);
        return s.data;
    }
    catch(er){
        console.log(er);
    }}
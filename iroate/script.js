const colors = [
    {name:"撫子色",hex:"#FFADE3",rgb:"255,173,227"},
    {name:"薄群青",hex:"#639CF5",rgb:"99,156,245"},
    {name:"利休色",hex:"#648046",rgb:"100,128,70"},
    {name:"紫式部",hex:"#8E1B99",rgb:"142,27,153"},
    {name:"乙女色",hex:"#FFC4D9",rgb:"255,196,217"},
    {name:"洒落柿",hex:"#EDAD8A",rgb:"237,173,138"},
    {name:"京緋色",hex:"#FF210A",rgb:"255,33,10"},
    {name:"雪色",hex:"#E1EBF0",rgb:"225,235,240"},
    {name:"砥粉色",hex:"#FADE85",rgb:"250,222,133"},
    {name:"天壇青",hex:"#104F9E",rgb:"16,79,158"},
]

const iro = document.querySelector('#iro')
const result = document.querySelector('#result')
const situmon = document.querySelector('#situmon')
let currentQuestion
let score=0
let answered = false
let questionCount = 0
const sentakusi = document.querySelector('#sentakusi')
const scoreDisplay = document.querySelector('#score')
const questionCountDisplay = document.querySelector('#question-count')
const nextButton = document.querySelector('#nextButton')
const restartButton = document.querySelector("#restartButton")
const modeButtons = document.querySelectorAll('input[name="mode"]')

function newQuestion() {
    //前の問題の状態をリセット
    sentakusi.innerHTML = ""
    result.textContent = ""
    answered = false

    //問題をランダムに決める
    const randomNumber = Math.floor(Math.random()*colors.length)
    currentQuestion = colors[randomNumber]

    //問題の色を表示
    iro.style.backgroundColor =currentQuestion.hex

    //問題文と選択肢を更新
    updateQuestionDisplay()

    questionCount = questionCount+1
    questionCountDisplay.textContent = `第${questionCount}問／全5問`
        
}

newQuestion()

function createChoices(question){
    //正解以外の色を取り出す
    const otherColors = colors.filter((color) =>{
        return color.hex !== question.hex
    })

    //不正解候補をシャッフル
    otherColors.sort(()=>Math.random()-0.5)

    //正解1つ+不正解2つ
    const choices = [question]
    const wrongChoices = otherColors.slice(0,2)
    choices.push(...wrongChoices)

    //選択肢の順番をシャッフル
    choices.sort(() =>Math.random()-0.5)

    //選択されているモードを取得
    const selectedMode = document.querySelector('input[name="mode"]:checked')

    //ラジオボタンを作る
    choices.forEach((color)=>{
        const label = document.createElement('label')
        const input = document.createElement('input')
        input.type = "radio"
        input.name = "answer"
        input.value = color.hex
        label.appendChild(input)
        if (selectedMode.value === "name") {
            label.append(` ${color.name}`)
        } else {
            label.append(` rgb(${color.rgb})`)
        }
        sentakusi.appendChild(label)
    })
}

const button = document.querySelector('#button')
button.addEventListener('click',()=>{
    if(answered){
        return
    }
    const answer = document.querySelector('input[name="answer"]:checked')
    if(!answer){
        result.textContent = "回答を選択してください"
        return
    }

    if (answer.value === currentQuestion.hex){
        score = score+1 
        scoreDisplay.textContent = `正解数：${score}`
        result.textContent = "正解！"
    }
    else {
        result.textContent = "不正解！"
    }
    answered = true

    const percentage = Math.round((score / questionCount)* 100)
    let message

    if(percentage >= 80){
        message ="すごい！"
    }else{
        message ="もう一度挑戦！"
    }

    if(questionCount >= 5){
        result.textContent += `\nゲーム終了！正解率：${percentage}％　${message}`
        nextButton.disabled = true
        restartButton.style.display = "inline-block"
        modeButtons.forEach((modeButton)=>{
            modeButton.disabled = true
        })
    } 
})

nextButton.addEventListener('click', ()=>{
    newQuestion()
})

function restartGame(){
    score = 0
    questionCount = 0
    answered = false
    scoreDisplay.textContent = "正解数：0"
    nextButton.disabled = false
    restartButton.style.display = "none"
    modeButtons.forEach((modeButton)=>{
            modeButton.disabled = false
    })
    newQuestion()
}

restartButton.addEventListener('click',()=>{
    restartGame()
})

function updateQuestionDisplay(){
    const selectedMode = document.querySelector('input[name="mode"]:checked')
    if (selectedMode.value === "name") {
        situmon.textContent = "この色の和名はどれ？"
    } else {
        situmon.textContent = "この色のRGB値はどれ？"
    }
    sentakusi.innerHTML = ""
    createChoices(currentQuestion)
}

modeButtons.forEach((modeButton)=>{
        modeButton.addEventListener('change',()=>{
            updateQuestionDisplay()
        })
    })
/*---------------------------------------------------------------------------------
这段代码主要用于执行颜色条件下的实验，即人物标签与运动方向匹配，之后进行散点群整体方向判断
在当前的版本中，人物改为 “我”，“他/她”
并且，标签会分别于 4 种不同难度水平的散点图进行匹配
不同的难度条件随机呈现
匹配任务：2*16 个练习 trial，2 * 16 * 4 = 128 个正式 trial 
随机动点任务：2*8 = 16 个练习 trial，4 * 8 * 4 = 128 个正式 trial 每种条件40个trial
- 更新：每种条件24个trial
- 匹配任务：2*16=32个练习，24*16=384个正式/8 block
- 随机动点任务：2*8=16个练习，24*8=192个正式/6 block
-----------------------------------------------------------------------------------*/

var randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
};

var move = {
  timeline: []
};

let textMun;

let labelVar = "";

var currentBlock = 1

// 定义一个函数来处理条件匹配和更新coherence值
function updateCoherence(arr) {
  for (let i in arr) {
    const coherence = arr[i].coherence;
    switch (coherence) {
      case 0.20:
        arr[i].coherence = window.coherence[1];
        break;
      case 0.16:
        arr[i].coherence = window.coherence[3];
        break;
      case 0.10:
        arr[i].coherence = window.coherence[5];
        break;
      case 0.05:
        arr[i].coherence = window.coherence[7];
        break;
    }
  }
}


//--------------------知觉匹配任务------------------------

//包含：指导语，示例，练习和正式任务

// 指导语
var instruction_match = {
  type: jsPsychHtmlKeyboardResponse,
  stimuls: "",
  on_start: function() {
    if (window.subjSex) { 
      if (window.subjSex == "男") {
        labelVar = "他";
      } else if (window.subjSex == "女") {
        labelVar = "她";
      }
    } else {
      labelVar = "TA";
    };
    document.body.style.backgroundColor = "black";
    if (userId % 2 === 0) {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px"> 
        <h3 style="text-align: center; font-size: 30px; margin: 10px;">任务一：匹配判断</h3>
        <p>接下来，屏幕上会呈现一些运动的彩色圆点，</p>
        <p>其中<span style="font-weight: bold">一定比例的点</span>会一致地向左或向右运动，其余点随机方向运动</p>
        <p>您需要判断一致运动的方向是向左还是向右
        <ul>
          <li>一致运动方向为 <span style="font-weight: bold">左</span> 代表 <span style="font-weight: bold">你自己</span> ，为 <span style="font-weight: bold">右</span> 代表 <span style="font-weight: bold">他人</span>，</p >
        <p>同时散点图的下方会出现 "我" 或 "${labelVar}" 的文字标签。</p >
        <p>您需要判断 <span style="font-weight: bold">散点图的运动方向与文字是否匹配</span> ：</p >
        <ul>
          <li><span style="color: hsl(135, 50%, 50%)">匹配</span>，请按键盘 <span style="color: hsl(135, 50%, 50%)">"F" 键</span></li>
          <li><span style="color: red">不匹配</span>，请按键盘 <span style="color: red">"J" 键</span> </li>
        </ul>
        <p>按下空格键后将呈现示例</p>
      </div>`;
    } else {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px"> 
        <h3 style="text-align: center; font-size: 30px; margin: 10px">任务一：匹配判断</h3>
        <p>接下来，屏幕上会呈现一些运动的圆点，</p>
        <p>如果图中大部分点向 <span style="font-weight: bold">右</span> 运动代表 <span style="font-weight: bold">你自己</span> ，向 <span style="font-weight: bold">左</span> 运动代表 <span style="font-weight: bold">生人（即陌生人）</span>，</p >
        <p>同时散点图的下方会出现 "我" 或 "${labelVar}" 的文字标签。</p >
        <p>您需要在3秒内判断 <span style="font-weight: bold">散点图的运动方向与文字是否匹配</span> ：</p >
        <ul>
          <li><span style="color: hsl(135, 50%, 50%)">匹配</span>，请按键盘 <span style="color: hsl(135, 50%, 50%)">"F" 键</span></li>
          <li><span style="color: red">不匹配</span>，请按键盘 <span style="color: red">"J" 键</span> </li>
        </ul>
        <p>按下空格键后将呈现示例</p >
      </div>`;
    }
  },
  response_ends_trial: true,
  choices: " ",
  data: {
    part: "instruction_match", 
  },
  on_finish: function() {
    console.log("subjSexTest:", window.subjSex, "lable:", labelVar)
    if (testMode) {
      textMun = true
    } else {
      textMun = false
    }
    return textMun
  }
};

move.timeline.push(instruction_match);

// 示例

var direction;
var example = {
  type: jsPsychRdk,
  number_of_apertures: 2,
  //post_trial_gap: 500,
  number_of_dots: 100,
  RDK_type: 3,
  dot_color: [["hsl(0, 50%, 50%)", "hsl(225, 50%, 50%)"], ["hsl(0, 50%, 50%)", "hsl(225, 50%, 50%)"]],
  choices: [" "],
  correct_choice: [" "],
  coherent_direction: function() {
    if (!direction) {
      if (userId % 2 === 0) {
        direction = [180, 0];
      } else {
        direction = [0, 180];
      }
    }
    return direction;
  },
  coherence: 0.2, 
  dot_radius: 5,
  move_distance: 3,
  aperture_type: 1,
  aperture_width: 400,
  aperture_height: 400,
  aperture_center_y: [330,330], // 这是适合实验室设备的距离
  aperture_center_x: [550, 1335],
  //aperture_center_y: [350, 350],
  //aperture_center_x: [420, 1000],
  background_color: "black",
  trial_duration: 3000000,
  motion_change_delay: randomInteger(6, 12),
  data: {
    part: "example"
  },
  on_start: function() {
    var displayElement = jsPsych.getDisplayElement();
    // 创建第一个div元素显示最上面的说明文字
    var topTextDiv = document.createElement("p");
    topTextDiv.textContent = "【示例】 如果准备好请按下空格键进入练习阶段";//这里可能还需要调整一下文字的位置
    topTextDiv.style.position = "absolute";
    topTextDiv.style.fontSize = "28px";
    topTextDiv.style.height = "8px";
    topTextDiv.style.top = "6%";
    topTextDiv.style.left = "30%";
    //topTextDiv.style.marginBottom = "30px";
    topTextDiv.style.color = "hsl(135, 50%, 50%)";
    displayElement.appendChild(topTextDiv);

    // 创建第二个div元素显示左边的标签文字
    var leftTextDiv = document.createElement("div");
    leftTextDiv.textContent = "我";
    leftTextDiv.style.position = "absolute";
    leftTextDiv.style.fontSize = "45px";
    leftTextDiv.style.height = "10px";
    leftTextDiv.style.bottom = "16%";
    leftTextDiv.style.left = "28%";
    leftTextDiv.style.color = "white";
    displayElement.appendChild(leftTextDiv);

    // 创建第三个div元素显示右边的标签文字
    var rightTextDiv = document.createElement("div");
    rightTextDiv.textContent = `${labelVar}`;
    rightTextDiv.style.position = "absolute";
    rightTextDiv.style.fontSize = "45px";
    rightTextDiv.style.height = "10px";
    rightTextDiv.style.bottom = "16%";
    rightTextDiv.style.left = "70%";
    rightTextDiv.style.color = "white";
    displayElement.appendChild(rightTextDiv);

    if ( userId % 2 === 0) {
      direction = [180, 0];
    } else {
      direction = [0, 180];
    };
    return direction;
  },
};

move.timeline.push(example);

// 练习

var instruction_match_practice = {
  type: jsPsychHtmlKeyboardResponse,
  stimuls: "",
  on_start: function() {
    //document.body.style.backgroundColor = "black";
    if (userId % 2 === 0) {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px">  
        <h3 style="text-align: center; font-size: 30px; margin: 10px;">练习阶段</h3>
        <p>一致运动方向为 <span style="font-weight: bold">左</span>代表<span style="font-weight: bold">你自己</span> ，为<span style="font-weight: bold">右</span>代表<span style="font-weight: bold">他人</span>，</p >
        <p>您需要在3秒内判断 <span style="font-weight: bold">散点图的运动方向与文字是否匹配</span>，<span style="color: hsl(135, 50%, 50%);">匹配</span> 按 <span style="color: hsl(135, 50%, 50%);">"F" 键</span>；<span style="color: red;">不匹配</span> 按 <span style="color: red;">"J" 键</span></p >
        <p>正确率达到 70% 及以上才能进入下一个阶段 </p >
        <p>请把左手食指放在 "F" 键上，右手食指放在 "J" 键上</p >
        <p>请按下空格键开始练习</p >
      </div>`;
    } else {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px">  
        <h3 style="text-align: center; font-size: 30px; margin: 10px;">练习阶段</h3>
        <p>一致运动方向为<span style="font-weight: bold">右</span>代表<span style="font-weight: bold">你自己</span> ，为<span style="font-weight: bold">左</span>代表<span style="font-weight: bold">他人</span>，</p >
        <p>您需要在3秒内判断 <span style="font-weight: bold">散点图的运动方向与文字是否匹配</span>，<span style="color: hsl(135, 50%, 50%);">匹配</span> 按 <span style="color: hsl(135, 50%, 50%);">"F" 键</span>；<span style="color: red;">不匹配</span> 按 <span style="color: red;">"J" 键</span></p >
        <p>正确率达到 70% 及以上才能进入下一个阶段 </p >
        <p>请把左手食指放在 "F" 键上，右手食指放在 "J" 键上</p >
        <p>请按下空格键开始练习</p >
      </div>`;
    }
  },
  response_ends_trial: true,
  choices: " ",
  data: {
    part: "instruction_match_practice", 
  }
};

//move.timeline.push(instruction_practice);

fixation = { 
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p style='font-size: 48px; color: white'>+</p >",
  trial_duration: 500,
  choices: "NO-KEYS",
  data: {
     part: "fixation"
  }
};

//匹配判断任务的不同条件(subjectId 为偶数，则向左代表自己；subjectId 为奇数，则向右代表自己)
// 4 种不同的难度 * 2 种关联类型 * 2 种匹配类型 = 16种条件

let conditions_match_selfLeft = [
  // difficulty:1 (fjjf)
  { coherence: 0.20, coherent_direction: 180, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:1},
  { coherence: 0.20, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:1},
  { coherence: 0.20, coherent_direction: 0, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:1},
  { coherence: 0.20, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:1},  
  // difficulty:2 (jffj)
  { coherence: 0.16, coherent_direction: 0, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:2},
  { coherence: 0.16, coherent_direction: 180, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:2},
  { coherence: 0.16, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:2},
  { coherence: 0.16, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:2},  
  // difficulty:3 (fjjf)
  { coherence: 0.10, coherent_direction: 180, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:3},
  { coherence: 0.10, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:3},
  { coherence: 0.10, coherent_direction: 0, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:3},
  { coherence: 0.10, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:3}, 
  // difficulty:4 (jffj)
  { coherence: 0.05, coherent_direction: 0, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:4},
  { coherence: 0.05, coherent_direction: 180, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:4},
  { coherence: 0.05, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:4},
  { coherence: 0.05, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:4}
];

let conditions_match_selfRight = [
  // difficulty:1 (fjjf)
  { coherence: 0.20, coherent_direction: 0, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:1},
  { coherence: 0.20, coherent_direction: 0, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:1},
  { coherence: 0.20, coherent_direction: 180, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:1},
  { coherence: 0.20, coherent_direction: 180, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:1}, 
  // difficulty:2 (jffj)
  { coherence: 0.16, coherent_direction: 180, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:2},
  { coherence: 0.16, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:2},
  { coherence: 0.16, coherent_direction: 0, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:2},
  { coherence: 0.16, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:2}, 
  // difficulty:3 (fjjf)
  { coherence: 0.10, coherent_direction: 0, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:3},
  { coherence: 0.10, coherent_direction: 0, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:3},
  { coherence: 0.10, coherent_direction: 180, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:3},
  { coherence: 0.10, coherent_direction: 180, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:3},
  // difficulty:4 (jffj)
  { coherence: 0.05, coherent_direction: 180, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:4},
  { coherence: 0.05, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:4},
  { coherence: 0.05, coherent_direction: 0, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:4},
  { coherence: 0.05, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:4}
];


let condition1_match_selfLeft = [
  { coherence: 0.20, coherent_direction: 180, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:1},
  { coherence: 0.20, coherent_direction: 0, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:1},
  { coherence: 0.20, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:1},
  { coherence: 0.20, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:1}
];

let condition2_match_selfLeft = [
  { coherence: 0.16, coherent_direction: 180, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:2},
  { coherence: 0.16, coherent_direction: 0, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:2},
  { coherence: 0.16, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:2},
  { coherence: 0.16, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:2},
];

let condition3_match_selfLeft = [
  { coherence: 0.10, coherent_direction: 180, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:3},
  { coherence: 0.10, coherent_direction: 0, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:3},
  { coherence: 0.10, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:3},
  { coherence: 0.10, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:3},
];

let condition4_match_selfLeft = [
  { coherence: 0.05, coherent_direction: 180, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:4 },
  { coherence: 0.05, coherent_direction: 0, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:4},
  { coherence: 0.05, coherent_direction: 0, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:4},
  { coherence: 0.05, coherent_direction: 180, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:4},
];

let condition1_match_selfRight = [
  { coherence: 0.20, coherent_direction: 0, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:1},
  { coherence: 0.20, coherent_direction: 180, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:1},
  { coherence: 0.20, coherent_direction: 180, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:1},
  { coherence: 0.20, coherent_direction: 0, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:1}
];

let condition2_match_selfRight = [
  { coherence: 0.16, coherent_direction: 0, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:2},
  { coherence: 0.16, coherent_direction: 180, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:2},
  { coherence: 0.16, coherent_direction: 180, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:2},
  { coherence: 0.16, coherent_direction: 0, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:2},
];

let condition3_match_selfRight = [
  { coherence: 0.10, coherent_direction: 0, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:3},
  { coherence: 0.10, coherent_direction: 180, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:3},
  { coherence: 0.10, coherent_direction: 180, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:3},
  { coherence: 0.10, coherent_direction: 0, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:3},
];

let condition4_match_selfRight = [
  { coherence: 0.05, coherent_direction: 0, label: "我", correct_choice: "f", isMatch: "match", association: "self", difficulty:4},
  { coherence: 0.05, coherent_direction: 180, label: "我", correct_choice: "j", isMatch: "mismatch", association: "other", difficulty:4},
  { coherence: 0.05, coherent_direction: 180, label: "他", correct_choice: "f", isMatch: "match", association: "other", difficulty:4},
  { coherence: 0.05, coherent_direction: 0, label: "他", correct_choice: "j", isMatch: "mismatch", association: "self", difficulty:4},
];

// 设置匹配任务的主要刺激

var match_RDK = {
  type: jsPsychRdk,
  number_of_apertures: 1,
  number_of_dots: 100,
  dot_color: ["hsl(225, 50%, 50%)", "hsl(0, 50%, 50%)"],
  choices: ["f", "j"],
  correct_choice: function () {return jsPsych.timelineVariable("correct_choice")}, 
  coherent_direction: function () { return jsPsych.timelineVariable("coherent_direction") },
  coherence: function () {return jsPsych.timelineVariable("coherence")},
  dot_radius: 5,
  move_distance: 3,
  aperture_width: 500,
  aperture_height: 500,
  aperture_center_x: 957,
  aperture_center_y: 250,
  //aperture_center_x: 900, //这是实验室的设备
  //aperture_center_y: 250,
  background_color: "black",
  trial_duration: 3000,
  motion_change_delay: randomInteger(6, 12),
  data: {
    part: "match_RDK",
    task: "response",
    difficulty: function () { return jsPsych.timelineVariable("difficulty") },
    //correct_response: function () { return jsPsych.timelineVariable("correct_choice") },
    isMatch: function () { return jsPsych.timelineVariable("isMatch") },
    association: function () { return jsPsych.timelineVariable("association") },
  },
  on_start: function() {

    /* 替换最后 8 个元素的 label 属性 （索引从 8-15）
    for (let i = 8; i < 16; i++) {
      conditions_match_selfLeft[i].label = `${labelVar}`;
      conditions_match_selfRight[i].label = `${labelVar}`;
    };
    */

    function updateLabel(arr) {
      for (let i in arr) {
        if (arr[i].label == "他") {
          arr[i].label = `${labelVar}`;
        }
      }
    };
    updateLabel(conditions_match_selfLeft);
    updateLabel(conditions_match_selfRight);
    updateLabel(condition1_match_selfLeft);
    updateLabel(condition1_match_selfRight);
    updateLabel(condition2_match_selfLeft);
    updateLabel(condition2_match_selfRight);
    updateLabel(condition3_match_selfLeft);
    updateLabel(condition3_match_selfRight);
    updateLabel(condition4_match_selfLeft);
    updateLabel(condition4_match_selfRight);
    

    console.log('coherenceArray: ', window.coherence)

    // 替换 coherence 的值
    // 调用函数处理conditions_match_selfLeft和conditions_match_selfRight
    updateCoherence(conditions_match_selfLeft);
    updateCoherence(conditions_match_selfRight);
    updateCoherence(condition1_match_selfLeft);
    updateCoherence(condition1_match_selfRight);
    updateCoherence(condition2_match_selfLeft);
    updateCoherence(condition2_match_selfRight);
    updateCoherence(condition3_match_selfLeft);
    updateCoherence(condition3_match_selfRight);
    updateCoherence(condition4_match_selfLeft);
    updateCoherence(condition4_match_selfRight);
    
    
    var displayElement = jsPsych.getDisplayElement();

    // 创建一个div元素显示标签文字--------(这个位置可能还需要改一下)
    var textDiv = document.createElement("div");
    textDiv.textContent = jsPsych.timelineVariable("label"),
    textDiv.style.position = "absolute";
    textDiv.style.fontSize = "45px";
    textDiv.style.height = "10px";
    textDiv.style.bottom = "20%";
    textDiv.style.left = "48%";
    textDiv.style.margintop = "15px";
    textDiv.style.color = "white";
    displayElement.appendChild(textDiv);

    // 1000毫秒后隐藏刺激
    /*setTimeout(function() {
      var elements = displayElement.querySelectorAll("*");
      elements.forEach(function(el) {
        el.style.display = 'none';
      });
    }, 3000);*/
  },
  on_finish: function(data){
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_choice);
    console.log('current coherence ', data.coherence)
  },
};

//练习阶段每个试次的反馈

var feedbackTrial = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 500,
  stimulus: function(){
    // this function will check the accuracy of the last response and use that information to set
    // the stimulus value on each trial.
    var trial_data = jsPsych.data.get().last(1).values()[0];
    var correct = trial_data.correct;
    var rt = trial_data.rt
    if(rt > 0 && rt < 250){
      return `<p style='font-size: 60px; color: yellow'>太快!</p>`; 
    } else if(rt == -1) {
      return `<p style='font-size: 60px; color: yellow'>太慢!</p>`; 
    } else if(correct){
      return `<p style='font-size: 60px; color: green'>正确!</p>`;
    } else {
      return `<p style='font-size: 60px; color: red'>错误!</p>`;
    }
  },
};

//计算整个练习阶段的总体正确率
//计算 32 个试次的反应数，挑出正确的试次数，计算准确率 
//如果整体正确率未达到 70% 以及上，则让被试继续练习

var instruction_continuePractice = {
  type: jsPsychHtmlKeyboardResponse,
  stimuls: "",
  on_start: function() {
    if (userId % 2 === 0) {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px">  
        <p>您的正确率未达 70% ，不能进入下一阶段</p >
        <p >您的任务是：判断散点图的运动方向与文字标签是否匹配 。向左运动代表你自己；向右运动代表他人。</p>
        <p >如果二者<span style="color: hsl(135, 50%, 50%)">匹配</span>，请按 <span style="color: hsl(135, 50%, 50%)">"F" 键</span></p>
        <p >如果二者<span style="color: red">不匹配</span>，请按 <span style="color: red">"J" 键</span></p>
        <p>请按 "Q" 键继续练习</p >
      </div>`;
    } else {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px">  
        <p>您的正确率未达 70% ，不能进入下一阶段</p >
        <p >您的任务是：判断散点图的运动方向与文字标签是否匹配 。向右运动代表你自己；向左运动代表他人。</p>
        <p >如果二者<span style="color: hsl(135, 50%, 50%)">匹配</span>，请按 <span style="color: hsl(135, 50%, 50%)">"F" 键</span></p>
        <p >如果二者<span style="color: red">不匹配</span>，请按 <span style="color: red">"J" 键</span></p>
        <p>请按 "Q" 键继续练习</p >
      </div>`;
    }
  },
  response_ends_trial: true,
  choices: "q",
  data: {
    part: "instruction_continuePractice", 
  }
};

//如果达到70%及以上，则结束练习

var instruction_practiceEnd = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div style="text-align: center; color: white; padding: 30px; font-size: 30px">
    <p>恭喜您完成练习，请按空格键进入正式任务</p >
    <p> 正式任务仅在 每组 测试结束后提供反馈</p>
  </div>
  `,
  response_ends_trial: true,
  choices: " ",
  on_finish: function () {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_practiceEnd"
  },
};

//if_practiceAgain 用于判断是否呈现 feedback_continuePractice

var if_practiceAgain = {
  timeline: [instruction_continuePractice],
  conditional_function: function () { 
    var trials = jsPsych.data.get().filter({task: 'response'}).last(32)
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    if (accuracy >= window.pract_pass_rate) {
      return false;//达标就skip掉instruction_continuePractice这一段
    } else if (accuracy < window.pract_pass_rate) { //没达标呈现instruction_continuePractice
      return true;
    }
  }
};

//if_endPractice 用于判断是否呈现 instruction_practiceEnd

var if_endPractice = {
  timeline: [instruction_practiceEnd],
  conditional_function: function () {
    var trials = jsPsych.data.get().filter({task: 'response'}).last(32) //这里的数量视具体情况而定
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    if (accuracy >= window.pract_pass_rate) {
      return true;//达标呈现 instruction_practiceEnd
    } else if (accuracy < window.pract_pass_rate) { 
      return false;
    }
  }
};

//--------这里是练习

var practice_block_selfLeft = {
  timeline: [
    instruction_match_practice,
    {
      timeline: [fixation, match_RDK, feedbackTrial],
      timeline_variables: conditions_match_selfLeft,
      repetitions: 2, 
      randomize_order: false
    },
    if_practiceAgain,
    if_endPractice,
  ],
  loop_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "q")) {
      return true;
    } else {
      return false;
    }
  },
};

var practice_block_selfRight = {
  timeline: [
    instruction_match_practice,
    {
      timeline: [fixation, match_RDK, feedbackTrial],
      timeline_variables: conditions_match_selfRight,
      repetitions: 2,
      randomize_order: false
    },
    if_practiceAgain,
    if_endPractice,
  ],
  loop_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "q")) {
      return true;
    } else {
      return false;
    }
  },
};

var practice_selfLeft = {
  timeline: [practice_block_selfLeft],
  conditional_function: function(){
    if (userId % 2 === 0) {
      console.log("match_selfLeft");
      return true;
    } else {
      return false;
    }
  }
};

var practice_selfRight = {
  timeline: [practice_block_selfRight],
  conditional_function: function(){
    if (userId % 2 !== 0) {
      console.log("match_selfRight");
      return true;
    } else {
      return false;
    }
  }
};

var practice_match = { 
  timeline: [practice_selfLeft, practice_selfRight]
};

move.timeline.push(practice_match);

//--------这里是正式

var instruction_match_formal = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div style="text-align: center; color: white; padding: 35px; font-size: 35px">
    <p>请按下空格键开始【正式任务】</p >
  </div>
  `,
  response_ends_trial: true,
  choices: " ",
  on_finish: function() {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_match_formal"
  }
}; 

var rest_match = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    // 根据 currentBlock 生成提示信息
    return `
      <div style="text-align: center; color: white; padding: 35px; font-size: 35px">
        <p>恭喜您，已完成 ${currentBlock}/8</p>
        <p>请休息一下，若准备好可按空格键继续</p>
      </div>
    `;
  },
  response_ends_trial: true,
  choices: " ",
  on_start: function() {
    currentBlock += 1
  },
  on_finish: function() {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_rest"
  }
};

var rest_rdk = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    // 根据 currentBlock 生成提示信息
    return `
      <div style="text-align: center; color: white; padding: 35px; font-size: 35px">
        <p>恭喜您，已完成 ${currentBlock}/4</p>
        <p>请休息一下，若准备好可按空格键继续</p>
      </div>
    `;
  },
  response_ends_trial: true,
  choices: " ",
  on_start: function() {
    currentBlock += 1
  },
  on_finish: function() {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_rest"
  }
};

// 设置 block 的反馈

var feedbackBlock_match = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 3000,
  stimulus: function() {
    var trials = jsPsych.data.get().filter({task: 'response'}).last(48) //这里的数量视具体情况而定
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(trials.select('rt').mean());
    console.log({ accuracy: accuracy, rt: rt });
    return `<p style='font-size: 35px; color: white'>本组测试中，您的正确率为： ${accuracy}% ，平均反应时为：${rt}毫秒。</p>`;   
  }
};

var formal_block_selfLeft = {
  timeline: [
    instruction_match_formal,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition1_match_selfLeft,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition3_match_selfLeft,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition2_match_selfLeft,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition4_match_selfLeft,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition3_match_selfLeft,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition1_match_selfLeft,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition4_match_selfLeft,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition2_match_selfLeft,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
  ],
};

var formal_block_selfRight = {
  timeline: [
    instruction_match_formal,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition1_match_selfRight,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition3_match_selfRight,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition2_match_selfRight,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition4_match_selfRight,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition3_match_selfRight,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition1_match_selfRight,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition4_match_selfRight,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: condition4_match_selfRight,
      repetitions: 12,
      randomize_order: true
    },
    feedbackBlock_match,
    rest_match
  ],
};


var formal_selfLeft = {
  timeline: [formal_block_selfLeft],
  conditional_function: function(){
    if (userId % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }
};

var formal_selfRight = {
  timeline: [formal_block_selfRight],
  conditional_function: function(){
    if (userId % 2 !== 0) {
      return true;
    } else {
      return false;
    }
  }
};

var formal_match = { 
  timeline: [formal_selfLeft, formal_selfRight]
};

move.timeline.push(formal_match);

/*----------匹配任务结束！下面是 RDK 运动方向判断任务-----------*/


//指导语(包含开始，练习和结束)

var instruction_RDK_beginning = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align: left; color: white; padding: 10px"> 
      <h3 style="text-align: center; font-size: 30px; margin: 10px">任务二：运动方向判断</h3>
      <p>接下来，屏幕上会呈现一些运动的彩色圆点，</p>
      <p>大约 <span style="font-weight: bold">0.2秒</span> 后会有一定比例的点 <span style="font-weight: bold">一致地向左或向右运动</span> ，其余点随机运动</p >
      <p>您需要忽略点的颜色并在3秒内判断 <span style="font-weight: bold">一致的运动方向是向左还是向右</span>:</p >
      <ul>
        <li><span style="font-weight: bold">向左</span>，请按键盘 <span style="font-weight: bold">左键</span></li>
        <li><span style="font-weight: bold">向右</span>，请按键盘 <span style="font-weight: bold">右键</span> </li>
      </ul>
      <p>请按下空格键进入练习阶段</p>
    </div>`,
  response_ends_trial: true,
  choices: " ",
  on_start: function() {
    currentBlock = 1
  },
  data: {
    part: "instruction_RDK_beginning", 
  }
};

//move.timeline.push(instruction_RDK_beginning);

//下面这些指导语会在后面 push

var instruction_RDK_practice = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div style="text-align: center; color: white; padding: 35px; font-size: 30px">
    <p>请把右手食指放在键盘 左键 上，中指放在 右键 上</p >
    <p>请按下空格键进入【练习阶段】</p >
  </div>
  `,
  response_ends_trial: true,
  choices: " ",
  on_finish: function() {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_RDK_practice"
  }
};

var instruction_RDK_practice_end = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div style="text-align: center; color: white; padding: 30px; font-size: 30px">
    <p>练习结束！</p >
    <p>继续练习请按 "Q" 键 </p>
    <p>进入正式实验请按空格键, 正式实验仅在 每组 测试结束后提供反馈</p>
  </div>
  `,
  response_ends_trial: true,
  choices: ["q", " "],
  on_finish: function () {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_RDK_practice_end"
  },
};

var instruction_RDK_formal_beginning = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div style="text-align: center; color: white; padding: 35px; font-size: 30px">
    <p>请把右手食指放在键盘 左键 上，中指放在 右键 上</p >
    <p>请按下空格键开始【正式实验】</p >
  </div>
  `,
  response_ends_trial: true,
  choices: " ",
  on_finish: function() {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_RDk_formal_beginning"
  }
};


// 运动方向判断任务

//运动方向判断任务的不同条件
// 2 * 4 = 8 种条件

let conditions_RDK_selfLeft = [
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.20, difficulty: 1, association: "self"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.20, difficulty: 1, association: "other"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.16, difficulty: 2, association: "other"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.16, difficulty: 2, association: "self"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.10, difficulty: 3, association: "other"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.10, difficulty: 3, association: "self"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.05, difficulty: 4, association: "self"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.05, difficulty: 4, association: "other"},
];

let condition1_RDK_selfLeft = [
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.20, difficulty: 1, association: "self"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.20, difficulty: 1, association: "other"},
];

let condition2_RDK_selfLeft = [
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.16, difficulty: 2, association: "other"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.16, difficulty: 2, association: "self"},
];

let condition3_RDK_selfLeft = [
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.10, difficulty: 3, association: "other"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.10, difficulty: 3, association: "self"},
];

let condition4_RDK_selfLeft = [
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.05, difficulty: 4, association: "self"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.05, difficulty: 4, association: "other"},
];

let conditions_RDK_selfRight = [
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.20, difficulty: 1, association: "self"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.20, difficulty: 1, association: "other"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.16, difficulty: 2, association: "other"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.16, difficulty: 2, association: "self"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.10, difficulty: 3, association: "other"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.10, difficulty: 3, association: "self"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.05, difficulty: 4, association: "self"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.05, difficulty: 4, association: "other"},
];

let condition1_RDK_selfRight = [
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.20, difficulty: 1, association: "self"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.20, difficulty: 1, association: "other"},
];

let condition2_RDK_selfRight = [
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.16, difficulty: 2, association: "other"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.16, difficulty: 2, association: "self"},
];

let condition3_RDK_selfRight = [
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.10, difficulty: 3, association: "other"},
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.10, difficulty: 3, association: "self"},
];

let condition4_RDK_selfRight = [
  { coherent_direction: 0, correct_choice: "ArrowRight", coherence: 0.05, difficulty: 4, association: "self"},
  { coherent_direction: 180, correct_choice: "ArrowLeft", coherence: 0.05, difficulty: 4, association: "other"},
];

//主要呈现的刺激

var RDK = {
  type: jsPsychRdk,
  number_of_dots: 100,
  dot_color: ["hsl(0, 50%, 50%)", "hsl(225, 50%, 50%)"],
  choices: ["ArrowRight", "ArrowLeft"],
  correct_choice: function () { return jsPsych.timelineVariable("correct_choice") }, 
  coherent_direction: function () { return jsPsych.timelineVariable("coherent_direction") },
  coherence: function () { return jsPsych.timelineVariable("coherence") },
  dot_radius: 5.7,
  move_distance: 3,
  aperture_width: 550,
  aperture_height: 550,
  //aperture_center_y: 330,
  //aperture_center_x: 700,
  aperture_center_y: 360,
  aperture_center_x: 965,
  background_color: "black",
  trial_duration: 3000,
  motion_change_delay: randomInteger(6, 12),
  data: {
    part: "RDK",
    task: "response",
    //correct_responce: function () { return jsPsych.timelineVariable("correct_choice") },
    difficulty: function () { return jsPsych.timelineVariable("difficulty") },
    association: function () { return jsPsych.timelineVariable("association") },
  },
  on_start: function() {
    // 替换 coherence 的值
    updateCoherence(conditions_RDK_selfLeft);
    updateCoherence(conditions_RDK_selfRight);
    updateCoherence(condition1_RDK_selfLeft);
    updateCoherence(condition1_RDK_selfRight);
    updateCoherence(condition2_RDK_selfLeft);
    updateCoherence(condition2_RDK_selfRight);
    updateCoherence(condition3_RDK_selfLeft);
    updateCoherence(condition3_RDK_selfRight);
    updateCoherence(condition4_RDK_selfLeft);
    updateCoherence(condition4_RDK_selfRight);
    let displayElement = jsPsych.getDisplayElement();
    // 1000毫秒后隐藏刺激
    setTimeout(function() {
      let elements = displayElement.querySelectorAll("*");
      elements.forEach(function(el) {
        el.style.display = 'none';
      });
    }, 1000);
  },
  on_finish: function(data){
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_choice);
    // 重新显示元素
    let displayElement = jsPsych.getDisplayElement();
    let elements = displayElement.querySelectorAll("*");
    elements.forEach(function(el) {
      el.style.display = 'inline';
    });
  },
};


//练习阶段的任务

var practice_block_RDK_selfLeft = {
  timeline: [
    instruction_RDK_beginning,
    instruction_RDK_practice,
    {
      timeline: [fixation, RDK, feedbackTrial],
      timeline_variables: conditions_RDK_selfLeft,
      repetitions: 2,
      randomize_order: false
    },
    instruction_RDK_practice_end
  ],
  loop_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "q")) {
      return true;
    } else {
      return false;
    }
  },
};

var practice_block_RDK_selfRight = {
  timeline: [
    instruction_RDK_beginning,
    instruction_RDK_practice,
    {
      timeline: [fixation, RDK, feedbackTrial],
      timeline_variables: conditions_RDK_selfRight,
      repetitions: 2,
      randomize_order: false
    },
    instruction_RDK_practice_end
  ],
  loop_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "q")) {
      return true;
    } else {
      return false;
    }
  },
};

var practice_RDK_selfLeft = {
  timeline: [practice_block_RDK_selfLeft],
  conditional_function: function(){
    if (userId % 2 === 0) {
      console.log("practice_selfLeft");
      return true;
    } else {
      return false;
    }
  }
};

var practice_RDK_selfRight = {
  timeline: [practice_block_RDK_selfRight],
  conditional_function: function(){
    if (userId % 2 !== 0) {
      console.log("practice_selfRight");
      return true;
    } else {
      return false;
    }
  }
};


var practice_block_RDK = { 
  timeline: [practice_RDK_selfLeft, practice_RDK_selfRight]
};

move.timeline.push(practice_block_RDK);

//正式阶段的任务

//设置 block 的反馈

var feedbackBlock_RDK = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 3000,
  stimulus: function() {
    var trials = jsPsych.data.get().filter({task: 'response'}).last(48)
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(trials.select('rt').mean());
    console.log({ accuracy: accuracy, rt: rt });
    return `<p style='font-size: 35px; color: white'>本组测试中，您的正确率为： ${accuracy}% ，平均反应时为：${rt}毫秒。</p>`;   
  }
};

var formal_block_RDK_selfLeft = {
  timeline: [
    instruction_RDK_formal_beginning,
    {
      timeline: [fixation, RDK],
      timeline_variables: condition2_RDK_selfLeft,
      repetitions: 24,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest_rdk,
    {
      timeline: [fixation, RDK],
      timeline_variables: condition1_RDK_selfLeft,
      repetitions: 24,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest_rdk,
    {
      timeline: [fixation, RDK],
      timeline_variables: condition4_RDK_selfLeft,
      repetitions: 24,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest_rdk,
    {
      timeline: [fixation, RDK],
      timeline_variables: condition3_RDK_selfLeft,
      repetitions: 24,
      randomize_order: true
    },
    feedbackBlock_RDK, 
    rest_rdk,  
  ],
};

var formal_block_RDK_selfRight = {
  timeline: [
    instruction_RDK_formal_beginning,
    {
      timeline: [fixation, RDK],
      timeline_variables: condition1_RDK_selfRight,
      repetitions: 24,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest_rdk,
    {
      timeline: [fixation, RDK],
      timeline_variables: condition3_RDK_selfRight,
      repetitions: 24,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest_rdk,
    {
      timeline: [fixation, RDK],
      timeline_variables: condition2_RDK_selfRight,
      repetitions: 24,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest_rdk,
    {
      timeline: [fixation, RDK],
      timeline_variables: condition4_RDK_selfRight,
      repetitions: 24,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest_rdk,
  ],
};

var formal_RDK_selfLeft = {
  timeline: [formal_block_RDK_selfLeft],
  conditional_function: function(){
    if (userId % 2 === 0) {
      console.log("formal_selfLeft");
      return true;
    } else {
      return false;
    }
  }
};

var formal_RDK_selfRight = {
  timeline: [formal_block_RDK_selfRight],
  conditional_function: function(){
    if (userId % 2 !== 0) {
      console.log("formal_selfRight");
      return true;
    } else {
      return false;
    }
  }
};


var formal_block_RDK= { 
  timeline: [formal_RDK_selfLeft, formal_RDK_selfRight]
};

move.timeline.push(formal_block_RDK);

// over
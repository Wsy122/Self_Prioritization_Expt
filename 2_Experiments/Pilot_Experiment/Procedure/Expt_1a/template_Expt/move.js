
// 这段代码主要用于执行运动条件下的实验，即人物标签与运动方向匹配，之后进行散点群方向判断

var move = {
  timeline: []
};

var randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  };


   //--------------------匹配判断------------------------
   //匹配判断包含：指导语，示例，练习和正式任务
   
   // 指导语
   var instruction_match = {
    type: jsPsychHtmlKeyboardResponse,
    stimuls: "",
    on_start: function() {
      document.body.style.backgroundColor = "black";
      if (window.subjectIdGlobal % 2 === 0) {
        this.stimulus =  `
        <div style="text-align: left; color: white; padding: 10px; font-size: 25px"> 
          <h3 style="text-align: center; font-size: 35px; margin: 0;">任务一：匹配判断</h3>
          <p>接下来，屏幕上会呈现一些运动的圆点，</p>
          <p>如果图中大部分点向 <span style="font-weight: bold">左</span> 运动代表 <span style="font-weight: bold">你自己</span> ，大部分点向 <span style="font-weight: bold">右</span> 运动代表 <span style="font-weight: bold">生人（即陌生人）</span>。</p >
          <p>同时散点图的下方会出现 "自己" 或 "生人" 的文字标签。</p >
          <p>您需要判断 <span style="font-weight: bold">散点图的运动方向与文字是否匹配</span> 。</p >
          <ul>
            <li><span style="color: lightgreen">匹配</span>，请按键盘 <span style="color: lightgreen;">"F" 键</span>；</li>
            <li><span style="color: red">不匹配</span>，请按键盘 <span style="color: red">"J" 键</span> </li>
          </ul>
          <p>按下空格键后将呈现示例</p>
        </div>`;
      } else {
        this.stimulus =  `
        <div style="text-align: left; color: white; padding: 10px; font-size: 25px"> 
          <h3 style="text-align: center; font-size: 35px; margin: 0;">任务一：匹配判断</h3>
          <p>接下来，屏幕上会呈现一些运动的圆点，</p>
          <p>如果图中大部分点向 <span style="font-weight: bold">右</span> 运动代表 <span style="font-weight: bold">你自己</span> ，大部分点向 <span style="font-weight: bold">左</span> 运动代表 <span style="font-weight: bold">生人（即陌生人）</span>。</p >
          <p>同时散点图的下方会出现 "自己" 或 "生人" 的文字标签。</p >
          <p>您需要判断 <span style="font-weight: bold">散点图的运动方向与文字是否匹配</span> 。</p >
          <ul>
            <li><span style="color: lightgreen">匹配</span>，请按键盘 <span style="color: lightgreen">"F" 键</span>；</li>
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
    }
  };

  move.timeline.push(instruction_match);

   // 示例

  var example = {
    type: jsPsychRdk,
    number_of_apertures: 2,
    post_trial_gap: 500,
    number_of_dots: 100,
    RDK_type: 3,
    dot_color_after: "grey",
    choices: [" "],
    correct_choice: ["f"],
    coherent_direction: [0, 180],
    coherence: 0.6,
    dot_radius: 5,
    move_distance: 3,
    aperture_type: 1,
    aperture_width: 400,
    aperture_height: 400,
    aperture_center_x: [300,900],
    aperture_center_y: [280, 280],
    background_color: "black",
    trial_duration: 300000,
    move_delay: randomInteger(6, 12),
    data: {
      part: "example"
    },
    on_start: function() {
      var displayElement = jsPsych.getDisplayElement();
      // 创建第一个div元素显示最上面的说明文字
      var topTextDiv = document.createElement("p");
      topTextDiv.textContent = "现在呈现的是示例，如果准备好请按下空格键进入练习阶段";//这里可能还需要调整一下文字的位置
      topTextDiv.style.position = "relative";
      topTextDiv.style.fontSize = "28px";
      topTextDiv.style.height = "8px";
      topTextDiv.style.top = "-20px";
      topTextDiv.style.left = "1%";
      topTextDiv.style.marginBottom = "30px";
      topTextDiv.style.color = "hsl(135, 50%, 50%)";
      displayElement.appendChild(topTextDiv);

      // 创建第二个div元素显示左边的标签文字
      var leftTextDiv = document.createElement("div");
      leftTextDiv.textContent = "自己";
      leftTextDiv.style.position = "absolute";
      leftTextDiv.style.fontSize = "45px";
      leftTextDiv.style.height = "10px";
      leftTextDiv.style.bottom = "5%";
      leftTextDiv.style.left = "70%";
      leftTextDiv.style.color = "white";
      displayElement.appendChild(leftTextDiv);
  
      // 创建第三个div元素显示右边的标签文字
      var rightTextDiv = document.createElement("div");
      rightTextDiv.textContent = "生人";
      rightTextDiv.style.position = "absolute";
      rightTextDiv.style.fontSize = "45px";
      rightTextDiv.style.height = "10px";
      rightTextDiv.style.bottom = "5%";
      rightTextDiv.style.left = "20%";
      rightTextDiv.style.color = "white";
      displayElement.appendChild(rightTextDiv);
    }
};

move.timeline.push(example);

// 练习

var instruction_match_practice = {
  type: jsPsychHtmlKeyboardResponse,
  stimuls: "",
  on_start: function() {
    //document.body.style.backgroundColor = "black";
    if (window.subjectIdGlobal % 2 === 0) {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px; font-size: 25px">  
        <h3 style="text-align: center; font-size: 35px; margin: 10px;">练习阶段</h3>
        <p>大部分点向 <span style="font-weight: bold">左</span> 运动代表 <span style="font-weight: bold">你自己</span> ，大部分点向 <span style="font-weight: bold">右</span> 运动代表 <span style="font-weight: bold">生人（即陌生人）</span>。</p >
        <p>您需要判断 <span style="font-weight: bold">散点图的运动方向与文字是否匹配</span> 。</p >
        <p>匹配按 “F” 键；不匹配按 “J” 键 </p >
        <p>请把左手食指放在 "F" 键上，右手食指放在 "J" 键上</p >
        <p>请按下空格键开始</p >
      </div>`;
    } else {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px; font-size: 25px">  
        <h3 style="text-align: center; font-size: 35px; margin: 10px;">练习阶段</h3>
        <p>大部分点向 <span style="font-weight: bold">右</span> 运动代表 <span style="font-weight: bold">你自己</span> ，大部分点向 <span style="font-weight: bold">左</span> 运动代表 <span style="font-weight: bold">生人（即陌生人）</span>。</p >
        <p>您需要判断 <span style="font-weight: bold">散点图的运动方向与文字是否匹配</span> 。</p >
        <p><span style="color: lightgreen;">匹配</span>按 "F" 键；<span style="color: red;">不匹配</span>按 "J" 键 </p >
        <p>请把左手食指放在 "F" 键上，右手食指放在 "J" 键上</p >
        <p>请按下空格键开始</p >
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

var fixation = { 
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p style='font-size: 48px; color: white'>+</p >",
  trial_duration: 500,
  choices: "NO-KEYS",
  data: {
     part: "fixation"
  }
};

  //匹配判断任务的不同条件(subjectId 为偶数，则向左代表自己；subjectId 为奇数，则向右代表自己)

  var conditions_match_selfLeft = [
    { coherent_direction: 180, label: "自己", correct_choice: "f", match: 1 /*0 代表不匹配，1 代表匹配*/ },
    { coherent_direction: 0, label: "生人", correct_choice: "f", match: 1 },
    { coherent_direction: 0, label: "自己", correct_choice: "j", match: 0 },
    { coherent_direction: 180, label: "生人", correct_choice: "j", match: 0 }
  ];

  var conditions_match_selfRight = [
    { coherent_direction: 0, label: "自己", correct_choice: "f", match: 1 },
    { coherent_direction: 180, label: "生人", correct_choice: "f", match: 1 },
    { coherent_direction: 180, label: "自己", correct_choice: "j", match: 0 },
    { coherent_direction: 0, label: "生人", correct_choice: "j", match: 0 }
  ];

// 设置匹配任务的主要刺激

var match_RDK = {
  type: jsPsychRdk,
    number_of_apertures: 1,
    post_trial_gap: 500,
    number_of_dots: 100,
    RDK_type: 3,
    dot_color_after: "grey",
    choices: ["f", "j"],
    correct_choice: function () { return jsPsych.timelineVariable("correct_choice") }, //为什么要这样写？
    coherent_direction: function () { return jsPsych.timelineVariable("coherent_direction") },
    coherence: 0.6,
    dot_radius: 5,
    move_distance: 3,
    //aperture_type: 1,
    aperture_width: 500,
    aperture_height: 500,
    aperture_center_y: 250,
    aperture_center_x: 600,
    background_color: "black",
    trial_duration: 300000,
    move_delay: randomInteger(6, 12),
    data: {
      part: "match_RDK",
      task: "response",
      //match: function () { return jsPsych.timelineVariable("match") },
    },
    on_start: function() {
      var displayElement = jsPsych.getDisplayElement();

      // 创建一个div元素显示标签文字
      var textDiv = document.createElement("div");
      textDiv.textContent = jsPsych.timelineVariable("label"),

      textDiv.style.position = "absolute";
      textDiv.style.fontSize = "45px";
      textDiv.style.height = "10px";
      textDiv.style.bottom = "5%";
      textDiv.style.left = "47%";
      textDiv.style.margintop = "15px";
      textDiv.style.color = "white";
      displayElement.appendChild(textDiv);

      // 1000毫秒后隐藏刺激
      setTimeout(function() {
        var elements = displayElement.querySelectorAll("*");
        elements.forEach(function(el) {
          el.style.display = 'none';
        });
      }, 100000);
    },
    on_finish: function(data){
      data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_choice);
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
/* 计算24个试次的反应数，挑出正确的试次数，计算准确率 */

var feedbackBlock_match = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 3000,
  stimulus: function() {
    var trials = jsPsych.data.get().filter({task: 'response'}).last(4)
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    return `<p style='font-size: 35px; color: white'>您正确回答了： ${accuracy}% 的试次</p>`;   
  }
};

//如果整体正确率未达到70%以及上，则让被试继续练习

var instruction_continuePractice = {
  type: jsPsychHtmlKeyboardResponse,
  stimuls: "",
  on_start: function() {
    //document.body.style.backgroundColor = "black";
    if (window.subjectIdGlobal % 2 === 0) {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px; font-size: 25px">  
        <p>您的正确率未达到进入下一阶段练习的要求</p >
        <p >您的任务是：</p>判断散点图的运动方向与文字标签是否匹配 。向左运动代表 你自己；向右运动代表 他人。</p>
        <p >如果二者<span style="color: lightgreen">匹配</span>，请按 <span style="color: lightgreen">"F" 键</span></p>
        <p >如果二者<span style="color: red; font-size: 22px;">不匹配</span>，请按 <span style="color: red">"J" 键</span></p>
        <p>请按 "Q" 键继续练习</p >
      </div>`;
    } else {
      this.stimulus =  `
      <div style="text-align: left; color: white; padding: 10px; font-size: 25px">  
        <p>您的正确率未达到进入下一阶段练习的要求</p >
        <p >您的任务是：</p>判断散点图的运动方向与文字标签是否匹配 。向右运动代表 你自己；向左运动代表 他人。</p>
        <p >如果二者<span style="color: lightgreen">匹配</span>，请按 <span style="color: lightgreen">"F" 键</span></p>
        <p >如果二者<span style="color: red; font-size: 22px;">不匹配</span>，请按 <span style="color: red">"J" 键</span></p>
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
  <div style="text-align: center; color: white; padding: 30px; font-size: 25px">
    <p>恭喜您完成练习，请按空格键进入正式任务。</p >
    <p>请在进入正式任务之前将您的<span style='color: lightgreen;'>食指</span>放在电脑键盘的相应键位上进行按键，</p>
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
  conditional_function: function () { //这里需要重新计算一次？
    var trials = jsPsych.data.get().filter({task: 'response'}).last(4)
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    if (accuracy >= 70) {
      return false;//达标就skip掉instruction_continuePractice这一段
    } else if (accuracy < 70) { //没达标呈现instruction_continuePractice
      return true;
    }
  }
};

//if_endPractice 用于判断是否呈现 instruction_practiceEnd

var if_endPractice = {
  timeline: [instruction_practiceEnd],
  conditional_function: function () {
    var trials = jsPsych.data.get().filter({task: 'response'}).last(4)
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    if (accuracy >= 70) {
      return true;//达标呈现 instruction_practiceEnd
    } else if (accuracy < 70) { 
      return false;
    }
  }
};

//这里是练习

var practice_block_selfLeft = {
  timeline: [
    instruction_match_practice,
    {
      timeline: [fixation, match_RDK, feedbackTrial],
      timeline_variables: conditions_match_selfLeft,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_match,
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
  }
};

var practice_block_selfRight = {
  timeline: [
    instruction_match_practice,
    {
      timeline: [fixation, match_RDK, feedbackTrial],
      timeline_variables: conditions_match_selfRight,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_match,
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
  }
};

var practice_selfLeft = {
  timeline: [practice_block_selfLeft],
  conditional_function: function(){
    if (window.subjectIdGlobal % 2 === 0) {
      console.log("selfLeft");
      return true;
    } else {
      return false;
    }
  }
};

var practice_selfRight = {
  timeline: [practice_block_selfRight],
  conditional_function: function(){
    if (window.subjectIdGlobal % 2 !== 0) {
      console.log("selfRight");
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

//这里是正式

var instruction_match_formal = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div style="text-align: center; color: white; padding: 35px; font-size: 25px">
    <p>请按下空格键开始正式任务</p >
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

var rest = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div style="text-align: center; color: white; padding: 35px; font-size: 35px">
    <p>请休息一下，若准备好可按空格键继续</p >
  </div>
  `,
  response_ends_trial: true,
  choices: " ",
  on_finish: function() {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_rest"
  }
};

var formal_block_selfLeft = {
  timeline: [
    instruction_match_formal,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfLeft,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_match,
    rest,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfLeft,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_match,
    rest,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfLeft,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_match,
    rest, 
  ]
};

var formal_block_selfRight = {
  timeline: [
    instruction_match_formal,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfRight,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_match,
    rest,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfRight,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_match,
    rest,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfRight,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_match,
    rest, 
  ]
};


var formal_selfLeft = {
  timeline: [formal_block_selfLeft],
  conditional_function: function(){
    if (window.subjectIdGlobal % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }
};

var formal_selfRight = {
  timeline: [formal_block_selfRight],
  conditional_function: function(){
    if (window.subjectIdGlobal % 2 !== 0) {
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

/*----------匹配任务结束！下面是RDK运动方向判断任务-----------*/

//指导语(包含开始，练习和结束)

var instruction_RDK_beginning = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align: left; color: white; padding: 10px; font-size: 25px"> 
      <h3 style="text-align: center; font-size: 35px; margin: 0;">任务二：运动方向判断</h3>
      <p>接下来，屏幕上会呈现一些运动的圆点，</p>
      <p>大约 <span style="font-weight: bold">0.2秒</span> 后会有一定比例的点 <span style="font-weight: bold">向左或向右运动</span> ，</p >
      <p>您需要判断 <span style="font-weight: bold">散点图的整体（即大多数点）运动方向是向左还是向右</span> 。</p >
      <ul>
        <li><span style="font-weight: bold">向左</span>，请按键盘 <span style="font-weight: bold">左键</span>；</li>
        <li><span style="font-weight: bold">向右</span>，请按键盘 <span style="font-weight: bold">右键</span> </li>
      </ul>
      <p>请按下空格键进入练习阶段</p>
    </div>`,
  response_ends_trial: true,
  choices: " ",
  data: {
    part: "instruction_RDK_beginning", 
  }
};

move.timeline.push(instruction_RDK_beginning);

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
  choices: ["q", " ",],
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

var conditions_RDK = [
  { coherent_direction: 180, correct_choice: "ArrowLeft" },
  { coherent_direction: 0, correct_choice: "ArrowRight" },
  { coherent_direction: 0, correct_choice: "ArrowLeft" },
  { coherent_direction: 180, correct_choice: "ArrowRight" }
];

//主要呈现的刺激

var RDK = {
  type: jsPsychRdk,
    number_of_apertures: 1,
    post_trial_gap: 500,
    number_of_dots: 100,
    RDK_type: 3,
    dot_color_after: "grey",
    choices: ["ArrowRight", "ArrowLeft"],
    correct_choice: function () { return jsPsych.timelineVariable("correct_choice") }, 
    coherent_direction: function () { return jsPsych.timelineVariable("coherent_direction") },
    coherence: 0.6,
    dot_radius: 5,
    move_distance: 3,
    //aperture_type: 1,
    aperture_width: 600,
    aperture_height: 600,
    aperture_center_y: 330,
    aperture_center_x: 600,
    background_color: "black",
    trial_duration: 300000,
    move_delay: randomInteger(6, 12),
    data: {
      part: "RDK",
      task: "response",
      //match: function () { return jsPsych.timelineVariable("match") },
    },
    on_start: function() {
      var displayElement = jsPsych.getDisplayElement();
      // 1000毫秒后隐藏刺激
      setTimeout(function() {
        var elements = displayElement.querySelectorAll("*");
        elements.forEach(function(el) {
          el.style.display = 'none';
        });
      }, 100000);
    },
    on_finish: function(data){
      data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_choice);
    },
};

//设置反馈

//这里是练习(trial 的反馈可以用之前的，但 block 要重新计算)

var feedbackBlock_RDK = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 3000,
  stimulus: function() {
    var trials = jsPsych.data.get().filter({task: 'response'}).last(4)
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    return `<p style='font-size: 35px; color: white'>这一组测试中，您正确回答了： ${accuracy}% 的试次</p>`;   
  }
};

//练习阶段的任务

var practice_block_RDK = {
  timeline: [
    instruction_RDK_practice,
    {
      timeline: [fixation, RDK, feedbackTrial],
      timeline_variables: conditions_RDK,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_RDK,
    instruction_RDK_practice_end
  ],
  loop_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "q")) {
      return true;
    } else {
      return false;
    }
  }
};

move.timeline.push(practice_block_RDK);

//正式阶段的任务

var formal_block_RDK = {
  timeline: [
    instruction_RDK_formal_beginning,
    {
      timeline: [fixation, RDK],
      timeline_variables: conditions_RDK,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest,
    {
      timeline: [fixation, RDK],
      timeline_variables: conditions_RDK,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest,
    {
      timeline: [fixation, RDK],
      timeline_variables: conditions_RDK,
      repetitions: 1,
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest, 
  ]
};

move.timeline.push(formal_block_RDK);





  
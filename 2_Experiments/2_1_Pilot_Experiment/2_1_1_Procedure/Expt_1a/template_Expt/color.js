
// 这段代码主要用于执行颜色条件下的实验，即人物标签与颜色匹配，之后进行散点群整体颜色判断

var color = {
  timeline: []
};



//--------------------匹配判断------------------------
//匹配判断包含：指导语，示例，练习和正式任务

// 指导语
var instruction_match = {
  type: jsPsychHtmlKeyboardResponse,
  stimuls: "",
  on_start: function () {
    document.body.style.backgroundColor = "black";
    if (userId % 2 === 0) {
      this.stimulus = `
        <div style="text-align: left; color: white; padding: 10px"> 
          <h3 style="text-align: center; font-size: 30px; margin: 10px">任务一：匹配判断</h3>
          <p>接下来，屏幕上会呈现一些运动的圆点，其中一半为 <span style="color: hsl(0, 50%, 50%)">红色</span> ，一半为 <span style="color: hsl(225, 50%, 50%)">蓝色</span> 。</p>
          <p>同时散点图的下方会出现 "自己" 或 "生人" 的文字标签。</p >
          <p><span style="font-weight: bold">大约0.2秒后,</span>  一部分点会随机变为另一种颜色（例如从红色变为蓝色），变化后某种颜色的数量会超过另一种。</p >
          <p>如果整体颜色为 <span style="color: hsl(0, 50%, 50%)">红色</span> 代表 <span style="color: hsl(0, 50%, 50%)">你自己</span> ，整体颜色为 <span style="color: hsl(225, 50%, 50%)">蓝色</span> 代表 <span style="color: hsl(225, 50%, 50%)">生人（即陌生人）</span>。</p >
          <p>您需要在3秒内判断 <span style="font-weight: bold">散点图的整体颜色与文字是否匹配</span> 。</p >
          <ul>
            <li><span style="color: hsl(135, 50%, 50%)">匹配</span>，请按键盘 <span style="color: hsl(135, 50%, 50%)">"F" 键</span>；</li>
            <li><span style="color: red">不匹配</span>，请按键盘 <span style="color: red">"J" 键</span> </li>
          </ul>
          <p>按下空格键后将呈现示例</p>
        </div>`;
    } else {
      this.stimulus = `
        <div style="text-align: left; color: white; padding: 10px"> 
          <h3 style="text-align: center; font-size: 30px; margin: 10px">任务一：匹配判断</h3>
          <p>接下来，屏幕上会呈现一些运动的圆点，其中一半为 <span style="color: hsl(0, 50%, 50%)">红色</span> ，一半为 <span style="color: hsl(225, 50%, 50%)">蓝色</span> 。</p>
          <p>同时散点图的下方会出现 "自己" 或 "生人" 的文字标签。</p >
          <p><span style="font-weight: bold">大约0.2秒后,</span>  一部分点会随机变为另一种颜色（例如从红色变为蓝色），变化后某种颜色的数量会超过另一种。</p >
          <p>如果整体颜色为 <span style="color: hsl(225, 50%, 50%)">蓝色</span> 代表 <span style="color: hsl(225, 50%, 50%)">你自己</span> ，整体颜色为 <span style="color: hsl(0, 50%, 50%)">红色</span> 代表 <span style="color: hsl(0, 50%, 50%)">生人（即陌生人）</span>。</p >
          <p>您需要在3秒内判断 <span style="font-weight: bold">散点图的整体颜色与文字是否匹配</span> 。</p >
          <ul>
            <li><span style="color: hsl(135, 50%, 50%)">匹配</span>，请按键盘 <span style="color: hsl(135, 50%, 50%)">"F" 键</span>；</li>
            <li><span style="color: red">不匹配</span>，请按键盘 <span style="color: red">"J" 键</span> </li>
          </ul>
          <p>按下空格键后将呈现示例</p>
        </div>`;
    }
  },
  response_ends_trial: true,
  choices: " ",
  data: {
    part: "instruction_match",
  },
  on_finish: function() {
    if (testMode) {
      is_number_small = true
    } else {
      is_number_small = false
    }
    return is_number_small
  }
};

function getRepetitionsPract() {
  if (is_number_small) {
    return 1;
  } else {
    return 6;
  }
};

function getRepetitionsFormal() {
  if (is_number_small) {
    return 1;
  } else {
    return 10;
  }
};

color.timeline.push(instruction_match);

// 示例

var color_after;
var example = {
  type: jsPsychRdk,
  number_of_apertures: 4,
  post_trial_gap: 500,
  number_of_dots: [80, 20, 80, 20],
  RDK_type: 3,
  dot_color_beforeOne: "hsla(0, 50%, 50%, 70%)",
  dot_color_beforeTwo: "hsla(225, 50%, 50%, 70%)",
  dot_color_after: function () {
    if (!color_after) {
      if (userId % 2 === 0) {
        color_after = ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)"];
      } else {
        color_after = ["hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"];
      }
    }
    return color_after;
  },
  choices: [" "],
  correct_choice: [" "],
  coherent_direction: 0,
  coherence: 0,
  dot_radius: 5,
  move_distance: 3,
  aperture_type: 1,
  aperture_width: 400,
  aperture_height: 400,
  aperture_center_x: [300, 300, 900, 900],
  aperture_center_y: [280, 280, 280, 280],
  background_color: "black",
  trial_duration: 300000,
  color_delay: randomInteger(6, 12),
  data: {
    part: "example"
  },
  on_start: function () {
    var displayElement = jsPsych.getDisplayElement();
    // 创建第一个div元素显示最上面的说明文字
    var topTextDiv = document.createElement("p");
    topTextDiv.textContent = "【示例】 如果准备好请按下空格键进入练习阶段";//这里可能还需要调整一下文字的位置
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
    leftTextDiv.style.bottom = "16%";
    leftTextDiv.style.left = "31%";
    leftTextDiv.style.color = "white";
    displayElement.appendChild(leftTextDiv);

    // 创建第三个div元素显示右边的标签文字
    var rightTextDiv = document.createElement("div");
    rightTextDiv.textContent = "生人";
    rightTextDiv.style.position = "absolute";
    rightTextDiv.style.fontSize = "45px";
    rightTextDiv.style.height = "10px";
    rightTextDiv.style.bottom = "16%";
    rightTextDiv.style.left = "65%";
    rightTextDiv.style.color = "white";
    displayElement.appendChild(rightTextDiv);

    if (userId % 2 === 0) {
      color_after = ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)"];
    } else {
      color_after = ["hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"];
    };
    return color_after;
  },
};

color.timeline.push(example);

// 练习

var instruction_match_practice = {
  type: jsPsychHtmlKeyboardResponse,
  stimuls: "",
  on_start: function () {
    //document.body.style.backgroundColor = "black";
    if (userId % 2 === 0) {
      this.stimulus = `
        <div style="text-align: left; color: white; padding: 10px">  
          <h3 style="text-align: center; font-size: 30px; margin: 10px;">练习阶段</h3>
          <p>整体颜色为 <span style="color: hsl(0, 50%, 50%)">红色</span> 代表 <span style="color: hsl(0, 50%, 50%)">你自己</span> ，为 <span style="color: hsl(225, 50%, 50%)">蓝色</span> 代表 <span style="color: hsl(225, 50%, 50%)">生人（即陌生人）</span>。</p >
          <p>您需要在3秒内判断 <span style="font-weight: bold">散点图的整体颜色与文字是否匹配</span>，<span style="color: hsl(135, 50%, 50%);">匹配</span> 按 <span style="color: hsl(135, 50%, 50%);">"F" 键</span>；<span style="color: red;">不匹配</span> 按 <span style="color: red;">"J" 键</span> </p >
          <p>正确率达到 70% 及以上才能进入下一个阶段</p >
          <p>请把左手食指放在 "F" 键上，右手食指放在 "J" 键上</p >
          <p>请按下空格键开始练习</p >
        </div>`;
    } else {
      this.stimulus = `
        <div style="text-align: left; color: white; padding: 10px">  
          <h3 style="text-align: center; font-size: 30px; margin: 10px;">练习阶段</h3>
          <p>整体颜色为 <span style="color: hsl(225, 50%, 50%)">蓝色</span> 代表 <span style="color: hsl(225, 50%, 50%)">你自己</span> ，为 <span style="color: hsl(0, 50%, 50%)">红色</span> 代表 <span style="color: hsl(0, 50%, 50%)">生人（即陌生人）</span>。</p >
          <p>您需要在3秒内判断 <span style="font-weight: bold">散点图的运动方向与文字是否匹配</span>，<span style="color: hsl(135, 50%, 50%);">匹配</span> 按 <span style="color: hsl(135, 50%, 50%);">"F" 键</span>；<span style="color: red;">不匹配</span> 按 <span style="color: red;">"J" 键</span> </p >
          <p>正确率达到 70% 及以上才能进入下一个阶段</p >
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

//color.timeline.push(instruction_practice);

var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p style='font-size: 48px; color: white'>+</p >",
  trial_duration: 500,
  choices: "NO-KEYS",
  data: {
    part: "fixation"
  }
};

//匹配判断任务的不同条件(subjectId 为偶数，则红色代表自己；subjectId 为奇数，则蓝色代表自己)

var conditions_match_selfRed = [
  { number_of_dots: [80, 20], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], label: "自己", correct_choice: ["f"], correct_responce: "f", match: "yes", association: "self" },
  { number_of_dots: [20, 80], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], label: "自己", correct_choice: ["j"], correct_responce: "j", match: "no", association: "self" },
  { number_of_dots: [80, 20], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], label: "生人", correct_choice: ["j"], correct_responce: "j", match: "no", association: "other" },
  { number_of_dots: [80, 20], dot_color_after: ["hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)"], label: "生人", correct_choice: ["f"], correct_responce: "f", match: "yes", association: "other" },
];

var conditions_match_selfBlue = [
  { number_of_dots: [80, 20], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], label: "自己", correct_choice: ["j"], correct_responce: "j", match: "no", association: "self" },
  { number_of_dots: [20, 80], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], label: "自己", correct_choice: ["f"], correct_responce: "f", match: "yes", association: "self" },
  { number_of_dots: [80, 20], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], label: "生人", correct_choice: ["f"], correct_responce: "f", match: "yes", association: "other" },
  { number_of_dots: [80, 20], dot_color_after: ["hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)"], label: "生人", correct_choice: ["j"], correct_responce: "j", match: "no", association: "other" },
];

// 设置匹配任务的主要刺激

var match_RDK = {
  type: jsPsychRdk,
  number_of_apertures: 2,
  post_trial_gap: 500,
  number_of_dots: function () { return jsPsych.timelineVariable("number_of_dots") },
  RDK_type: 3,
  dot_color_after: "grey",
  choices: ["f", "j"],
  correct_choice: function () { return jsPsych.timelineVariable("correct_choice") },
  dot_color_beforeOne: "hsla(225, 50%, 50%, 70%)",
  dot_color_beforeTwo: "hsla(0, 50%, 50%, 70%)",
  dot_color_after: function () { return jsPsych.timelineVariable("dot_color_after") },
  coherent_direction: 0,
  coherence: 0,
  dot_radius: 5,
  move_distance: 3,
  //aperture_type: 1,
  aperture_width: 500,
  aperture_height: 500,
  aperture_center_y: 250,
  aperture_center_x: 600,
  background_color: "black",
  trial_duration: 3000,
  move_delay: randomInteger(6, 12),
  data: {
    part: "match_RDK",
    task: "response",
    correct_responce: function () { return jsPsych.timelineVariable("correct_responce") },
    match: function () { return jsPsych.timelineVariable("match") },
    association: function () { return jsPsych.timelineVariable("association") },
  },
  on_start: function () {
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
    }, 100000);*/
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_responce);
  },
};

//练习阶段每个试次的反馈

var feedbackTrial = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 500,
  stimulus: function () {
    // this function will check the accuracy of the last response and use that information to set
    // the stimulus value on each trial.
    var trial_data = jsPsych.data.get().last(1).values()[0];
    var correct = trial_data.correct;
    var rt = trial_data.rt
    if (rt > 0 && rt < 250) {
      return `<p style='font-size: 60px; color: yellow'>太快!</p>`;
    } else if (rt == -1) {
      return `<p style='font-size: 60px; color: yellow'>太慢!</p>`;
    } else if (correct) {
      return `<p style='font-size: 60px; color: green'>正确!</p>`;
    } else {
      return `<p style='font-size: 60px; color: red'>错误!</p>`;
    }
  },
};

//计算整个练习阶段的总体正确率
//计算24个试次的反应数，挑出正确的试次数，计算准确率 
//如果整体正确率未达到70%以及上，则让被试继续练习

var instruction_continuePractice = {
  type: jsPsychHtmlKeyboardResponse,
  stimuls: "",
  on_start: function () {
    //document.body.style.backgroundColor = "black";
    if (userId % 2 === 0) {
      this.stimulus = `
        <div style="text-align: left; color: white; padding: 10px">  
          <p>您的正确率未达到进入下一阶段的要求</p >
          <p >您的任务是：判断散点图的整体颜色与文字标签是否匹配 。整体为红色代表 你自己；整体为蓝色代表 生人。</p>
          <p >如果二者<span style="color: hsl(135, 50%, 50%)">匹配</span>，请按 <span style="color: hsl(135, 50%, 50%)">"F" 键</span></p>
          <p >如果二者<span style="color: red">不匹配</span>，请按 <span style="color: red">"J" 键</span></p>
          <p>请按 "Q" 键继续练习</p >
        </div>`;
    } else {
      this.stimulus = `
        <div style="text-align: left; color: white; padding: 10px">  
          <p>您的正确率未达到进入下一阶段的要求</p >
          <p >您的任务是：判断散点图的运动方向与文字标签是否匹配 。整体为蓝色代表 你自己；整体为红色代表 生人。</p>
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
      <p>恭喜您完成练习，请按空格键进入正式任务。</p >
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
    var trials = jsPsych.data.get().filter({ task: 'response' }).last(24)
    var correct_trials = trials.filter({ correct: true });
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
    var trials = jsPsych.data.get().filter({ task: 'response' }).last(24)
    var correct_trials = trials.filter({ correct: true });
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    if (accuracy >= 70) {
      return true;//达标呈现 instruction_practiceEnd
    } else if (accuracy < 70) {
      return false;
    }
  }
};

//这里是练习

var practice_block_selfRed = {
  timeline: [
    instruction_match_practice,
    {
      timeline: [fixation, match_RDK, feedbackTrial],
      timeline_variables: conditions_match_selfRed,
      repetitions: getRepetitionsPract(),
      randomize_order: true
    },
    if_practiceAgain,
    if_endPractice,
  ],
  loop_function: function () {
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "q")) {
      return true;
    } else {
      return false;
    }
  },
};

var practice_block_selfBlue = {
  timeline: [
    instruction_match_practice,
    {
      timeline: [fixation, match_RDK, feedbackTrial],
      timeline_variables: conditions_match_selfBlue,
      repetitions: getRepetitionsPract(),
      randomize_order: true
    },
    if_practiceAgain,
    if_endPractice,
  ],
  loop_function: function () {
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "q")) {
      return true;
    } else {
      return false;
    }
  },
};

var practice_selfRed = {
  timeline: [practice_block_selfRed],
  conditional_function: function () {
    if (userId % 2 === 0) {
      console.log("match_selfRed");
      return true;
    } else {
      return false;
    }
  }
};

var practice_selfBlue = {
  timeline: [practice_block_selfBlue],
  conditional_function: function () {
    if (userId % 2 !== 0) {
      console.log("match_selfBlue");
      return true;
    } else {
      return false;
    }
  }
};

var practice_match = {
  timeline: [practice_selfRed, practice_selfBlue]
};

color.timeline.push(practice_match);

//这里是正式

var instruction_match_formal = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align: center; color: white; padding: 35px; font-size: 35px">
      <p>请按下空格键开始【正式任务】</p >
    </div>
    `,
  response_ends_trial: true,
  choices: " ",
  on_finish: function () {
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
  on_finish: function () {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_rest"
  }
};

//设置反馈 block 的反馈

var feedbackBlock_match = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 3000,
  stimulus: function () {
    var trials = jsPsych.data.get().filter({ task: 'response' }).last(40)
    var correct_trials = trials.filter({ correct: true });
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(trials.select('rt').mean());
    console.log({ accuracy: accuracy, rt: rt });
    return `<p style='font-size: 35px; color: white'>这组测试中，您正确回答了： ${accuracy}% 的试次。平均反应时为：${rt}毫秒。</p>`; 
  }
};

var formal_block_selfRed = {
  timeline: [
    instruction_match_formal,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfRed,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_match,
    rest,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfRed,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_match,
    rest,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfRed,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_match,
  ],
};

var formal_block_selfBlue = {
  timeline: [
    instruction_match_formal,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfBlue,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_match,
    rest,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfBlue,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_match,
    rest,
    {
      timeline: [fixation, match_RDK],
      timeline_variables: conditions_match_selfBlue,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_match,
  ],
};


var formal_selfRed = {
  timeline: [formal_block_selfRed],
  conditional_function: function () {
    if (userId % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }
};

var formal_selfBlue = {
  timeline: [formal_block_selfBlue],
  conditional_function: function () {
    if (userId % 2 !== 0) {
      return true;
    } else {
      return false;
    }
  }
};

var formal_match = {
  timeline: [formal_selfRed, formal_selfBlue]
};

color.timeline.push(formal_match);

/*----------匹配任务结束！下面是RDK颜色判断任务-----------*/

//指导语(包含开始，练习和结束)

var instruction_RDK_beginning = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
      <div style="text-align: left; color: white; padding: 10px"> 
        <h3 style="text-align: center; font-size: 30px; margin: 10px">任务二：整体颜色判断</h3>
        <p>接下来，屏幕上会呈现一些运动的圆点，其中一半为 <span style="color: hsl(0, 50%, 50%)">红色</span> ，一半为 <span style="color: hsl(225, 50%, 50%)">蓝色</span>，</p>
        <p><span style="font-weight: bold">大约0.2秒后,</span>  一部分点会随机变为另一种颜色（例如从红色变为蓝色），变化后某种颜色的数量会超过另一种。</p >
        <p>您需要在3秒内判断 <span style="font-weight: bold">变化后，散点图的整体颜色（即大多数点的颜色）是红色还是蓝色 </span>：</p >
        <ul>
          <li>整体为 <span style="color: hsl(0, 50%, 50%)">红色</span>，请按键盘 <span style="color: hsl(0, 50%, 50%)">"D" 键</span></li>
          <li>整体为 <span style="color: hsl(225, 50%, 50%)">蓝色</span>，请按键盘 <span style="color: hsl(225, 50%, 50%)">"k" 键</span> </li>
        </ul>
        <p>请按下空格键进入练习阶段</p>
      </div>`,
  response_ends_trial: true,
  choices: " ",
  data: {
    part: "instruction_RDK_beginning",
  }
};

//color.timeline.push(instruction_RDK_beginning);

//下面这些指导语会在后面 push

var instruction_RDK_practice = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align: center; color: white; padding: 35px; font-size: 30px">
      <p>请把左手食指放在键盘 <span style="color: hsl(0, 50%, 50%)">"D"键</span> 上，右手食指放在 <span style="color: hsl(225, 50%, 50%)">"K"键</span> 上</p >
      <p>请按下空格键进入【练习阶段】</p >
    </div>
    `,
  response_ends_trial: true,
  choices: " ",
  on_finish: function () {
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
      <p>请把左手食指放在键盘 <span style="color: hsl(0, 50%, 50%)">"D"键</span> 上，右手食指放在 <span style="color: hsl(225, 50%, 50%)">"K"键</span> 上</p >
      <p>请按下空格键开始【正式实验】</p >
    </div>
    `,
  response_ends_trial: true,
  choices: " ",
  on_finish: function () {
    document.body.style.backgroundColor = "black";
  },
  data: {
    part: "instruction_RDk_formal_beginning"
  }
};


// 整体颜色判断任务

//整体颜色判断任务的不同条件

var conditions_RDK_selfRed = [
  { number_of_dots: [60, 40], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], correct_choice: ["d"], correct_responce: "d", difficulty: "easy", association: "self" },
  { number_of_dots: [58, 42], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], correct_choice: ["d"], correct_responce: "d", difficulty: "difficult", association: "self" },
  { number_of_dots: [60, 40], dot_color_after: ["hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)"], correct_choice: ["k"], correct_responce: "k", difficulty: "easy", association: "other" },
  { number_of_dots: [58, 42], dot_color_after: ["hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)"], correct_choice: ["k"], correct_responce: "k", difficulty: "difficult", association: "other" },
];

var conditions_RDK_selfBlue = [
  { number_of_dots: [60, 40], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], correct_choice: ["d"], correct_responce: "d", difficulty: "easy", association: "other" },
  { number_of_dots: [58, 42], dot_color_after: ["hsla(0, 50%, 50%, 70%)", "hsla(225, 50%, 50%, 70%)"], correct_choice: ["d"], correct_responce: "d", difficulty: "difficult", association: "other" },
  { number_of_dots: [60, 40], dot_color_after: ["hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)"], correct_choice: ["k"], correct_responce: "k", difficulty: "easy", association: "self" },
  { number_of_dots: [58, 42], dot_color_after: ["hsla(225, 50%, 50%, 70%)", "hsla(0, 50%, 50%, 70%)"], correct_choice: ["k"], correct_responce: "k", difficulty: "difficult", association: "self" },
];

//主要呈现的刺激

var RDK = {
  type: jsPsychRdk,
  number_of_apertures: 2,
  post_trial_gap: 500,
  number_of_dots: function () { return jsPsych.timelineVariable("number_of_dots") },
  RDK_type: 3,
  choices: ["d", "k"],
  correct_choice: function () { return jsPsych.timelineVariable("correct_choice") },
  dot_color_beforeOne: "hsla(225, 50%, 50%, 70%)",
  dot_color_beforeTwo: "hsla(0, 50%, 50%, 70%)",
  dot_color_after: function () { return jsPsych.timelineVariable("dot_color_after") },
  coherent_direction: 0,
  coherence: 0,
  dot_radius: 5.7,
  move_distance: 3,
  //aperture_type: 1,
  aperture_width: 600,
  aperture_height: 600,
  aperture_center_y: 330,
  aperture_center_x: 600,
  background_color: "black",
  trial_duration: 3000,
  move_delay: randomInteger(6, 12),
  data: {
    part: "RDK",
    task: "response",
    correct_responce: function () { return jsPsych.timelineVariable("correct_responce") },
    difficulty: function () { return jsPsych.timelineVariable("difficulty") },
    association: function () { return jsPsych.timelineVariable("association") },
  },
  /*on_start: function() {
    var displayElement = jsPsych.getDisplayElement();
    // 1000毫秒后隐藏刺激
    setTimeout(function() {
      var elements = displayElement.querySelectorAll("*");
      elements.forEach(function(el) {
        el.style.display = 'none';
      });
    }, 100000);
  },*/
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_responce);
  },
};

//练习阶段的任务

var practice_block_RDK_selfRed = {
  timeline: [
    instruction_RDK_beginning,
    instruction_RDK_practice,
    {
      timeline: [fixation, RDK, feedbackTrial],
      timeline_variables: conditions_RDK_selfRed,
      repetitions: getRepetitionsPract(),
      randomize_order: true
    },
    instruction_RDK_practice_end
  ],
  loop_function: function () {
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "q")) {
      return true;
    } else {
      return false;
    }
  },
};

var practice_block_RDK_selfBlue = {
  timeline: [
    instruction_RDK_beginning,
    instruction_RDK_practice,
    {
      timeline: [fixation, RDK, feedbackTrial],
      timeline_variables: conditions_RDK_selfBlue,
      repetitions: getRepetitionsPract(),
      randomize_order: true
    },
    instruction_RDK_practice_end
  ],
  loop_function: function () {
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "q")) {
      return true;
    } else {
      return false;
    }
  },
};

var practice_RDK_selfRed = {
  timeline: [practice_block_RDK_selfRed],
  conditional_function: function () {
    if (userId % 2 === 0) {
      console.log("practice_selfRed");
      return true;
    } else {
      return false;
    }
  }
};

var practice_RDK_selfBlue = {
  timeline: [practice_block_RDK_selfBlue],
  conditional_function: function () {
    if (userId % 2 !== 0) {
      console.log("practice_selfBlue");
      return true;
    } else {
      return false;
    }
  }
};


var practice_block_RDK = {
  timeline: [practice_RDK_selfRed, practice_RDK_selfBlue]
};

color.timeline.push(practice_block_RDK);

//正式阶段的任务

//设置反馈

var feedbackBlock_RDK = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 3000,
  stimulus: function() {
    var trials = jsPsych.data.get().filter({task: 'response'}).last(40)
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(trials.select('rt').mean());
    console.log({ accuracy: accuracy, rt: rt });
    return `<p style='font-size: 35px; color: white'>这组测试中，您正确回答了： ${accuracy}% 的试次。平均反应时为：${rt}毫秒。</p>`;   
  }
};

var formal_block_RDK_selfRed = {
  timeline: [
    instruction_RDK_formal_beginning,
    {
      timeline: [fixation, RDK],
      timeline_variables: conditions_RDK_selfRed,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest,
    {
      timeline: [fixation, RDK],
      timeline_variables: conditions_RDK_selfRed,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest,
    {
      timeline: [fixation, RDK],
      timeline_variables: conditions_RDK_selfRed,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_RDK,
  ],
};

var formal_block_RDK_selfBlue = {
  timeline: [
    instruction_RDK_formal_beginning,
    {
      timeline: [fixation, RDK],
      timeline_variables: conditions_RDK_selfBlue,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest,
    {
      timeline: [fixation, RDK],
      timeline_variables: conditions_RDK_selfBlue,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_RDK,
    rest,
    {
      timeline: [fixation, RDK],
      timeline_variables: conditions_RDK_selfBlue,
      repetitions: getRepetitionsFormal(),
      randomize_order: true
    },
    feedbackBlock_RDK,
  ],
};

var formal_RDK_selfRed = {
  timeline: [formal_block_RDK_selfRed],
  conditional_function: function () {
    if (userId % 2 === 0) {
      console.log("formal_selfRed");
      return true;
    } else {
      return false;
    }
  }
};

var formal_RDK_selfBlue = {
  timeline: [formal_block_RDK_selfBlue],
  conditional_function: function () {
    if (userId % 2 !== 0) {
      console.log("formal_selfBlue");
      return true;
    } else {
      return false;
    }
  }
};


var formal_block_RDK = {
  timeline: [formal_RDK_selfRed, formal_RDK_selfBlue]
};

color.timeline.push(formal_block_RDK);






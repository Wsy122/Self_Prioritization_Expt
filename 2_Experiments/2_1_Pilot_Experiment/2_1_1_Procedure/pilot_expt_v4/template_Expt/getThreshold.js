// 此脚本是用来获取初始阈值
/*-----------------------------------------------------------

1. 被试首先需要完成一个简短的知觉判断测试（大概20个trial）;
2. 根据被试编号将其分配到运动/颜色判断;
3. 程序采用预实验3中的楼梯程序，将最后的 coherence 保存为 data; 
  - 更新：现在是直接保存为全局变量。
4. 获取 data.coherence 并传递给 move.js 和 color.js;

可能的问题：

1. 获取的data如何传递到其他脚本;
2. 脚本加载顺序;
3. coherence 作为时间线变量能否改变或替换;
4. 如何在一个脚本实现运动和颜色阈值的获取;

------------------------------------------------------------*/

// 初始化全局数组，用于存储相干性比例
window.coherence = []; 
window.proportion = [];

var getThreshold = {
  timeline: []
};

let currentCycleMunMotion = 0;
let currentCycleMunColor = 0;
let motionStage = 0;
let colorStage = 0;
let initial_difficulty_motion_easy1 = 0.20;
let initial_difficulty_motion_easy2 = 0.16;
let initial_difficulty_motion_hard1 = 0.10;
let initial_difficulty_motion_hard2 = 0.05;
let initial_difficulty_color_easy1 = 0.64;
let initial_difficulty_color_easy2 = 0.59;
let initial_difficulty_color_hard1 = 0.54;
let initial_difficulty_color_hard2 = 0.52;

var randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
};


// 指导语
let instruction_getThreshold = {
  type: jsPsychHtmlKeyboardResponse,
  stimuls: "",
  on_start: function () {
    document.body.style.backgroundColor = "black";
    if (window.userId <= 10) {
      this.stimulus = `
      <div style="text-align: left; color: white; padding: 10px"> 
        <h3 style="text-align: center; font-size: 30px; margin: 10px">练习：运动方向判断</h3>
        <p>接下来，屏幕上会呈现一些运动的彩色圆点，</p>
        <p>大约 <span style="font-weight: bold">0.2秒</span> 后会有一定比例的点 <span style="font-weight: bold">一致地向左或向右运动</span> ，其余点随机运动</p >
        <p>您需要忽略点的颜色并在3秒内判断 <span style="font-weight: bold">一致的运动方向是向左还是向右</span>:</p >
        <ul>
          <li><span style="font-weight: bold">向左</span>，请按键盘 <span style="font-weight: bold">左键</span></li>
          <li><span style="font-weight: bold">向右</span>，请按键盘 <span style="font-weight: bold">右键</span> </li>
        </ul>
        <p>请按下空格键进入练习阶段</p>
      </div>`
    } else {
      this.stimulus = `
        <div style="text-align: left; color: white; padding: 10px"> 
          <h3 style="text-align: center; font-size: 30px; margin: 10px">练习：整体颜色判断</h3>
          <p>接下来，屏幕上会呈现一些运动的圆点，其中一半为 <span style="color: hsl(0, 50%, 50%)">红色</span> ，一半为 <span style="color: hsl(225, 50%, 50%)">蓝色</span>，</p>
          <p><span style="font-weight: bold">大约0.2秒后,</span>  一部分点会随机变为另一种颜色（例如从红色变为蓝色），变化后某种颜色的数量会超过另一种。</p >
          <p>您需要在3秒内判断 <span style="font-weight: bold">变化后，散点图的整体颜色（即大多数点的颜色）是红色还是蓝色 </span>：</p >
          <ul>
            <li>整体为 <span style="color: hsl(0, 50%, 50%)">红色</span>，请按键盘 <span style="color: hsl(0, 50%, 50%)">"D" 键</span></li>
            <li>整体为 <span style="color: hsl(225, 50%, 50%)">蓝色</span>，请按键盘 <span style="color: hsl(225, 50%, 50%)">"k" 键</span> </li>
          </ul>
          <p>请按下空格键进入练习阶段</p>
        </div>`
    }
  },
  response_ends_trial: true,
  choices: " ",
  data: {
    part: "instruction_getThreshold",
  }
};

//------------------------- 注视点 --------------

var fixation = { 
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p style='font-size: 48px; color: white'>+</p >",
  trial_duration: 500,
  choices: "NO-KEYS",
  data: {
     part: "fixation"
  }
};


//设置难度的调整范围
const StaircaseColor1 = {
  // 这里的 max 和 min 是指难度的最大值和最小值，对应的是信号水平，颜色的难度范围为 0.65 - 0.51 = 0.14（参考之前的预实验）
  max: 0.51,
  min: 0.65,
  get: () => {
    return initial_difficulty_color_easy1;
  },
  set: (value) => {
    initial_difficulty_color_easy1 = value;
    // 将 value 保留到小数点后两位，并直接赋值给 value
    value = parseFloat(value.toFixed(2));
    window.proportion.push(value); // 将 value 保存到 window.proportion 中
    console.log('colorProportionArray:', window.proportion);
  },
};

const StaircaseColor2 = {
  max: 0.51,
  min: 0.65,
  get: () => {
    return initial_difficulty_color_easy2;
  },
  set: (value) => {
    initial_difficulty_color_easy2 = value;
    value = parseFloat(value.toFixed(2));
    window.proportion.push(value);
    console.log('colorProportionArray:', window.proportion);
  },
};

const StaircaseColor3 = {
  max: 0.51,
  min: 0.65,
  get: () => {
    return initial_difficulty_color_hard1;
  },
  set: (value) => {
    initial_difficulty_color_hard1 = value;
    value = parseFloat(value.toFixed(2));
    window.proportion.push(value);
    console.log('colorProportionArray:', window.proportion);
  },
};

const StaircaseColor4 = {
  max: 0.51,
  min: 0.65,
  get: () => {
    return initial_difficulty_color_hard2;
  },
  set: (value) => {
    initial_difficulty_color_hard2 = value;
    value = parseFloat(value.toFixed(2));
    window.proportion.push(value);
    console.log('colorProportionArray:', window.proportion);
  },
};


const StaircaseMotion1 = {
  // 运动的难度范围为 0.22 - 0.03 = 0.19
  max: 0.03,
  min: 0.22,
  get: () => {
    return initial_difficulty_motion_easy1;
  },
  set: (value) => {
    value = parseFloat(value.toFixed(2));
    initial_difficulty_motion_easy1 = value;
    window.coherence.push(value); // 将 value 保存到 window.coherence 中
    console.log('motionCoherenceArray:', window.coherence);
  },
};

const StaircaseMotion2 = {
  max: 0.03,
  min: 0.22,
  get: () => {
    return initial_difficulty_motion_easy2
  },
  set: (value) => {
    value = parseFloat(value.toFixed(2));
    initial_difficulty_motion_easy2 = value;
    window.coherence.push(value);
    console.log('motionCoherenceArray:', window.coherence);
  },
};

const StaircaseMotion3 = {
  max: 0.03,
  min: 0.22,
  get: () => {
    return initial_difficulty_motion_hard1
  },
  set: (value) => {
    value = parseFloat(value.toFixed(2));
    initial_difficulty_motion_hard1 = value;
    window.coherence.push(value);
    console.log('motionCoherenceArray:', window.coherence);
  },
};

const StaircaseMotion4 = {
  max: 0.03,
  min: 0.22,
  get: () => {
    return initial_difficulty_motion_hard2
  },
  set: (value) => {
    value = parseFloat(value.toFixed(2));
    initial_difficulty_motion_hard2 = value;
    window.coherence.push(value);
    console.log('motionCoherenceArray:', window.coherence);
  },
};

// 定义函数来获取并传递对应的难度水平（传给单个 trial）
function setCurrentDifficultyMotion(motionStage) {
  let difficultyArrayMotion = [
    StaircaseMotion1.get(),
    StaircaseMotion2.get(), 
    StaircaseMotion3.get(),
    StaircaseMotion4.get(),
  ];
  if (motionStage == 0) {
    currentDifficulty = difficultyArrayMotion[0];
  } else if (motionStage == 1) {
    currentDifficulty = difficultyArrayMotion[1];
  } else if (motionStage == 2) {
    currentDifficulty = difficultyArrayMotion[2];
  } else {
    currentDifficulty = difficultyArrayMotion[3];
  }
  console.log("currentDifficultyMotion:" + currentDifficulty);
  return currentDifficulty;
};

function setCurrentDifficultyColor(colorStage) {
  let difficultyArrayColor = [
    StaircaseColor1.get(),
    StaircaseColor2.get(),
    StaircaseColor3.get(),
    StaircaseColor4.get(),
  ];
  if (colorStage == 0) {
    currentDifficulty = difficultyArrayColor[0];
  } else if (colorStage == 1) {
    currentDifficulty = difficultyArrayColor[1];
  } else if (colorStage == 2) {
    currentDifficulty = difficultyArrayColor[2];
  } else {
    currentDifficulty = difficultyArrayColor[3];
  }
  console.log("currentDifficultyColor:" + currentDifficulty);
  return currentDifficulty;
}

// 正式阶段的单个 trial
let single_trial_color = {
  type: jsPsychRdk,
  number_of_dots: 100,
  dot_color: ["hsl(0, 50%, 50%)", "hsl(225, 50%, 50%)"],
  color_change_delay: randomInteger(6, 12),
  dot_color_final: function () { return jsPsych.timelineVariable("dot_color_final") },
  target_color_proportion: function() { return setCurrentDifficultyColor(colorStage)},
  choices: ["d", "k"],
  correct_choice: function () { return jsPsych.timelineVariable("correct_choice") },
  dot_radius: 5.7,
  move_distance: 3,
  coherence: 0,
  aperture_width: 550,
  aperture_height: 550,
  aperture_center_y: 330,
  aperture_center_x: 700, 
  background_color: "black",
  trial_duration: 3000,
  data: {
    part: "color_test",
    correct_response: function () { return jsPsych.timelineVariable("correct_choice") },
    data_label: 'staircase_color',
  },
  on_start: function() {
    /*
    let displayElement = jsPsych.getDisplayElement();
    let elements = displayElement.querySelectorAll("*");
    // 1000毫秒后隐藏刺激
    setTimeout(function() {
      //var elements = displayElement.querySelectorAll("*");
      elements.forEach(function(el) {
        el.style.display = 'none';
      });
    }, 1000);
    */
  },
  on_finish: function(data){
    data.data_label = 'staircase_color';
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    /*// 重新显示元素
    let displayElement = jsPsych.getDisplayElement();
    let elements = displayElement.querySelectorAll("*");
    elements.forEach(function(el) {
      el.style.display = 'inline';
    });
    */
  }
};

let single_trial_motion = {
  type: jsPsychRdk,
  number_of_dots: 100,
  dot_color: ["hsl(0, 50%, 50%)", "hsl(225, 50%, 50%)"],
  motion_change_delay: randomInteger(6, 12),
  coherent_direction: function () { return jsPsych.timelineVariable("coherent_direction")},
  coherence: function() {return setCurrentDifficultyMotion(motionStage)},
  choices: ["ArrowLeft", "ArrowRight"],
  correct_choice: function () { return jsPsych.timelineVariable("correct_choice")},
  dot_radius: 5.7,
  move_distance: 3,
  aperture_width: 550,
  aperture_height: 550,
  aperture_center_y: 330,
  aperture_center_x: 700,
  background_color: "black",
  trial_duration: 3000,
  data: {
    part: "motion_test",
    correct_response: function () { return jsPsych.timelineVariable("correct_choice")},
    data_label: 'staircase_motion'
  },
  on_start: function() {
    /*
    let displayElement = jsPsych.getDisplayElement();
    let elements = displayElement.querySelectorAll("*");
    // 1000毫秒后隐藏刺激
    setTimeout(function() {
      //var elements = displayElement.querySelectorAll("*");
      elements.forEach(function(el) {
        el.style.display = 'none';
      });
    }, 1000);
    */
  },
  on_finish: function(data){
    data.data_label = 'staircase_motion';
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    /*// 重新显示元素
    let displayElement = jsPsych.getDisplayElement();
    let elements = displayElement.querySelectorAll("*");
    elements.forEach(function(el) {
      el.style.display = 'inline';
    });
    */
  }
};

var feedbackTrial = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 500,
  stimulus: function(){
    // this function will check the accuracy of the last response and use that information to set
    // the stimulus value on each trial.
    let trial_data = jsPsych.data.get().last(1).values()[0];
    let correct = trial_data.correct;
    let rt = trial_data.rt
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

let feedback_block_motion = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 2000,
  stimulus: function () {
    let trials = jsPsych.data.get().filter({data_label:'staircase_motion'}).last(8); // 这里必须要写成数字才能变化难度，好奇怪
    let task = trials.select("part").values[0];
    let correct_trials = trials.filter({correct: true });
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(trials.select('rt').mean());
    let rt_sd = Math.round(trials.select('rt').sd());
    let coherence = trials.select('coherence').mean(); // 这里保留到小数点后两位

    // 创建一个包含条件和结果的对象
    testOutput = {
      condition: {
        "firstTask": task,
        "motionCoherence": coherence,
      },
      result: {
        "accuracy": accuracy,
        "rt": rt,
        "rt_sd": rt_sd
      }
    };
    console.log(testOutput)
    return `<p style='font-size: 35px; color: white'>您的正确率为： ${accuracy}% 。平均反应时为：${rt}毫秒。</p>`; 
  },
};

let feedback_block_color = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 2000,
  stimulus: function () {
    let trials = jsPsych.data.get().filter({data_label:'staircase_color'}).last(8);
    let task = trials.select("part").values[0];
    let correct_trials = trials.filter({correct: true });
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(trials.select('rt').mean());
    let rt_sd = Math.round(trials.select('rt').sd());
    let proportion = trials.select('target_color_proportion').mean()
    // 创建一个包含条件和结果的对象
    testOutput = {
      condition: {
        "task": task,
        "colorProportion": proportion
      },
      result: {
        "accuracy": accuracy,
        "rt": rt,
        "rt_sd": rt_sd
      }
    };
    console.log(testOutput)
    return `<p style='font-size: 35px; color: white'>您的正确率为： ${accuracy}% 。平均反应时为：${rt}毫秒。</p>`; 
  },
};

//设置循环的时间线
let cycle_rdk_color = {
  timeline: [fixation, single_trial_color, feedbackTrial],
  timeline_variables: [
    { dot_color_final: ["hsl(0, 50%, 50%)", "hsl(225, 50%, 50%)"], correct_choice: "d" },
    { dot_color_final: ["hsl(225, 50%, 50%)", "hsl(0, 50%, 50%)"], correct_choice: "k" },
    { dot_color_final: ["hsl(225, 50%, 50%)", "hsl(0, 50%, 50%)"], correct_choice: "k" },
    { dot_color_final: ["hsl(0, 50%, 50%)", "hsl(225, 50%, 50%)"], correct_choice: "d" }
  ],
  repetitions: 2,
  randomize_order: true
};

let cycle_rdk_motion = {
  timeline: [fixation, single_trial_motion, feedbackTrial],
  timeline_variables: [
    { coherent_direction: 180, correct_choice: "ArrowLeft"},
    { coherent_direction: 0, correct_choice: "ArrowRight" },
    { coherent_direction: 0, correct_choice: "ArrowRight" },
    { coherent_direction: 180, correct_choice: "ArrowLeft" }
  ],
  repetitions: 2,
  randomize_order: true
};

// 加上 block 反馈的时间线
let cycle_color = {
  timeline: [cycle_rdk_color, feedback_block_color],
  on_timeline_finish: function() {
    currentCycleMunColor += 1;
    if(currentCycleMunColor %2 != 0 ){ // 每种条件下循环2次
      colorStage += 1;
    } else {
      colorStage = colorStage
    }
    console.log('current condition number ', colorStage)
  }
};

let cycle_motion = {
  timeline: [cycle_rdk_motion, feedback_block_motion],
  on_timeline_finish: function() {
    currentCycleMunMotion += 1;
    if(currentCycleMunMotion %2 != 0 ){ // 每种条件下循环2次
      motionStage += 1;
    } else {
      motionStage = motionStage
    }
    console.log('current condition number ', motionStage)
  }
};


// generateStaircaseTimeline 为外部调用的函数，用于生成测试阶段的 staircase
let color_easy1 = generateStaircaseTimeline({
  // Your jsPsych instance (required to fetch data)
  jsPsychInstance: jsPsych,
  // The target accurcy (between 0 and 1)
  targetAccuracy: 0.90,
  // The number of cycles to be carried out
  numberOfCycles: 2,
  // The difficulty object
  difficulty: StaircaseColor1,
  // The data label. Must be the same string that you added to the response
  // trials.
  dataLabel: 'staircase_color',
  // And finally your cycle.
  cycle: cycle_color,
});

let color_easy2 = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: 0.80,
  numberOfCycles: 2,
  difficulty: StaircaseColor2,
  dataLabel: 'staircase_color',
  cycle: cycle_color,
});

let color_hard1 = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: 0.70,
  numberOfCycles: 2,
  difficulty: StaircaseColor3,
  dataLabel: 'staircase_color',
  cycle: cycle_color,
});

let color_hard2 = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: 0.60,
  numberOfCycles: 2,
  difficulty: StaircaseColor4,
  dataLabel: 'staircase_color',
  cycle: cycle_color,
});

let motion_easy1 = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: 0.90,
  numberOfCycles: 2,
  difficulty: StaircaseMotion1,
  dataLabel: 'staircase_motion',
  cycle: cycle_motion,
});

let motion_easy2 = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: 0.80,
  numberOfCycles: 2,
  difficulty: StaircaseMotion2,
  dataLabel: 'staircase_motion',
  cycle: cycle_motion,
});

let motion_hard1 = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: 0.70,
  numberOfCycles: 2,
  difficulty: StaircaseMotion3,
  dataLabel: 'staircase_motion',
  cycle: cycle_motion,
});

let motion_hard2 = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: 0.60,
  numberOfCycles: 2,
  difficulty: StaircaseMotion4,
  dataLabel: 'staircase_motion',
  cycle: cycle_motion,
});

let block_motion = {
  timeline: [motion_easy1, motion_easy2, motion_hard1, motion_hard2],
};

let block_color = {
  timeline: [color_easy1, color_easy2, color_hard1, color_hard2],
};

//分配不同的组别
var group_motion = {
  timeline: [block_motion],
  conditional_function: function () {
    if (window.userId <= 10) {
      console.log("move");
      return true;
    } else {
      return false;
    }
  }
};

var group_color = {
  timeline: [block_color],
  conditional_function: function () {
    if (window.userId > 10) {
      console.log("color");
      return true;
    } else {
      return false;
    }
  }
};

var assign_group = {
  timeline: [group_motion, group_color],
};

getThreshold = {
  timeline: [instruction_getThreshold, assign_group]
}
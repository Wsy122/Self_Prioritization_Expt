var jsPsychHtmlKeyAndButtonPlugin=function(n){"use strict";var b={name:"@panwanke/jspsych-html-keynbutton-response",version:"2.0.0",description:"jsPsych plugin for displaying a stimulus and getting a keyboard or button response",type:"module",main:"dist/index.cjs",exports:{import:"./dist/index.js",require:"./dist/index.cjs"},publishConfig:{access:"public"},typings:"dist/index.d.ts",unpkg:"dist/index.browser.min.js",files:["src","dist"],source:"src/index.ts",scripts:{test:"jest","test:watch":"npm test -- --watch",tsc:"tsc",build:"rollup --config","build:watch":"npm run build -- --watch"},repository:{type:"git",url:"git+https://github.com/Chuan-Peng-Lab/jspsych-html-keynbutton-response.git",directory:"packages/plugin-html-keynbutton-response"},author:"Wanke Pan",license:"MIT",bugs:{url:"https://github.com/Chuan-Peng-Lab/jspsych-html-keynbutton-response/issues"},homepage:"https://github.com/Chuan-Peng-Lab/jspsych-html-keynbutton-response",peerDependencies:{jspsych:">=7.1.0"},devDependencies:{"@jspsych/config":"^3.0.0","@jspsych/test-utils":"^1.2.0"}};const g={name:"html-keynbutton-response",version:b.version,parameters:{stimulus:{type:n.ParameterType.HTML_STRING,default:void 0},choices:{type:n.ParameterType.KEYS,default:"ALL_KEYS"},show_button:{type:n.ParameterType.BOOL,default:!0},button_html:{type:n.ParameterType.FUNCTION,default:function(p,s){return`<button class="jspsych-btn">${p}</button>`}},button_layout:{type:n.ParameterType.STRING,default:"grid"},grid_rows:{type:n.ParameterType.INT,default:1},grid_columns:{type:n.ParameterType.INT,default:null},enable_button_after:{type:n.ParameterType.INT,default:0},prompt:{type:n.ParameterType.HTML_STRING,default:null},stimulus_duration:{type:n.ParameterType.INT,default:null},trial_duration:{type:n.ParameterType.INT,default:null},response_ends_trial:{type:n.ParameterType.BOOL,default:!0}},data:{response:{type:n.ParameterType.STRING},rt:{type:n.ParameterType.INT},stimulus:{type:n.ParameterType.STRING}}};class c{constructor(s){this.jsPsych=s}trial(s,e){const i=document.createElement("div");i.id="jspsych-html-button-response-stimulus",i.innerHTML=e.stimulus,s.appendChild(i);let t=null;if(e.show_button&&e.choices!==null&&e.choices!=="ALL_KEYS"&&e.choices!=="NO_KEYS"){if(t=document.createElement("div"),t.id="jspsych-html-button-response-btngroup",e.button_layout==="grid"){if(t.classList.add("jspsych-btn-group-grid"),e.grid_rows===null&&e.grid_columns===null)throw new Error("You cannot set `grid_rows` to `null` without providing a value for `grid_columns`.");const r=e.grid_columns===null?Math.ceil(e.choices.length/e.grid_rows):e.grid_columns,l=e.grid_rows===null?Math.ceil(e.choices.length/e.grid_columns):e.grid_rows;t.style.gridTemplateColumns=`repeat(${r}, 1fr)`,t.style.gridTemplateRows=`repeat(${l}, 1fr)`}else e.button_layout==="flex"&&t.classList.add("jspsych-btn-group-flex");for(const[r,l]of e.choices.entries()){t.insertAdjacentHTML("beforeend",e.button_html(l,r));const u=t.lastChild;u.dataset.choice=r.toString(),u.addEventListener("click",()=>{m({key:l,rt:null})})}s.appendChild(t)}if(e.enable_button_after>0){for(var o=document.querySelectorAll(".jspsych-html-button-response-button button"),d=0;d<o.length;d++)o[d].setAttribute("disabled","disabled");this.jsPsych.pluginAPI.setTimeout(()=>{for(var r=document.querySelectorAll(".jspsych-html-button-response-button button"),l=0;l<r.length;l++)r[l].removeAttribute("disabled")},e.enable_button_after)}e.prompt!==null&&s.insertAdjacentHTML("beforeend",e.prompt);var _=performance.now(),a={rt:null,key:null};const h=()=>{typeof y!="undefined"&&this.jsPsych.pluginAPI.cancelKeyboardResponse(y);var r={rt:a.rt,stimulus:e.stimulus,response:a.key};this.jsPsych.finishTrial(r)};var m=r=>{i.classList.add("responded"),a.key==null&&(a=r);let l=performance.now();if(a.rt=Math.round(l-_),e.show_button&&t!==null)for(const u of t.children)u.setAttribute("disabled","disabled");e.response_ends_trial&&h()};if(e.choices!="NO_KEYS")var y=this.jsPsych.pluginAPI.getKeyboardResponse({callback_function:m,valid_responses:e.choices,rt_method:"performance",persist:!1,allow_held_key:!1});e.stimulus_duration!==null&&this.jsPsych.pluginAPI.setTimeout(()=>{s.querySelector("#jspsych-html-keynbutton-response-stimulus").style.visibility="hidden"},e.stimulus_duration),e.trial_duration!==null&&this.jsPsych.pluginAPI.setTimeout(h,e.trial_duration)}simulate(s,e,i,t){e=="data-only"&&(t(),this.simulate_data_only(s,i)),e=="visual"&&this.simulate_visual(s,i,t)}create_simulation_data(s,e){const i={stimulus:s.stimulus,rt:this.jsPsych.randomization.sampleExGaussian(500,50,.006666666666666667,!0),response:this.jsPsych.pluginAPI.getValidKey(s.choices)},t=this.jsPsych.pluginAPI.mergeSimulationData(i,e);return this.jsPsych.pluginAPI.ensureSimulationDataConsistency(s,t),t}simulate_data_only(s,e){const i=this.create_simulation_data(s,e);this.jsPsych.finishTrial(i)}simulate_visual(s,e,i){const t=this.create_simulation_data(s,e),o=this.jsPsych.getDisplayElement();this.trial(o,s),i(),t.rt!==null&&this.jsPsych.pluginAPI.pressKey(t.response,t.rt)}}return c.info=g,c}(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map